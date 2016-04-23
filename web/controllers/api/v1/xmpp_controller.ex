defmodule Ginga.XMPPController do
  use Ginga.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Ginga.SessionController

  alias Ginga.{Repo, User,Room}

  def rooms(conn, params,current_user, _claims) do

     rooms = Repo.all(Room, user_id: current_user(conn).id )
    conn
    |> put_status(:ok)
    |> render("rooms.json", rooms: rooms)
  end


   def show_room(conn, %{"id" => id},current_user, _claim) do
    room = Repo.get!(Room, id)
    conn
    |> put_status(:ok)
    |> render("room.json", room: room)
  end

  defp current_user(conn)  do
    Guardian.Plug.current_resource(conn)
  end
end
