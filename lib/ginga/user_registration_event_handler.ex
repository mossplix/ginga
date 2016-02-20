defmodule Ginga.UserRegistrationEvent do


        @moduledoc """
        Handles User Registration  Events.
        """
        	use GenEvent
        	require Logger

        	# Callbacks

        	@spec init(any) :: {:ok, any}
        	@doc "Event handler call initialization callback method."
        	def init(_) do
        		Logger.debug "Internal event handler started"
        		{:ok, []}
          end

          @spec handle_event({atom, any}, any) :: {:ok, any}
        	@doc "Event handling."
          def handle_event({:user_added, user}, state) do
        		# Create an event report and store it

            {:ok, state}
          end

          def handle_event({:user_email_verified, user}, state) do
            user|>Ginga.UserService.setup_vcard
            {:ok, state}
          end

          def handle_event({:user_invited, user}, state) do

              {:ok, state}
          end




end
