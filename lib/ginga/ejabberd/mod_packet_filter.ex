defmodule Ginga.FilterPacket do
  require Logger # this allow using Logger.info, error, etc for logging
  @behaviour :gen_mod

  def start(host, _opts) do
    Logger.info('Starting ejabberd module Filter Packet Demo')
    Ejabberd.Hooks.add(:filter_packet, :global, __ENV__.module, :on_filter_packet, 50)
    :ok
  end

  def stop(host) do
    Logger.info('Stopping ejabberd module Filter Packet Demo')
    Ejabberd.Hooks.delete(:filter_packet, :global, __ENV__.module, :on_filter_packet, 50)
    :ok
  end

  def on_filter_packet({from, to, xml={:xmlel, "message", attributes, children}} = packet) do
    new_children = Enum.map(children, fn(child) ->
      case child do
        {:xmlel, "body", [], [xmlcdata: text]} ->

          {:xmlel, "body", [], [xmlcdata: text <> ""]}
        _ -> child
      end
    end)

    {from, to, {:xmlel, "message", attributes, new_children}}
  end
  def on_filter_packet(packet), do: packet
end
