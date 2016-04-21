defmodule Ginga.Repo.Migrations.CreateContact do
  use Ecto.Migration

  def change do
    create table(:contacts) do

      timestamps
    end

  end
end
