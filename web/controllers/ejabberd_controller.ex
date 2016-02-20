defmodule Ginga.EjabberdController do
  @behaviour :cowboy_websocket_handler


  use Ginga.Web, :controller


  # This is used to import the jid record structure from ejabberd:
  require Record
  Record.defrecord :jid, Record.extract(:jid, from: "deps/ejabberd/include/jlib.hrl")



  def index(conn, _params) do
    # get online jid, parse and extract the user part.
    online_users = :ejabberd_sm.connected_users
                      |> Enum.map &(jid(:jlib.string_to_jid(&1), :user))
    render conn, "index.html", users: online_users
  end

  def create_muc(conn, params) do
      :mod_muc_admin.create_room()
      :mod_muc_admin.set_room_affiliation()

  end

  def add_user_muc(conn,params) do

  end


end
