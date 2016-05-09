defmodule Ginga.AnalyticView do
  use Ginga.Web, :view

  def render("index.json", %{analytics: analytics}) do
    %{data: render_many(analytics, Ginga.AnalyticView, "analytic.json")}
  end

  def render("show.json", %{analytic: analytic}) do
    %{data: render_one(analytic, Ginga.AnalyticView, "analytic.json")}
  end

  def render("analytic.json", %{analytic: analytic}) do
    %{id: analytic.id}
  end
end
