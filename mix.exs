defmodule Ginga.Mixfile do
  use Mix.Project

  def project do
    [app: :ginga,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: ["lib", "web","utils"],
     compilers: [:phoenix] ++ Mix.compilers,
     erlc_paths: ["erlang"],
    erlc_options: erlc_options,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases,
     deps: deps]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Ginga, []},
     applications: [:phoenix,
                    :phoenix_html,
                    :cowboy,
                    :logger,
                    :phoenix_ecto,
                    :postgrex,
                    :mnesia,  :comeonin,:ueberauth_identity, :tzdata, :dbg,:bcrypt,:ecto,:ejabberd,:hedwig]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]


  defp erlc_options do
      includes = Path.wildcard(Path.join("erlang", "/includes"))
      [:debug_info, {:d}] ++ Enum.map(includes, fn(path) -> {:i, path} end)
    end


  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.0.4"},
     {:phoenix_ecto, "~> 1.1"},
     {:guardian, "~> 0.9.0"},
     {:guardian_db, "0.4.0"},

     {:ueberauth, git: "https://github.com/ueberauth/ueberauth.git", override: true},
      {:comeonin, "~> 1.6"},

     {:ueberauth_identity, path: "src/ueberauth_identity", override: true},

     #{:ecto, ">= 0.0.0"},
     {:postgrex, ">= 0.0.0"},
     {:phoenix_html, "~> 2.1"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:cowboy, "~> 1.0"},

      {:timex, github: "bitwalker/timex",tag: :master},
      #{:geo, "~> 0.8.0"},
      {:poolboy, "~> 1.4.1",override: true},
      {:amnesia, github: "meh/amnesia", tag: :master},
      #{:couchie, github: "nirvana/couchie"},
      #{:uuid, "~> 0.1.5"},
      {:gen_smtp, github: "Vagabond/gen_smtp", compile: "rebar compile"},
      {:dbg, github: "fishcakez/dbg"},
      {:httpotion, "~> 2.0.0"},
      {:linguist, "~> 0.1.4"},
      { :decimal, "~> 1.1.0",override: true},
      {:bcrypt, github: "chef/erlang-bcrypt", tag: "master",compile: "make"},
     { :email, github: "kivra/email" },
     #{:oauth2c, github: "kivra/oauth2_client", tag: "master",compile: "make"},
     #{:oauth2, github: "kivra/oauth2", tag: "master",compile: "make"},
     #{:sokoerl, path: "erlang/sokoerl",compile: "rebar compile",app: false},
     #{:hackney, github: "benoitc/hackney", tag: "1.0.4",override: true},
     { :exredis, ">= 0.1.1" },
     #{:rethinkdb, path: "utils/exrethinkdb"},
     #{:toke, github: "rabbitmq/toke",tag: :master,compile: "rebar compile"},
     #{:exmpp, github: "mkrentovskiy/exmpp",tag: :master,compile: "./configure && make"},
     {:eredis,  [github: "wooga/eredis",override: true]},

           {:hedwig, "~> 0.1"},
           {:exml, github: "esl/exml", override: true},
           #{:mongooseim, github: "esl/MongooseIM", branch: "phoenix-integration"},

           #overrides
           {:cowboy, "~> 1.0", override: true},
           {:ejabberd, ">= 15.03.0", github: "processone/ejabberd"},
           {:escalus,  github: "esl/escalus"},
           # {:cowboy_revproxy, [github: "mossplix/cowboy_revproxy",compile: "rebar compile"]},
            {:meck, [github: "eproxus/meck", branch: "master",override: true]},
            {:migresia, [github: "yoonka/migresia", branch: "master",compile: "rebar compile"]},

            #{:cache_tab, [github: "processone/cache_tab", branch: "master",compile: "rebar get-deps compile"]},
            #{:mochiweb_util, [github: "bipthelin/mochiweb_util", branch: "master",compile: "rebar compile",override: true]},
            {:erlcron, [github: "erlware/erlcron", branch: "master",compile: "rebar get-deps && rebar compile",override: true]},
            #{:boss_db, [github: "ErlyORM/boss_db", branch: "master",compile: "rebar get-deps && rebar compile",override: true]},
            #{:meshup, [github: "klarna/meshup", branch: "master",compile: "rebar get-deps && rebar compile"]},

            {:rethinkdb,  [github: "hamiltop/rethinkdb-elixir"]},
            {:exactor,  [github: "sasa1977/exactor"]},
            #{:mandrill,  [github: "slogsdon/mandrill-elixir"]},
             {:ibrowse,  [github: "cmullaparthi/ibrowse", tag: "v4.0.2",override: true]},
              {:jsx,  [github: "talentdeficit/jsx", tag: "v2.1.1",override: true]},
              {:p1_utils,  [github: "processone/p1_utils",compile: "rebar get-deps compile",override: true]},
                #{:p1_yaml,  [github: "processone/p1_yaml",compile: "./configure && make",override: true]},
              #{:p1_tls,  [github: "processone/tls",override: true]},
              #{:p1_stun,  [github: "processone/stun",override: true]},



   ]
  end

  # Aliases are shortcut or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"]]
  end
end
