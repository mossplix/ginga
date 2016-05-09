defmodule Ginga.Repo.Migrations.CreateFile do
  use Ecto.Migration

  def change do
    create table(:files) do

      timestamps
    end

  end
end
