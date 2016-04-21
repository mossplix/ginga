defmodule Ginga.Repo.Migrations.CreateActivity do
  use Ecto.Migration

  def change do
    create table(:activities) do

      timestamps
    end

  end
end
