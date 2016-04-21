defmodule Ginga.UserRegistrationEvent do


        @moduledoc """
        Handles User Registration  Events.
        """
        	use GenEvent
        	require Logger
        	alias Ginga.User

        	# Callbacks

        	@spec init(any) :: {:ok, any}
        	@doc "Event handler call initialization callback method."
        	def init(_) do
        		Logger.debug "Registration Event Handler started"
        		{:ok, []}
          end



          def handle_event({:user_email_verified, user}, state) do
            user|>Ginga.UserService.setup_vcard
            {:ok, state}
          end

           def handle_event({:user_added, user}, state) do
               user |> User.setup_vhost

               user |> User.gen_xmpp_values
               user |> User.setup_vcard


              Logger.debug "Handling User added event"
              url= Ginga.Endpoint.config(:host)<>"/account/email/verify/"<>user.email_token

        	  Ginga.EmailService.send_template_email([to: [user.email],from: "hello@sparkpl.ug", subject: "Please Comfirm your Email",template: "comfirm_email.html",template_args: %{user: user,url: url}])


            {:ok, state}
          end

          def handle_event({:user_invited, user}, state) do

              {:ok, state}
          end

          def handle_event({:event_report_added, _event_report}, state) do
                #TODO something
                {:ok, state}
        end








end
