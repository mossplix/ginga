defmodule Ginga.StreamsController do

	use Phoenix.Controller
	require Ginga.WebUtils
	alias Poison, as: JSON
	plug :action

	# Authenticated API

  def show(conn, %{"id" => s_name}) do

			name = String.to_atom s_name
			next = Ginga.EventStreamService.next name
			json conn,  next

	end

	# Event streams from ad-hoc event stream definitions
  def create(conn, %{"type" => type,"source" => source_id,  "user" => user_id}) when type == "user" do

			source = Ginga.UserService.get_user_with_id source_id
			user = Ginga.UserService.get_user_with_id user_id
			if source !== nil do
				stream_id = Ginga.EventStreamService.user_event_stream([source: source, user: user])
				json conn, %{stream: stream_id}
			else
				json conn,  nil
			end

  end
  def create(conn, %{"type" => type,"id" => id}) when type == "universal"  do

			user = Ginga.UserService.get_user_with_id id
			if user != nil do
				name =  Ginga.EventStreamService.universal_event_stream(user)
				json conn,  %{stream: name}

		end
  end
	def create(conn, %{"type" => type,  "properties" => properties,"id" => id}) when type == "properties" do

			user = user = Ginga.UserService.get_user_with_id id
			filter_options = FilterOptions.from_map(properties)
			name =  Ginga.EventStreamService.properties_event_stream([filter_options: filter_options, user: user])
			json conn, %{stream: name}

  end

  # Event stream from pre-defined event stream def
  def create(conn, %{ "def" => s_def_id,"id" => id}) do

			stream_def_id = String.to_integer(s_def_id)
			user = Ginga.UserService.get_user_with_id id
			event_stream_def = Ginga.EventStreamDefService.get_visible(stream_def_id, user)
			if event_stream_def !== nil do
				name = Ginga.EventStreamService.event_stream(event_stream_def, user)
        json conn, JSON.encode! %{stream: name}
      else
				json conn, JSON.encode! %{error: :not_found}
			end

  end

	def destroy(conn, %{"id" => s_name}) do

			name = String.to_atom s_name
			result = Ginga.EventStreamService.stop name
			json conn, JSON.encode! result

  end

end
