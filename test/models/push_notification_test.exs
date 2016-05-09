defmodule Ginga.PushNotificationTest do
  use Ginga.ModelCase

  alias Ginga.PushNotification

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PushNotification.changeset(%PushNotification{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PushNotification.changeset(%PushNotification{}, @invalid_attrs)
    refute changeset.valid?
  end
end
