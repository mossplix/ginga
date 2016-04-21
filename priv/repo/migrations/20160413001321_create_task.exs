defmodule Ginga.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :user_id, :integer
      add :assigned_to, :integer
      add :completed_by, :integer
      add :due_at ,:datetime
      add :priority, :string
      add :completed_at,:datetime
      add :description,:text

      timestamps
    end

  end
end
