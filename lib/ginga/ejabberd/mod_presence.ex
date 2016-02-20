defmodule Ginga.ModPresence do
  #import Ejabberd.Logger # this allow using info, error, etc for logging
  require Logger
  require Ejabberd
  @behaviour :gen_mod




  def start(host, _opts) do
    Logger.info('Starting ejabberd module Presence Demo')
    Ejabberd.Hooks.add(:set_presence_hook, host, __ENV__.module, :on_presence, 50)
    :ok
  end




  def stop(host) do
    Logger.info('Stopping ejabberd module Presence Demo')
    Ejabberd.Hooks.delete(:set_presence_hook, host, __ENV__.module, :on_presence, 50)
    :ok
  end

  def on_presence(user, _server, _resource, packet) do
    Logger.info('Receive presence for #{user}')
    Logger.info(inspect(:xml.get_subtag(packet, "show")))
    Logger.info(inspect(:xml.get_subtag(packet, "status")))

    :none
  end

end
