defmodule Ginga.EventsController do

	use Phoenix.Controller
	require Ginga.WebUtils
  	import Ginga.WebUtils, only: [key_protected: 3, default: 2]
	alias Poison, as: JSON
	plug :action

	# Authenticated API

  def index(conn, %{"user" => s_user_id}) do

			user_id = String.to_integer s_user_id
			json conn, Ginga.EventReportService.get_user_event_reports user_id

	end
  def index(conn, _params) do

			json conn, Ginga.EventReportService.get_all_event_reports

	end

  def show(conn, %{"id" => s_id}) do

			id = String.to_integer s_id
			json conn, JSON.encode!(Ginga.EventReportService.get_event_report id)

	end

  def create(conn, params) do
			user_id = params["user_id"]

			user = Ginga.UserService.get_user_with_id user_id
			event_map = %{user_id: user.id, headline: default(params["headline"],"?"), description: default(params["description"],""), tags: default(params["tags"],[]), location: default(params["location"],""), refs: default(params["refs"],[])}
			event_report = Ginga.EventReportService.add_event_report(event_map)
			json conn, JSON.encode! event_report

  end

	def bail(conn, %{"id" => s_id}) do

			id = String.to_integer s_id
			result = Ginga.EventReportService.destroy_event_report id
			json conn, JSON.encode! result

  end

end
