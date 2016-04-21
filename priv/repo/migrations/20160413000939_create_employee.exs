defmodule Ginga.Repo.Migrations.CreateEmployee do
  use Ecto.Migration

  def change do
    create table(:employees) do

      timestamps
    end

  end
end
