defmodule Mix.Tasks.DB.Migrate do

  use Mix.Task
  require Amnesia


  @shortdoc "Initialize the Mnesia db"
  @moduledoc """
  Mix task for configuring the Mnesia db


  """


  def run(_) do

      Amnesia.start
      IO.puts "creating tables ..."

          Gingadb.UserRoom.create
          #Gingadb.AuthAccessToken.create
          #Gingadb.AuthRefreshToken.create

          Amnesia.stop

  end








end
