defmodule Ginga.XMPPHandler do
    use Hedwig.Handler
    alias Ginga.Endpoint

    def handle_event(%Message{} = stanza, opts) do
        Endpoint.broadcast! "xmpp:#{opts.topic}", "new:message", stanza
         {:ok, opts}
    end


    def handle_event(%Presence{} = stanza, opts) do
        case stanza.type do
            "subscribe" ->
                stanza = %Presence{stanza | to: stanza.from, type: "subscribed"}
                Hedwig.Client.reply(stanza.client, stanza)
            _ ->
                Endpoint.broadcast! "xmpp:#{opts.topic}", "new:presence", stanza
        end
        {:ok, opts}
    end

   def handle_event(%IQ{type: "result"} = stanza, opts) do
        Endpoint.broadcast! "xmpp:#{opts.topic}", "iq:result", stanza
        {:ok, opts}
   end



    def handle_event(_, opts), do: {:ok, opts}
end
