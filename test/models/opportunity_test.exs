defmodule Ginga.OpportunityTest do
  use Ginga.ModelCase

  alias Ginga.Opportunity

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Opportunity.changeset(%Opportunity{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Opportunity.changeset(%Opportunity{}, @invalid_attrs)
    refute changeset.valid?
  end
end
