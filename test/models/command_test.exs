defmodule Ginga.CommandTest do
  use Ginga.ModelCase

  alias Ginga.Command

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Command.changeset(%Command{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Command.changeset(%Command{}, @invalid_attrs)
    refute changeset.valid?
  end
end
