defmodule Ginga.Repo.Migrations.CreateEmail do
  use Ecto.Migration

  def change do
    create table(:emails) do

      timestamps
    end

  end
end
