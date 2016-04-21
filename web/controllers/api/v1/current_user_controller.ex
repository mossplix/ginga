defmodule Ginga.CurrentUserController do
  use Ginga.Web, :controller
  require Logger

  plug Guardian.Plug.EnsureAuthenticated, handler: Ginga.SessionController

  def show(conn, _,current_user, _claims) do
    user = Guardian.Plug.current_resource(conn)


    conn
    |> put_status(:ok)
    |> render("show.json", user: user)
  end


end
