defmodule Ginga.OauthController do
  use Phoenix.Controller
  require  Logger

  alias ExOauth2.AccessToken
  alias ExOauth2.Strategy.AuthCode
  alias Ginga.Auth


  @params %{redirect_uri: "http://localhost:4000/auth/callback"}
  @token_params Map.merge(%{headers: [{"Accept", "application/json"}]}, @params)

  plug :action

  defmodule Random do
    def init() do
      :random.seed(:erlang.now())
    end
    def pick_element(list) do
      Enum.at(list, :random.uniform(Enum.count(list)) - 1)
    end
  end

  @doc """
  This action is reached via `/auth` and redirects to the OAuth2 provider
  based on the chosen strategy. The strategy in this example has already
  been stored in `conn.private.oauth2_strategy` in the router's pipeline.
  """
  def index(conn, _params) do
    redirect conn, external: AuthCode.authorize_url(strategy(conn), @params)
  end

  @doc """
  This action is reached via `/auth/callback` is the the callback URL that
  the OAuth2 provider will redirect the user back to with a `code` that will
  be used to request an access token. The access token will then be used to
  access protected resources on behalf of the user.
  """
  def callback(conn, %{"code" => code}) do
    # Exchange an auth code for an access token
    token = AuthCode.get_token!(strategy(conn), code, @token_params)

    # Request the user's data with the access token
    user = AccessToken.get!(token, "/user")

    # Store the user in the session under `:current_user` and redirect to /.
    # In most cases, we'd probably just store the user's ID that can be used
    # to fetch from the database. In this case, since this example app has no
    # database, I'm just storing the user map.
    #
    # If you need to make additional resource requests, you may want to store
    # the access token as well.
    conn
    |> put_session(:current_user, user)
    |> put_session(:access_token, token)
    |> redirect(to: "/")
  end


  def login(conn, _params) do
	  case File.ls("priv/static/img/photos") do

		  {:ok,b_images} -> b_images
		                   b_img =Random.pick_element(b_images)
					_  ->  b_img=""


	  end


	 render  conn,"login.html"


  end



  def resource(conn,params) do

    render conn, "resource.html"



  end






  def extract_token(conn,params) do

      case :lists.keyfind("authorization",1,conn.req_headers) do

            false ->  case params["access_token"] do



                     token -> {:ok, token}
                       _ -> {:error, :missing}

                    end
            {key,"Bearer " <> token}-> {:ok,token}

      end




  end





   def is_authorized(conn,params) do
        case extract_token(conn,params) do


            {:ok,token} -> case verify_access_token(token) do

                                {:ok, _} -> {:true}

                                {:error, :access_denied} -> {:false, "Bearer"}


                           end

            {:error,_} -> :access_denied


        end



   end


   def process_implicit_grant_stage2(conn,params) do
          client_id    = params[:client_id]
          redirect_uri = params[:redirect_uri]
          username    = params[:username]
          password    = params[:password]
          state       = params[:state]
          scope       = params[:scope]

          case Auth.verify_redirection_uri(client_id, redirect_uri) do
              :ok -> case Auth.authorize_password(username, password, scope) do
                      {:ok, response} -> response


                      {:error, reason} -> {:error,reason}


                       end
              {:error, _} ->
                  #This should not happen. Redirection URI was
                  #supposedly verified in the previous step, so
                  #someone must have been tampering with the
                  #hidden form values.

                  text conn, 400
          end
      end




  def verify_access_token(token) do
      case Auth.resolve_access_token(token) do
          {:error, _}             -> {:error, :access_denied};
          {:ok, context} ->
              case context[:expiry_time] > Auth.seconds_since_epoch(0) do
                  true  -> {:ok, context};
                  false ->
                      Auth.revoke_access_token(token,context)
                      {:error, :access_denied}
              end
      end
  end


   @accepted_methods ["application/x-www-form-urlencoded","application/json"]



   def authorize_post(conn, params)  do
           Logger.debug("params #{inspect params}")



           case params["grant_type"] || params["response_type"] do

                "password" -> process_password_grant(conn,params)
                "client_credentials" -> process_client_credentials_grant(conn,params)
                "token"  -> process_implicit_grant_stage2(conn,params)
                "refresh_token"  -> process_implicit_grant_stage2(conn,params)
                _  -> text conn, 400

           end

   end

   def authorize_get(conn,params) do
        case params[:response_type] do
            "token" -> process_implicit_grant(conn,params)
            _ -> json conn,%{:error => "unsupported_response_type"}


        end

   end

   def redirect_resp(redirect_uri, params,conn) do




         frag = URI.encode(params)
         header = [{:location , redirect_uri}, {"#" , frag} ]
         #conn.resp_headers = conn.resp_headers ++ header
         text conn,200
   end

  def process_password_grant(conn,params) do
       email = params["username"]
       password = params["password"]
       scope    = params["scope"] || ""
       x=Auth.authorize_password(email, password)
       Logger.debug("blauth #{inspect params}")
       case x do

        {:ok,user} ->  {:ok,response} =Auth.issue_token(user,scope,:user)
                        json conn,response


        _  -> text conn,400



       end

   end

   def process_client_credentials_grant(conn,params) do
       {key,"Basic " <> credentials} = :lists.keyfind("authorization",1,conn.req_headers)

       [id, secret] = String.split(:base64.decode(credentials), ":")
       scope = params[:scope]
       client = Auth.authorize_client_credentials(id, secret)
       Auth.issue_token(client,scope,:client)
  end

   def process_implicit_grant(conn,params)  do
       state       =  params[:state]
       scope       = params[:scope]
       client_id    = params[:client_id]
       redirect_uri = params[:redirect_uri]
       case Auth.verify_redirection_uri(client_id, redirect_uri) do
           :ok ->
               #Pass the scope, state and redirect URI to the browser
               #as hidden form parameters, allowing them to "propagate"
               # to the next stage.
               form = [redirect_uri: redirect_uri,client_id: client_id,state: state,scope: scope]
               render conn, "oauth.html", form: form


           {:error, reason} ->  redirect(conn, redirect_uri)


        end
    end




  defp strategy(conn), do: conn.private.oauth2_strategy
end
