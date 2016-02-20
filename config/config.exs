# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :ginga, Ginga.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "l//VMa0BLEuheS53joHFuUrfgGt4UvlSFdFeoWxx1XG3rfofe9W2FMeZVvZJN2tR",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: Ginga.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :joken, config_module: Guardian.JWT


config :guardian, Guardian,
  issuer: "Sparkplug",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: PhoenixGuardian.GuardianSerializer,
  secret_key: "UvlSFdFeoWxx1XG3rfofe9W2FMeZVvZJN2tR",
  hooks: GuardianDb,
  permissions: %{
    default: [
      :read_profile,
      :write_profile,
      :read_token,
      :revoke_token,
    ],
  }

config :ueberauth, Ueberauth,
  providers: [
    identity: {Ueberauth.Strategy.Identity, [callback_methods: ["POST"]]},
  ]


config :guardian_db, GuardianDb,
       repo: PhoenixGuardian.Repo


# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false


config :ejabberd,
  file: "config/ejabberd.yml",
  log_path: 'log/ejabberd.log'

config :mnesia,
  dir: 'mnesiadb/'
