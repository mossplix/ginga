defmodule Ginga.LeadTest do
  use Ginga.ModelCase

  alias Ginga.Lead

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Lead.changeset(%Lead{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Lead.changeset(%Lead{}, @invalid_attrs)
    refute changeset.valid?
  end
end
