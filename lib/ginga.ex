defmodule Ginga do
@moduledoc """
The Ginga EBS application. It starts Mnesia, initializing it if needed, and starts the Phoenix supervisor.
"""
  use Application
  require Logger

### Application Callbacks

@spec start(atom, any) :: {:ok, pid}
@doc "Starts the Ginga application"
def start(_type, _args) do
    import Supervisor.Spec, warn: false
		Application.start :logger
		:ok = Amnesia.start
		{:ok, _} = HTTPotion.start

    :ok =  :application.start(:email)



		IO.puts "Mnesia started"
    children = [
      # Define workers and child supervisors to be supervised
       supervisor(Ginga.MainSupervisor, []),
       worker(Ginga.Repo, []),
    ]
    opts = [strategy: :one_for_one, name: Ginga.Supervisor]
    {:ok, pid} = Supervisor.start_link(children, opts)
    initialize_db
    #add_all_hosts()
		{:ok, pid}
  end

  @spec stop(any) :: any
  @doc "Stops the Ginga application"
	def stop(_) do
		Amnesia.stop
  end

### API

	@doc "Starts Phoenix manually"
	def start_phoenix() do
		Mix.Tasks.Phoenix.Start.run []
	end

### Private

  # Adds the universal stream definition and the Ginga user to the database, if not already there.
	defp initialize_db() do

	    :ok
  end


  # Tell Phoenix to update the endpoint configuration
    # whenever the application is updated.
    def config_change(changed, _new, removed) do
      Ginga.Endpoint.config_change(changed, removed)
      :ok
    end


    defp start_module(host) do
            {:atomic,[{_,_,modules}]}=:mnesia.transaction(fn()->:mnesia.read(:local_config, {:modules,:global}) end)

            modules|>Enum.map fn({module,args}) -> try do
                                                :gen_mod.start_module(host, module, args)

                                                catch
                                                    kind, reason -> Logger.info(inspect reason)
                                                end
                                                end


      end

      defp add_all_hosts() do
          {_,[{_,_,current_hosts}]}=:mnesia.transaction(fn()->:mnesia.read(:local_config, {:hosts,:global}) end)
           {_,companies} = :Gingaerl.get_all_rows(Gingaebs.Company)
           hosts=Gingadb.Company.keys!|>Enum.map fn(key) -> key|>Gingaebs.Company.read!|>Map.get :vhost end
           hosts|>Enum.map fn(host) -> start_module(host) end
         :ejabberd_config.add_global_option(:hosts,current_hosts++hosts)

      end

end
