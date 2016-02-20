defmodule Ginga.User do
  use Ginga.Web, :model

  alias Ginga.Repo

  schema "users" do
    field :name, :string
    field :email, :string
    field :is_admin, :boolean

    has_many :authorizations, Ginga.Authorization

    timestamps
  end

  @required_fields ~w(email name)
  @optional_fields ~w()

  def registration_changeset(model, params \\ :empty) do
    model
    |>cast(params, ~w(email name), ~w())
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def make_admin!(user) do
    user
    |> cast(%{is_admin: true}, ~w(), ~w(is_admin))
    |> Repo.update!
  end
end
