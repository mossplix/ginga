defmodule Ginga.Repo.Migrations.CreatePromoCodes do
  use Ecto.Migration

  def change do
    create table(:promo_codes) do
      add :name, :string

      timestamps
    end

  end
end
