defmodule Ginga.XMPPChannel do
  use Phoenix.Channel
  import Hedwig.Client
  require Hedwig.Transports.TCP
  require Logger
  require Poison.Encoder

  def join("xmpp:"<> uuid,  user, socket) do


    client = find_or_start_client(uuid)
    socket = assign(socket, :client, client) |> assign(:user, uuid)
     send(self, {:after_join, uuid})
    {:ok, socket}
  end


  def join(_uuid, _data, socket) do
    {:error, :unauthorized, socket}
  end


  def leave(msg, socket) do
    pid = socket.assigns[:client]
    send(pid, {:stop, :normal})
    {:ok, socket}
   end
  def handle_in("new:message", msg, socket) do
    Logger.debug msg

    #Hedwig.Transports.TCP.send(socket, Stanza.message(msg))
    #send_stanza(socket, Stanza.message(msg))
end

def handle_info({:after_join, msg}, socket) do
          Logger.debug "> join #{socket.topic}"
          broadcast! socket, "user:entered", %{user: msg}
          push socket, "join", %{status: "connected"}
          {:noreply, socket}
        end

defp find_or_start_client(uuid) do
    case Process.whereis(String.to_atom(uuid)) do
        nil -> start_client(uuid)

        pid -> pid
    end
end

    defp start_client(uuid) do
       {:ok, pid} = Hedwig.Client.start_link(client_spec(uuid))
       pid
    end

   defp client_spec(uuid) do
    %{
        jid: uuid<>"@localhost",
        password: "mosespass",
        nickname: "mosesm",
        resource: "issues",
        config: %{
            ignore_from_self?: false
            },
        handlers: [
            {Soko.XMPPHandler, %{topic: uuid}}
        ]
        }
  end


    defp one_time_password do
       :crypto.rand_bytes(16) |> Base.encode16(case: :lower)
    end

    defimpl Poison.Encoder, for: Tuple do
        def encode({:xmlel, "message", attrs, children}, opts) do
            %{name: "message", attrs: attrs, payload: children}
            |> Poison.Encoder.encode(opts)
        end
    end

    defimpl Poison.Encoder, for: PID do
            def encode(pid, opts) do
                 "#PID" <> List.to_string(:erlang.pid_to_list(pid))
                |> Poison.Encoder.encode(opts)
            end
        end




end
