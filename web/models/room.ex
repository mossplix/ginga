defmodule Ginga.Room do
  use Ginga.Web, :model
  alias Ginga.{Repo, Room}
    @derive {Poison.Encoder, only: [:name, :description, :jid]}

  schema "rooms" do
    field :name, :string
    field :description, :string
    field :jid, :string
    belongs_to :user, User

    timestamps
  end

  @required_fields ~w(name user_id jid)
  @optional_fields ~w(description)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def get_by_user(query \\ %Room{}, user_id) do
    from c in query,
      left_join: cu in assoc(c, :user),
      where: cu.user_id == ^user_id
  end
end
