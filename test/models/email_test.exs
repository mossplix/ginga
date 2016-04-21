defmodule Ginga.EmailTest do
  use Ginga.ModelCase

  alias Ginga.Email

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Email.changeset(%Email{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Email.changeset(%Email{}, @invalid_attrs)
    refute changeset.valid?
  end
end
