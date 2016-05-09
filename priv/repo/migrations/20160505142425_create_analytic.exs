defmodule Ginga.Repo.Migrations.CreateAnalytic do
  use Ecto.Migration

  def change do
    create table(:analytics) do

      timestamps
    end

  end
end
