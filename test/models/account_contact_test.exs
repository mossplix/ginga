defmodule Ginga.AccountContactTest do
  use Ginga.ModelCase

  alias Ginga.AccountContact

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AccountContact.changeset(%AccountContact{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AccountContact.changeset(%AccountContact{}, @invalid_attrs)
    refute changeset.valid?
  end
end
