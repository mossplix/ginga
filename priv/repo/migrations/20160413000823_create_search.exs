defmodule Ginga.Repo.Migrations.CreateSearch do
  use Ecto.Migration

  def change do
    create table(:searches) do

      timestamps
    end

  end
end
