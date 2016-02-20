defmodule Ginga.InternalEventHandler do
	@moduledoc """
Handles internal Ginga events.
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
		date = Timex.DateFormat.format!(Timex.Date.now, "{RFC1123}")
		Ginga.EventReportService.add_event_report(%{user_id: user.email, headline: "New user #{user.first_name}", description: "User #{user.first_name} at #{user.email} was added on #{date}"})
		Logger.debug "Handled event: Added event report about new user #{user.first_name}"

		Ginga.EventStreamDefService.add_user_event_stream_def(user)
		Logger.debug "Handled event: Added event stream def for new user #{user.first_name}"
    {:ok, state}
  end
  def handle_event({:event_report_added, _event_report}, state) do
		#TODO something
		{:ok, state}
  end

end
