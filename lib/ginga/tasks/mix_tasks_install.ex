defmodule Mix.Tasks.DB.Install do

  use Mix.Task

  @shortdoc "Initialize the Mnesia db"
  @moduledoc """
  Mix task for configuring the Mnesia db
  """
  def run(_) do
    Amnesia.stop
    # This creates the mnesia schema, this has to be done on every node before
    # starting mnesia itself, the schema gets stored on disk based on the
    # `-mnesia` config, so you don't really need to create it every time.
    Amnesia.Schema.create

    # Once the schema has been created, you can start mnesia.
    Amnesia.start

		# When you call create/1 on the database, it creates a metadata table about
    # the database for various things, then iterates over the tables and creates
    # each one of them with the passed copying behaviour
    #
    # In this case it will keep a ram and disk copy on the current node.
    Gingadb.create!(disk: [node])
    :ets.new(:session, [:named_table, :public, read_concurrency: true])


    # This waits for the database to be fully created.
    Gingadb.wait
    :mnesia.add_table_index(Gingadb.User,:jid)
    :mnesia.add_table_index(Gingadb.User,:email)
    :mnesia.add_table_index(Gingadb.User,:username)
    :mnesia.add_table_index(Gingadb.Credentials,:user_id)
    :mnesia.add_table_index(Gingadb.Company,:website)



    # Stop mnesia so it can flush everything and keep the data sane.
    Amnesia.stop
		IO.puts "DB installed!"
  end
end
