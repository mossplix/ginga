defmodule Ginga.AccountOpportunityTest do
  use Ginga.ModelCase

  alias Ginga.AccountOpportunity

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AccountOpportunity.changeset(%AccountOpportunity{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AccountOpportunity.changeset(%AccountOpportunity{}, @invalid_attrs)
    refute changeset.valid?
  end
end
