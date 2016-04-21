defmodule Ginga.UserController do
  use Ginga.Web, :controller
  require Logger

  alias Ginga.Repo
  alias Ginga.User
  alias Ginga.Authorization
  alias Ginga.Country

  def new(conn, params, current_user, _claims) do
    plan =  params["plan"]
    countries = Repo.all(Country) |> Enum.map(&%{id: &1.id,name: &1.nicename})
    render conn, "new.html", [current_user: current_user,plan: plan,countries: countries]
  end

  def verify_email(conn, params, current_user, _claims) do
        case Repo.get_by(User, email_token: params["token"]) do

          nil ->        conn=conn
                                |> put_flash(:error, "Email Verification failed")
                                |> redirect(to: "/")

          user ->
                    User.activate!(user)
                    conn=conn|> put_flash(:info, "Email Verified")
                    render conn, "verification_confirmation.html", current_user: current_user
        end


  end






end
