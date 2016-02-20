defmodule Ginga.RethinkdbController do

    alias RethinkDB.Query, as: Q
    import Plug.Conn
    require Logger

    use Ginga.Web, :controller
    use Phoenix.Controller
    plug :action

    def messages(conn,%{ "from" => from,"to" => to}) do

        [_,database]=from|>String.split("@")
        connection=RethinkDB.connect
        try do

          %{data: res}=Q.Selection.db(database)|>Q.Selection.table("messages")|> Q.filter(%{from: from,to: to})|>RethinkDB.run connection

          case res do
            res when is_list res -> json conn,res
            _-> json conn,[]
          end
          json conn,res
        catch
          kind, reason -> json conn,[]


        end
    end

end
