defmodule Ginga.LogMessages do
  require Logger # this allow using Logger.info, error, etc for logging
  @behaviour :gen_mod
   alias RethinkDB.Query, as: Q

  def start(host, _opts) do
    Logger.info('Starting ejabberd module log Messages')
    Ejabberd.Hooks.add(:filter_packet, :global, __ENV__.module, :on_filter_packet, 50)
    :ok
  end

  def stop(host) do
    Logger.info('Stopping ejabberd module Log Messages')
    Ejabberd.Hooks.delete(:filter_packet, :global, __ENV__.module, :on_filter_packet, 50)
    :ok
  end

  def on_filter_packet({from, to, xml={:xmlel, "message", attributes, children}} = packet) do


    timestamp=:Gingaerl.uuid_time()
    connection=RethinkDB.connect
    new_children = Enum.map(children, fn(child) ->
      Logger.debug(inspect packet)

      case child do
        {:xmlel, "body", [], [xmlcdata: text]} ->
          from=:jlib.jid_remove_resource(from)|>:jlib.jid_to_string
          to=:jlib.jid_remove_resource(to)|>:jlib.jid_to_string
          [_,database]=String.split(from,"@")



          Q.Selection.db(database)|>Q.Selection.table("messages")|>Q.WritingData.insert(%{to: to,from: from,body: text,timestamp: timestamp})|>RethinkDB.run connection
          {:xmlel, "body", [], [xmlcdata: text <> ""]}

        _ -> child
      end
    end)

    {from, to, {:xmlel, "message", attributes, new_children}}
  end
  def on_filter_packet(packet), do: packet
end
