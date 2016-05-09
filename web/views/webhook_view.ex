defmodule Ginga.WebhookView do
  use Ginga.Web, :view

  def render("index.json", %{webhooks: webhooks}) do
    %{data: render_many(webhooks, Ginga.WebhookView, "webhook.json")}
  end

  def render("show.json", %{webhook: webhook}) do
    %{data: render_one(webhook, Ginga.WebhookView, "webhook.json")}
  end

  def render("webhook.json", %{webhook: webhook}) do
    %{id: webhook.id}
  end
end
