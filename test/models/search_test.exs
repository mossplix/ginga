defmodule Ginga.SearchTest do
  use Ginga.ModelCase

  alias Ginga.Search

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Search.changeset(%Search{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Search.changeset(%Search{}, @invalid_attrs)
    refute changeset.valid?
  end
end
