defmodule Ginga.MainSupervisor do
	@moduledoc """
Ginga's main supervisor. It supervises the Event Manager, the Atom Pool and the Stream Supervisor.
It is itself supervised by the Phoenix supervisor.
"""
	@name __MODULE__
	use Supervisor
	require Logger

	### Supervisor Callbacks

	@spec start_link() :: {:ok, pid}
  def start_link() do
		Logger.debug "Starting main supervisor"
		{:ok, _pid} = Supervisor.start_link(@name, [], [name: @name])
	end

	@spec init(any) :: {:ok, tuple}
	def init(_) do
		children = [
								 worker(Ginga.EventManager, []),
								 #worker(Ginga.Endpoint, []),
								
								 worker(Ginga.AtomPool, [100]),
								# worker(Ginga.Repo, []),
								 #worker(Ginga.RConnect, []),
								  #pre-populate atom pool with 100 reusable atoms
								 #worker(Task, [fn -> :os.cmd('grunt --gruntfile=./Gruntfile.js --base=.') end]),
								 supervisor(Ginga.StreamsSupervisor, []),
								 supervisor(Ginga.BoardChannel.Supervisor, [])
						   ]
		opts = [strategy: :one_for_one]
		supervise(children, opts)
	end

end
