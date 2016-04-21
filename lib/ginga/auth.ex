defmodule Ginga.Auth do


	require Amnesia
	use Gingadb
	@browserid_endpoint "https://verifier.login.persona.org/verify"
	@auth_cookie         "Ginga"

	require Record
	require Logger


        #Record.defrecord :context, Record.extract(:response, from_lib: "Gingaerl/context.hrl")


      def seconds_since_epoch(ttl) do
              {mega, seconds, _} = :os.timestamp()
              mega * 1000000 + seconds+ttl
      end






      def authenticate_client(client_id, client_secret, _)  do

             	Amnesia.transaction do

             			case Client.read_at(client_secret: client_secret) do

             				[auth_client] -> {:ok,:auth_client}
             					_            -> {:error,:notfound}

     					end
            		end
     	end

         def  get_client_identity(client_id, _) do
         	Amnesia.transaction do
         		case Client.read_at(client_id: client_id) do
     				[client] -> {:ok,client}

     				_ ->{:error, :notfound}
             	end
        		 end
         end


         def associate_access_code(access_code, user,expires,scope)  do

             associate_access_token(access_code, user,expires,scope)

         end

         def associate_refresh_token(refresh_token, context, _) do
         	Amnesia.transaction do

         	 		RefreshToken.write %RefreshToken{access_token: refresh_token ,props: context}
         	end



         end

         def associate_access_token(access_token,user,expires,scope) do
             	Amnesia.transaction do
             		AccessToken.write %AccessToken{token: access_token ,user: user, scope: scope,expires: expires}
             	end

          end

          def associate_access_token(access_token) do

          end


         def resolve_access_code(access_token, context) do
             resolve_access_token(access_token)
          end

         def resolve_refresh_token(refresh_token, context) do
             resolve_access_token(refresh_token)

         end

         def resolve_access_token(access_token)  do

             Amnesia.transaction do


             			case AccessToken.read_at(access_token: access_token)  do


             			[{_,context}]  -> {:ok,context}
                          nil -> {:error, :notfound}


             			end



             end
         end


        def revoke_access_code(access_code, _app_context) do
            revoke_access_token(access_code, _app_context)
        end

        def revoke_access_token(access_token, _) do

        	   Amnesia.transaction do
        	   		case AccessToken.read_at(access_token: access_token) do

        	   			[client] -> Amnesia.transaction do
        	   							AccessToken.delete client.id
        	   						end
        	   						:ok
        	   			_  -> nil


        	  		 end
        	   end


        end

        def revoke_refresh_token(refresh_token, _) do

            :ok
        end

        def get_redirection_uri(client_id, _) do
           Amnesia.transaction do
           		case Client.read_at(client_id: client_id) do
                		[client] -> {:ok,client.redirect_uri}
               		 _ -> {:error,:notfound}
            		end
           end
        end

        def verify_redirection_uri(client_id, redirect_uri) do

            client=Amnesia.transaction do Client.read_at(client_id: client_id) end
            redirect_url=client.redirect_uri
     		case client do
     			client when redirect_uri == redirect_url -> {:ok, redirect_uri}
     			 _ ->{:error, :mismatch}
     		end


        end


        def authorize_password(email,password) do
        		c=Ginga.UserService.authenticate([email: email, password: password])
        		Logger.debug("crabby p`nts #{inspect email}  #{inspect password}aunthenticate #{inspect c}")

        		case Ginga.UserService.authenticate([email: email, password: password]) do

        			nil -> :unauthorized
        			{:ok,user}  -> {:ok,user}



        		end



        end


         def verify_client_scope(_client_id, scope, _) do

             {:ok, scope}
         end

         def verify_resowner_scope(_resowner, scope, _) do
             {:ok, scope}

         end

         def verify_scope(scope, scope, _) do
             {:ok, scope}

         end
         def verify_scope(_, _, _) do
             {:error, :invalid_scope}

         end



      #%a{client=Client, resowner=Owner, scope=Scope, ttl=TTL}, Ctx0
      #issue and associate access token
      def issue_token(user,scope,typen) do

      	token = :gingaerl.generate_token()
      	expires_in = 36000
      	ttl = seconds_since_epoch(expires_in)

      	case typen do
      		:user ->	b=associate_access_token([ token: token,user: user,expires: ttl,scope: scope])
                        res=%{access_token: token,expires_in: ttl,scope: scope,token_type: "bearer"}
                        {:ok,res }

            :client ->  b=associate_access_token([token: token,user: user,expires: ttl,scope: scope])
                       	r=%{access_token: token,expires_in: expires_in,scope: scope,token_type: "bearer"}
                       	{:ok,r}

      	end




      end


      	@spec get_client(String.t) :: %User{} | nil
      	def get_client(id) do
      		Client.get([id: id])
      	end



      	def authenticate_client(id: id, password: password) do
      		case get_client id do

      			{:ok,client} ->
      							{:ok,client}
      			_            -> {:error,:unauthorized}

      		end
       end


      def authorize_client_credentials(client,scope) do

      	:ok

       end






	def browserid_login(params) do

	end

	def google_login(params) do

	end

	def user_from_cookie(cookie) do

	end


	def whoami(params) do

	end

	def perform_auth(params) do

	end




end
