defmodule Ginga.SessionController do
  use Ginga.Web, :controller
  require Logger


  plug :scrub_params, "session" when action in [:create]

  def create(conn, %{"session" => session_params},current_user, _claims) do


        case Ginga.Session.authenticate(session_params) do
          {:ok, user} ->
            {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

            conn
            |> put_status(:created)
            |> render("show.json", jwt: jwt, user: user)

          :error ->
            conn
            |> put_status(:unprocessable_entity)
            |> render("error.json")
        end
  end

  def delete(conn, _,current_user, _claims) do
    {:ok, claims} = Guardian.Plug.claims(conn)

    conn
    |> Guardian.Plug.current_token
    |> Guardian.revoke!(claims)

    conn
    |> render("delete.json")
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:forbidden)
    |> render(Ginga.SessionView, "forbidden.json", error: "Not Authenticated")
  end



  def unauthorized(conn, _params) do
    conn
    |> put_status(:unauthorized)

    |> render(Ginga.SessionView, "unauthorized.json", error: "Unauthorized")
  end
end