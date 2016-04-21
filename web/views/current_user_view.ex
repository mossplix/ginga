defmodule Ginga.CurrentUserView do
  use Ginga.Web, :view

  def render("show.json", %{user: user}) do
    user
  end

  def render("error.json", _) do
  end
end
