defmodule Ginga.UserService do
	@moduledoc """
 		Ginga's user service.
	"""
	require Logger
	require Amnesia
	use Gingadb

	# API
	def hash_password(password) do
		 :bcrypt.hashpw(password, Ginga.Endpoint.config(:salt))|> elem(1)
	end

	@spec get_all_users() :: [%User{}]
	@doc "Gets all known users."
	def get_all_users() do
		Amnesia.transaction do
				User.keys |> Enum.map &User.read(&1)
		end
  	end

	@spec get_user_with_email(String.t) :: %User{} | nil
	@doc "Get the user with the given email."
	def get_user_with_email(email) do
		case User.get([email: email]) do
			[usr|rest] -> usr
			_-> nil

		end
	end

	@spec get_user_with_api_key(String.t) :: %User{} | nil
	@doc "Get user with the given api key"
  	def get_user_with_api_key(api_key) do
		credentials = Credentials.get api_key: api_key
    if credentials !== nil do
			user_id = credentials.user_id
		  get_user_with_id(user_id)
		else
			nil
		end
  	end

  	def get_user_token(user) do
		case user do
			nil -> nil
			user ->
				c=Credentials.read!  user.email
				key={:ok,c.api_key}
		end
 	 end

	@spec get_user_with_id(non_neg_integer) :: %User{}
	@doc "Get the user with the unique id"
	def get_user_with_id(id) do
		User.get([id: id])
	end


	#@spec add_user([email: String.t, name: String.t, password: String.t,jid: String.t]) :: %User{}
	@doc "Adds a user, if not already stored, with unique email, a name and a password."
  	def add_user([email: email,username: username, first_name: first_name,last_name: last_name, password: password, jid: jid]) do
		stored_user = get_user_with_email email

		case stored_user do
			nil ->
				Amnesia.transaction do
					user = %User{email: email,username: username, first_name: first_name,last_name: last_name,jid: jid} |> User.write
					Logger.debug(inspect user)
					Credentials.write %Credentials{user_id: user.email, password: hash_password(password)}
					Ginga.EventManager.notify_user_added user
					user
				end

			_  -> Logger.debug "User with email #{email} already exists"
                  hd stored_user
		end

  	end

	@spec destroy_user(non_neg_integer) :: :ok
  	@doc "Removes any user with a given unique id from the database"
	def destroy_user(id) do
		Amnesia.transaction do
			User.destroy id
			Credentials.destroy user_id: id
			# TODO raise event?
		end
	end

  def generate_api_key(user) do
  	case Credentials.set_api_key user_id: user.email do
  	{:ok,key} -> {:ok}
  	_ -> %{:error => "something went wrong"}
  	end
  end

   def gen_comfirmation_token(user) do
    	case Credentials.set_comfirmation_key user_id: user.email do
    	{:ok,key} -> {:ok}
    	_ -> %{:error => "something went wrong"}
    	end
    end

	@spec set_api_key([email: String.t, password: String.t]) :: {:ok, String.t} | {:error, :not_found}
	@doc "Set the api key for a user identified by unique user id and email, and authenticated by password. An email notification is sent."
  def set_api_key([email: email, password: password]) do
		user = authenticate email: email, password: password
    if user !== nil do
		    result = Credentials.set_api_key user_id: user.email
				case result do
					{:ok, api_key} -> Ginga.EmailService.email_api_key user: user, api_key: api_key
												%{api_key: api_key}
						_ -> Logger.warn "Failed to set the API key of #{inspect user}"
								 result
				end
    else
			%{:error => :not_found}
    end
  end

	@spec reset_password(%User{}) :: :ok | {:error, :not_found}
	@doc "Resets a user's password. An email notification is sent."
	def reset_password(user) do
		new_password = ""
		result = Credentials.set_password user_id: user.email, password: new_password
		case result do
			:ok -> Ginga.EmailService.email_password user: user, password: new_password
			       :ok
			 _ -> Logger.warn "Failed to reset the password of #{inspect user}"
									result
    end
  end

	@spec change_password([email: String.t, password: String.t, new_password: String.t]) :: :ok | {:error, :not_authentication}
	@doc "Change the password for a given authenticated user. An email notification is sent."
	def change_password([email: email, password: password, new_password: new_password]) do
		user = authenticate email: email, password: password
    if user !== nil do
			:ok = Credentials.update_password user_id: user.email, password: new_password
			Ginga.EmailService.password_changed user: user
      :ok
    else
      Logger.warn "Failed to change password of #{email}"
			{:error, :authentication}
    end
  end

	@spec authenticate([email: String.t, api_key: String.t] | [email: String.t, password: String.t]) :: %User{} | nil
	@doc "Authenticates a user givent its email and an API key or a password"
	def authenticate([email: email, api_key: api_key]) do
		user = User.read! email
		if user != nil do
			credentials = Credentials.read!  user.email
			if api_key !== nil and api_key != "" and credentials.api_key == api_key do
				user
      else
				nil
      end
		else
      nil
		end
	end
	def authenticate([email: email, password: password]) do
		user = User.read! email
		if user != nil do
			credentials = Credentials.read!  user.email
			if  credentials.password == hash_password(password) do
				{:ok,user}
      else
				{:error,nil}
      end
		else
      {:error,nil}
		end
	end

  def verify_key(api_key) do
		api_key !== nil and Credentials.key_exists? api_key
  end

	def setup_vcard(user) do
	    [company]= AtCompany.read_at!(user.email,:user_id)
	    host=company.vhost
	    name=user.first_name <> " "<>user.last_name
		:mod_admin_extra.set_nickname(user.username, company.host, user.username)
		:mod_admin_extra.set_vcard(user.username, host, "FN", name)
		:mod_admin_extra.set_vcard(user.username, host, "EMAIL", "USERID", user.email)
	end



end
