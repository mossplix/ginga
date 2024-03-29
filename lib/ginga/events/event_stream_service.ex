defmodule Ginga.EventStreamService do
	@moduledoc """
Ginga's event stream service. Generates and managed each event report stream as a supervised agent.
"""


	require Logger
	use Gingadb

	# API

	@spec start_link(atom, %EventStreamDef{}, %User{}, %EventStream{}) :: {:ok, pid} | {:error, {:already_started, pid} | term}
  @doc "Starts an agent holding an event stream as its state. Invoked by the streams supervisor."
	def start_link(name, event_stream_def, user, super_event_stream \\ nil) do # state is an EventStream
		{:ok, _pid} = Agent.start_link(fn -> EventStream.start(name, event_stream_def, user, super_event_stream) end, [name: name])
	end

	@spec universal_event_stream(%User{}) :: atom
	@doc "Starts a universal event stream"
	def universal_event_stream(user) do
		event_stream_def = Ginga.EventStreamDefService.universal_event_stream_def
	  start_event_stream(event_stream_def: event_stream_def, user: user, super_stream: nil)
  end

	@spec user_event_stream([source: %User{}, user: %User{}]) :: atom
	@doc "Starts a user event stream for a given user from ad hoc definition."
  def user_event_stream([source: source, user: user]) do
		event_stream_def = Ginga.EventStreamDefService.user_event_stream_def(source)
	  start_event_stream(event_stream_def: event_stream_def, user: user, super_stream: nil)
  end

	@spec properties_event_stream([filter_options: %FilterOptions{}, user: %User{}]) :: atom
	@doc "Starts a properties event stream from ad hoc definition."
  def properties_event_stream([filter_options: filter_options, user: user]) do
		event_stream_def = Ginga.EventStreamDefService.properties_event_stream_def([user: user, filter_options: filter_options])
	  start_event_stream(event_stream_def: event_stream_def, user: user, super_stream: nil)
  end

	@spec event_stream(%EventStreamDef{}, %User{}) :: atom
	@doc "Starts an event stream given its definition"
  def event_stream(event_stream_def, user) do
		start_event_stream(event_stream_def: event_stream_def, user: user, super_stream: nil)
  end

	# For testing
	def fail(name) do
		Agent.get(name, &(&1 / 3))
  end

	@spec get_event_stream(atom) :: %EventStream{}
	@doc "Get an event stream given it's agent name"
  def get_event_stream(name) do
		Agent.get(name, &(&1))
  end

	@spec get_current(atom) :: %EventReport{} | nil
  @doc "Get current event report in the stream"
  def get_current(name) do
		Agent.get(name, &(&1.current))
  end

	@spec next(atom) :: %StreamedEventReport{} | nil
  @doc "Gets the next event report from the named event stream and advances it. Nil is returned at the end of the stream that is then restarted."
	def next(name) do # returns nil when end of stream is hit and the stream restarts from beginning
		Logger.debug "===> Next of #{name}"
 		Agent.get_and_update(name, &EventStream.next(&1) )
	end

	@spec stop(atom) :: :ok
	@doc "Permanently stops the event stream and recycles its name (an atom)."
	def stop(name) do
		event_stream = Agent.get(name, &(&1))
		Agent.stop(name)
		Ginga.AtomPool.release name
		# Also stop source streams
		Enum.each(event_stream.sub_event_streams, &stop(&1))
	end

	@spec start_event_stream([event_stream_def_id: non_neg_integer, user: %User{}, super_stream: %EventStream{}]) :: atom
	@doc "Asks the streams supervisor to start a new event stream as agent using a new or recycled name which is returned."
	def start_event_stream([event_stream_def_id: id, user: user, super_stream: super_event_stream]) do
		event_stream_def = Ginga.EventStreamDefService.get_visible(id, user)
		if event_stream_def != nil do
			start_event_stream(event_stream_def: event_stream_def, user: user, super_stream: super_event_stream)
    else
			Logger.warn("Failed to start event stream: Could not find an event stream definition with id #{id}")
      nil
    end
  end
	@spec start_event_stream([event_stream_def: %EventStreamDef{}, user: %User{}, super_stream: %EventStream{}]) :: atom
	@doc "Asks the streams supervisor to start a new event stream as agent using a new or recylced name which is returned."
	def start_event_stream([event_stream_def: event_stream_def, user: user, super_stream: super_event_stream]) do
		name = Ginga.AtomPool.take
		Logger.debug "===> Starting event stream named #{name} from def #{event_stream_def.description}"
		{:ok, _pid} = Ginga.StreamsSupervisor.start_event_stream(name, event_stream_def, user, super_event_stream)
		name
	end

end
