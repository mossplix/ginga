defmodule Ginga.WebhookTest do
  use Ginga.ModelCase

  alias Ginga.Webhook

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Webhook.changeset(%Webhook{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Webhook.changeset(%Webhook{}, @invalid_attrs)
    refute changeset.valid?
  end
end
