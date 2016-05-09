defmodule Ginga.Repo.Migrations.CreateWebhook do
  use Ecto.Migration

  def change do
    create table(:webhooks) do

      timestamps
    end

  end
end
