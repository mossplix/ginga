defmodule Ginga.User do
  use Ginga.Web, :model

  alias Ginga.Repo
  require Logger
   alias Ginga.{Board, UserBoard}

   @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email,:jid,:vhost,:company_name]}

  schema "users" do
    field :name, :string
    field :email, :string
    field :username,:string
    field :first_name, :string
    field :last_name, :string
    field :is_admin, :boolean
    field :jid ,:string
    field :email_token,:string
    field :is_active,:boolean
    field :state,:string
    field :vhost,:string
    field :plan_name ,:string
    field :company_name,:string
    field :country_id,:integer

    has_many :authorizations, Ginga.Authorization
    has_many :owned_boards, Board
    has_many :user_boards, UserBoard
    has_one  :company ,Company
    has_one  :plan ,Plan
    has_many :boards, through: [:user_boards, :board]

    timestamps
  end

  @required_fields ~w(email first_name last_name company_name)
  @optional_fields ~w(country_id)

  def registration_changeset(model, params \\ :empty) do
    model
    |>cast(params, ~w(email first_name last_name company_name country_id), ~w())
    |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_token
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)

  end

  def make_admin!(user) do
    user
    |> cast(%{is_admin: true}, ~w(), ~w(is_admin))
    |> Repo.update!
  end

  def gen_xmpp_values(user) do
     :ejabberd_auth_internal.try_register(user.username, user.vhost, user.email_token)
	 :mod_admin_extra.set_nickname(user.name, user.host, user.username)
	 Ginga.Utils.add_default_opts(user.vhost,user.jid)
  end

   def gen_token!(user) do
        email_token = :gingaerl.generate_token()
        user
        |> cast(%{email_token: email_token,is_active: false}, ~w(), ~w(email_token is_active))
        |> Repo.update!

  end

  def activate!(user) do

        user
        |> cast(%{is_active: true}, ~w(), ~w(is_active))
        |> Repo.update!
  end

  def setup_vcard(user) do
	    host= user.vhost
		:mod_admin_extra.set_nickname(user.username, user.vhost, user.username)
		:mod_admin_extra.set_vcard(user.username, user.vhost, "FN", user.name)
		:mod_admin_extra.set_vcard(user.username, user.vhost, "EMAIL", "USERID", user.email)
	end

  def get_roster(user) do

       :mod_roster.get_roster(user.username,user.vhost)

  end


  defp generate_token(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{}} ->
        put_change(current_changeset, :email_token, :gingaerl.generate_token())
      _ ->
        current_changeset
    end
  end


  def setup_vhost(user) do
     username = user.email |>String.split("@") |> hd
     name = user.first_name<> " "<>user.last_name
     company= String.downcase(user.company_name)|> String.replace(" ","")
     uid = :gingaerl.uuid_time() |> :erlang.trunc |> :erlang.integer_to_binary
     vhost="sparkplug"
     jid= username <> "@" <> vhost

      #Ginga.Utils.add_host(vhost)


       user
    |> cast(%{vhost: vhost,jid: jid,username: username, name: name }, ~w(), ~w(vhost jid username name))
    |> Repo.update!

  end

    defp update_vhost(current_changeset) do


        case current_changeset do
              %Ecto.Changeset{valid?: true, changes: %{company_name: company_name,email: email,first_name: first_name,last_name: last_name}} ->
                Logger.debug "creating vhost"
                username = email |>String.split("@") |> hd
                name = first_name<> " "<>last_name
                company= String.downcase(company_name)|> String.replace(" ","")
                uid = :gingaerl.uuid_time() |> :erlang.trunc |> :erlang.integer_to_binary
                vhost="sparkplug"
                jid= username <> "@" <> vhost
                Ginga.Utils.add_host(vhost)
                put_change(current_changeset, :vhost ,vhost)
                put_change(current_changeset, :username ,username)
                put_change(current_changeset, :jid ,jid)
                put_change(current_changeset, :name ,name)

              _ ->
                current_changeset
         end



   end







end
