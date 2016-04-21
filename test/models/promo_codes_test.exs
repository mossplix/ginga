defmodule Ginga.PromoCodesTest do
  use Ginga.ModelCase

  alias Ginga.PromoCodes

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PromoCodes.changeset(%PromoCodes{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PromoCodes.changeset(%PromoCodes{}, @invalid_attrs)
    refute changeset.valid?
  end
end
