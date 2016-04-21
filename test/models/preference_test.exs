defmodule Ginga.PreferenceTest do
  use Ginga.ModelCase

  alias Ginga.Preference

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Preference.changeset(%Preference{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Preference.changeset(%Preference{}, @invalid_attrs)
    refute changeset.valid?
  end
end
