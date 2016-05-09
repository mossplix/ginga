defmodule Ginga.Repo.Migrations.CreateCommand do
  use Ecto.Migration

  def change do
    create table(:commands) do

      timestamps
    end

  end
end
