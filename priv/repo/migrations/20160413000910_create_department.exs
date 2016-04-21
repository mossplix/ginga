defmodule Ginga.Repo.Migrations.CreateDepartment do
  use Ecto.Migration

  def change do
    create table(:departments) do

      timestamps
    end

  end
end
