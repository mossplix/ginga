defmodule Ginga.OpportunityView do
  use Ginga.Web, :view

  def render("index.json", %{opportunities: opportunities}) do
    %{data: render_many(opportunities, Ginga.OpportunityView, "opportunity.json")}
  end

  def render("show.json", %{opportunity: opportunity}) do
    %{data: render_one(opportunity, Ginga.OpportunityView, "opportunity.json")}
  end

  def render("opportunity.json", %{opportunity: opportunity}) do
    %{id: opportunity.id}
  end
end
