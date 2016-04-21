defmodule Ginga.CompanyView do
  use Ginga.Web, :view

  def render("index.json", %{companies: companies}) do
    %{data: render_many(companies, Ginga.CompanyView, "company.json")}
  end

  def render("show.json", %{company: company}) do
    %{data: render_one(company, Ginga.CompanyView, "company.json")}
  end

  def render("company.json", %{company: company}) do
    %{id: company.id,
      name: company.name}
  end
end
