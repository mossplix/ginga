defmodule Mix.Tasks.DB.Uninstall do

  use Mix.Task
  @shortdoc "Destroy the Mnesia db"
  @moduledoc """
  Mix task for destroying the Mnesia db.
  """
  def run(_) do
    # Start mnesia, or we can't do much.
    Amnesia.start

    # Destroy the database.
    Gingadb.destroy

		# Stop mnesia, so it flushes everything.
    Amnesia.stop

    # Destroy the schema for the node.
    Amnesia.Schema.destroy

		IO.puts "Ginga removed!"
  end
end
