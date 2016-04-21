defmodule Ginga.Repo.Migrations.CreateOpportunity do
  use Ecto.Migration

  def change do
    create table(:opportunities) do

      timestamps
    end

  end
end
