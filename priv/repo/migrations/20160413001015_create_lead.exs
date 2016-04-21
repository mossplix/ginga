defmodule Ginga.Repo.Migrations.CreateLead do
  use Ecto.Migration

  def change do
    create table(:leads) do

      timestamps
    end

  end
end
