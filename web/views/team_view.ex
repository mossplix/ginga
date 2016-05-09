defmodule Ginga.TeamView do
  use Ginga.Web, :view

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, Ginga.TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, Ginga.TeamView, "team.json")}
  end

  def render("team.json", %{team: team}) do
    %{id: team.id}
  end
end
