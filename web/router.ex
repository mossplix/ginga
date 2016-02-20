defmodule Ginga.Router do
  use Ginga.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end


  # This plug will look for a Guardian token in the session in the default location
  # Then it will attempt to load the resource found in the JWT.
  # If it doesn't find a JWT in the default location it doesn't do anything
  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  # This pipeline is created for use within the admin namespace.
  # It looks for a valid token in the session - but in the 'admin' location of guardian
  # This keeps the session credentials seperate for the main site, and the admin site
  # It's very possible that a user is logged into the main site but not the admin
  # or it could be that you're logged into both.
  # This does not conflict with the browser_auth pipeline.
  # If it doesn't find a JWT in the location it doesn't do anything
  pipeline :admin_browser_auth do
    plug Guardian.Plug.VerifySession, key: :admin
    plug Guardian.Plug.LoadResource, key: :admin
  end

  # We need this pipeline to load the token when we're impersonating.
  # We don't want to load the resource though, just verify the token
  pipeline :impersonation_browser_auth do
    plug Guardian.Plug.VerifySession, key: :admin
  end


  # This pipeline if intended for API requests and looks for the JWT in the "Authorization" header
  # In this case, it should be prefixed with "Bearer" so that it's looking for
  # Authorization: Bearer <jwt>
  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", Ginga do
    # We pipe this through the browser_auth to fetch logged in people
    # We pipe this through the impersonation_browser_auth to know if we're impersonating
    # We don't just pipe it through admin_browser_auth because that also loads the resource
    pipe_through [:browser, :browser_auth, :impersonation_browser_auth]

    get "/", PageController, :index
    delete "/logout", AuthController, :logout

    resources "/users", UserController
    resources "/authorizations", AuthorizationController
    resources "/tokens", TokenController

    get "/private", PrivatePageController, :index

    get "/pricing/", PageController, :pricing
    get "/guide/", PageController, :guide
    get "/chat/messages",RethinkdbController, :messages
    post "/rethinkdb",PageController, :rethinkdb
    get "/ts", PageController, :react_test
    get "/signup/", UsersController, :new
    post "/signup/",UsersController, :signup
	  get "/login/", UsersController, :new_auth
	  post "/login/", UsersController, :do_login
    get "/logout/", UsersController, :do_logout
	  get "/app/", PageController, :app
	  get "/ejabberd", EjabberdController, :index
	  resources "/posts", PostController
	  get "/chat2", PageController,:chat
  	get "/app/", PageController, :app
  	get "/ejabberd", EjabberdController, :index
  	resources "/posts", PostController
  	get "/chat", PageController,:chat
    get "/settings", PageController,:settings
    get "/ts", PageController, :react_test
    get "/messages", PageController,:messages

    get "/xmpp",  EjabberdWsController ,:upgrade
    post "/xmpp",  EjabberdWsController,:upgrade
  end

  # This scope is the main authentication area for Ueberauth
  scope "/auth", Ginga do
    pipe_through [:browser, :browser_auth] # Use the default browser stack

    get "/:identity", AuthController, :login
    get "/:identity/callback", AuthController, :callback
    post "/:identity/callback", AuthController, :callback
  end

  # This scope is intended for admin users.
  # Normal users can only go to the login page
  scope "/admin", Ginga.Admin, as: :admin do
    pipe_through [:browser, :admin_browser_auth] # Use the default browser stack

    get "/login", SessionController, :new, as: :login
    get "/login/:identity", SessionController, :new
    post "/auth/:identity/callback", SessionController, :callback
    get "/logout", SessionController, :logout
    delete "/logout", SessionController, :logout, as: :logout
    post "/impersonate/:user_id", SessionController, :impersonate, as: :impersonation
    delete "/impersonate", SessionController, :stop_impersonating

    resources "/users", UserController
  end

  # Other scopes may use custom stacks.
  scope "/api", Ginga do
    pipe_through [:api, :api_auth]
  end


  pipeline :auth do
      plug :put_oauth_strategy
    end



  scope "/auth", alias: Ginga do
      pipe_through [:browser]
	  get "/signup/", UsersController, :new
      get "/", OauthController, :index
      get "/callback", OauthController, :callback
      post "/resource", OauthController, :get_access_token

    end

  scope "/api" do
  		pipe_through :api

  		resources "/events", Ginga.EventsController, except: []
  		resources "/streams", Ginga.StreamsController, except: []
  		resources "/users", Ginga.UsersController, except: []
  		resources "/streamdefs", Ginga.StreamDefsController, except: []
  		post "/users/get_token/", Ginga.UsersController, :get_token
  		post "/users/authorize/", Ginga.UsersController, :create
  		post "/authorize", Ginga.OauthController, :authorize_post
  		get "/authorize", Ginga.OauthController, :authorize_get
      get "/user", Ginga.UsersController,:show

    end


      # `@current_user`.
      defp assign_current_user(conn, _) do
        assign(conn, :current_user, get_session(conn, :current_user))
      end

      # Fetch the configured strategy from the router's config and store the
      # initialized strategy into `conn.private.oauth2_strategy`.
      defp put_oauth_strategy(conn, _) do
        {strategy, opts} = Ginga.Endpoint.config(:oauth2)
        put_private(conn, :oauth2_strategy, apply(strategy, :new, [opts]))
      end
end
