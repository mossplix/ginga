defmodule Ginga.CardView do
  use Ginga.Web, :view

  def render("show.json", %{card: card}) do
    card
  end
end
