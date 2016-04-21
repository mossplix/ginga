defmodule Ginga.CredentialTest do
  use Ginga.ModelCase

  alias Ginga.Credential

  @valid_attrs %{encrypted_password: "some content", user_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Credential.changeset(%Credential{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Credential.changeset(%Credential{}, @invalid_attrs)
    refute changeset.valid?
  end
end
