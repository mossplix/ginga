defmodule Ginga.GreatSuccess do
 use Hedwig.Handler
 @links [
    "http://mjanja.co.ke/wordpress/wp-content/uploads/2013/09/borat_great_success.jpg",
     "https://www.youtube.com/watch?v=r13riaRKGo0"
 ]

 def handle_event(%Message{} = msg, opts) do
    cond do
        hear ~r/sparkling success(!)?/i, msg -> process msg
        true -> :ok
    end


     {:ok, opts}
 end
 def handle_event(_, opts), do: {:ok, opts}

 defp process(msg) do
    :random.seed(:os.timestamp)
    link = Enum.shuffle(@links) |> List.first
    reply(msg, Stanza.body(link))
 end
end
