defmodule Ginga.Repo.Migrations.CreatePushNotification do
  use Ecto.Migration

  def change do
    create table(:push_notifications) do

      timestamps
    end

  end
end
