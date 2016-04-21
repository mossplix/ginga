defmodule Ginga.CardController do
  use Ginga.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: Ginga.SessionController

  alias Ginga.{Repo, Card}

  def show(conn, %{"board_id" => board_id, "id" => card_id},current_user, _claims) do
    card = Card
     |> Card.get_by_user_and_board(card_id, current_user(conn).id, board_id)
     |> Repo.one!

    render(conn, "show.json", card: card)
  end

  defp current_user(conn)  do
    Guardian.Plug.current_resource(conn)
  end
end
