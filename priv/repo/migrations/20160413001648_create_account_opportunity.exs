defmodule Ginga.Repo.Migrations.CreateAccountOpportunity do
  use Ecto.Migration

  def change do
    create table(:account_opportunities) do

      timestamps
    end

  end
end
