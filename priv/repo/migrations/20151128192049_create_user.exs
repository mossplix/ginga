defmodule PhoenixGuardian.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION citext;")

    create table(:users) do
      add :name, :string
      add :email, :citext
      add :username, :string
      add :first_name, :string
      add :last_name, :string
      add :jid, :string
      add :email_token, :text
      add :vhost, :string
      add :state, :string
      add :company_name,:string
      add :plan_name, :string
      add :is_active,:boolean,default: false
      add :login_count,:integer
      add :last_login,:datetime
      add :country_id,:integer
      add :company_id,:integer
      add :plan_id,:integer



      timestamps
    end

    create index(:users, [:email], unique: true)
    create index(:users, [:jid])
    create index(:users, [:username])
  end
end
