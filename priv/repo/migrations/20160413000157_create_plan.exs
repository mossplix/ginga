defmodule Ginga.Repo.Migrations.CreatePlan do
  use Ecto.Migration

  def change do
    create table(:plans) do
      add :name, :string
      add :cost, :integer
      timestamps
    end

  end
end
