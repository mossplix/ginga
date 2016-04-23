defmodule Ginga.XMPPView do
  use Ginga.Web, :view

  def render("rooms.json", %{rooms: rooms}) do
    rooms
  end


  def render("room.json", %{room: room}) do
    room
  end
end
