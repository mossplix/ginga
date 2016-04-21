defmodule Ginga.PlanTest do
  use Ginga.ModelCase

  alias Ginga.Plan

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Plan.changeset(%Plan{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Plan.changeset(%Plan{}, @invalid_attrs)
    refute changeset.valid?
  end
end
