defmodule Ginga.CampaignView do
  use Ginga.Web, :view

  def render("index.json", %{campaigns: campaigns}) do
    %{data: render_many(campaigns, Ginga.CampaignView, "campaign.json")}
  end

  def render("show.json", %{campaign: campaign}) do
    %{data: render_one(campaign, Ginga.CampaignView, "campaign.json")}
  end

  def render("campaign.json", %{campaign: campaign}) do
    %{id: campaign.id}
  end
end
