defmodule Ginga.UsersController do
	use Phoenix.Controller
	require Plug.Conn


	require Logger
	require Ginga.WebUtils
	alias Poison, as: JSON
	alias Ginga.Utils,as: Utils
	#alias RethinkDB.Query
	use Gingadb
	import Plug.Conn


	plug Ginga.Plugs.Authenticated when action in [:show]
		plug :action
	#alias RethinkDB.Query

	 def new(conn, _params) do
				user = fetch_session(conn)|> get_session(:current_user)
				case user do
					nil ->   render conn, "new.html"
					_ ->    redirect conn,to: "/app"
				end

			end

  def is_valid(field,value,params,conn) do
		case field do
			:email -> case :ets.lookup(User,value|>String.strip) do
				             [] -> :ok
											_  -> render conn, "update.html",%{params: params,message: "Email  #{value}  already has an account associated with it"}
			           end
			:website -> case Company.read_at!(value|>String.strip,:website) do
				             nil -> :ok
											_  -> render conn, "update.html",%{params: params,message: "Website  #{value} is  already in use"}
			           end
			:username ->
									case  value|>String.strip|>String.split(["@"]) do
										[usr|rest] -> usr=usr
										_ -> usr=value
									end
									case User.read_at!(usr,:username) do
				             nil -> usr
											_  -> render conn, "update.html",%{params: params,message: "Username #{value} already taken"}
			           end
			_ -> false

		end

	end
	def signup(conn, params) do

        email = params["email"]
        password = params["password"]
				username = params["username"]
        company  = params["company"]
        website = params["website"]
        first_name= params["first_name"]
        last_name= params["last_name"]
        employees = params["employees"]
        name = first_name <> " " <> last_name

				is_valid(:email,email,params,conn)
				is_valid(:website,website,params,conn)
				username=is_valid(:username,username,params,conn)


				url = URI.parse(website).host
        case url do
           "www."<>hst-> host=hst
            _->host=url
        end
				jid=username<>"@"<>host
        user = Ginga.UserService.add_user([email: email,username: username,  first_name: first_name,last_name: last_name, password: params["password"],jid: jid])
        Logger.info(inspect user)
        database=generate_unid(host)
        company = %Company{name: company, employees: employees,website: host ,rethink_database: host,vhost: host} |> Company.write!
        Ginga.UserService.generate_api_key(user)
        %AtCompany{user_id: user.email, company_id: company.id,is_admin: true} |> AtCompany.write!
        Utils.add_host(host)
        :ejabberd_auth.try_register(username, host, password)
		:mod_admin_extra.set_nickname(username, host, username)
		Logger.debug(host)
        :mod_admin_extra.set_vcard(username, host, "FN", name)
        :mod_admin_extra.set_vcard(username, host, "EMAIL", "USERID", email)
				Ginga.Utils.add_default_opts(host,jid)

		connection = RethinkDB.connect()
		RethinkDB.Query.Database.db_create(host) |>RethinkDB.run connection
		RethinkDB.Query.Table.table_create(host,jid)

		register({:ok,user},conn)
        render conn , "comfirm.html"

	end

	def new_auth(conn,_params) do
	render conn,"login.html"
	end

	def do_login(conn,%{ "email" => email, "password" => password}) do
        res = Ginga.UserService.authenticate([email: email, password: password]) |> login(conn)

				case res do
					{:ok,conn,_} -> redirect conn,to: "/app"
					{:error,conn,msg}-> render conn,"login.html",msg

				end

	end





  	def get_my_info(conn,_params) do
  	    user = get_session(conn,:current_user)
  	    json conn,%{username: user.username,jid: user.jid}
  	end



	def destroy(conn, %{"id" => s_id}) do
	    id = String.to_integer s_id
	    result = Ginga.UserService.destroy_user id
		json conn, result
    end

    def do_logout(conn,_params) do
        cnn=logout(conn)

				redirect cnn,to: "/"

    end




  def logout(conn) do
         fetch_session(conn)
         |> delete_session(:logged_in)
         |> delete_session(:current_user)
   end

	def show(conn,options) do
		  user = fetch_session(conn)
			|> get_session(:current_user)

			rooms = Gingaebs.UserRoom.read!(user.jid)


			frooms=rooms|> Enum.map fn(k) ->
				 jid=k.jid
				 {room_name,room_address} = k.room_id
				%{jid: jid,name: room_name,room_jid: room_name <> "@"<> room_address}

				end


			case user do
				nil -> json conn,[]
				_->  json conn,%{ rooms: frooms,email: user.email,first_name: user.first_name,last_name: user.last_name}

			end






		json conn, user

	end



  defp verify_authkey(conn, options) do
      if Ginga.UserService.verify_key(api_key) do
        conn
      else
        conn |> redirect(Router.root_path)
      end
    end

  defp is_authenticated(conn) do
    case get_session(conn,:current_user) do
        user -> true
        nil  -> false
    end
  end

  def register({:ok, user}, conn) do
      conn = fetch_session(conn)
      |> put_status(201)
      |> create_session(user)
      {conn, %{message: "user created", user: user}}
  end

    def register({:error, message}, conn) do
      conn = fetch_session(conn)
      |> put_status(400)
      {conn, %{message: message}}
    end

    def login({:ok, user}, conn)  do
      conn = fetch_session(conn)
      |> put_status(200)
      |> create_session(user)
      {:ok,conn, %{message: "logged in", user: user}}
    end

    def login({:error, _}, conn) do
      conn = conn
      |> put_status(400)
      {:error,conn, %{message: "invalid email or password"}}
    end



    def password_recover({:ok, _}, conn) do
      conn = conn
      |> put_status(200)
      {conn, %{message: "email sent"}}
    end

    def password_recover({:error, message}, conn) do
      conn = conn
      |> put_status(400)
      {conn, %{message: message}}
    end

    def password_reset({:ok, _}, conn) do
      conn = conn
      |> put_status(200)
      {conn, %{message: "password reset"}}
    end

    def password_reset({:error, message}, conn) do
      conn = conn
      |> put_status(400)
      {conn, %{message: message}}
    end


    defp create_session(conn, user) do
      conn
      |> put_session(:current_user, user)
			|> put_session(:logged_in, true)
    end


  defp generate_unid(database) do
    db= String.downcase(database)
    uid = :Gingaerl.uuid_time() |> :erlang.trunc |> :erlang.integer_to_binary

    db <> uid
   end



end
