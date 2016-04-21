defmodule Ginga.Repo.Migrations.CreateAccountContact do
  use Ecto.Migration

  def change do
    create table(:account_contacts) do

      timestamps
    end

  end
end
