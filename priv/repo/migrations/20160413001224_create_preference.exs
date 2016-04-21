defmodule Ginga.Repo.Migrations.CreatePreference do
  use Ecto.Migration

  def change do
    create table(:preferences) do

      timestamps
    end

  end
end
