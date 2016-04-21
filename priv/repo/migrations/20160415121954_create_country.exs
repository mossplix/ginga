defmodule Ginga.Repo.Migrations.CreateCountry do
  use Ecto.Migration

  def change do
    create table(:countries) do
      add :name, :citext
      add :iso, :citext
      add :iso3, :citext
      add :nicename, :citext
      add :numcode, :citext
      add :phonecode, :citext
    end

  end
end


