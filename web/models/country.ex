defmodule Ginga.Country do
  use Ginga.Web, :model
  alias Ginga.Repo

  schema "countries" do
      field :name, :string
      field :iso, :string
      field :iso3, :string
      field :nicename, :string
      field :numcode, :string
      field :phonecode, :string

  end

  @required_fields ~w()
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
