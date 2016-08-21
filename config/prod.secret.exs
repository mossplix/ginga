use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :ginga, Ginga.Endpoint,
  secret_key_base: "f7y6AJo4HHumfW3YOBAC0kOY8Qixh1LbgCMFkvyhjEAbDauPyXBcoCmG/Tznq9Uk"

# Configure your database
config :ginga, Ginga.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "ginga_dev",
  pool_size: 20
