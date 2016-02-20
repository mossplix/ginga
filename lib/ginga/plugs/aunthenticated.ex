defmodule Ginga.Plugs.Authenticated do
  @moduledoc """
  Authenticated plug can be used to filter actions for users that are
  authenticated.
  """
  import Plug.Conn
  use Phoenix.Controller
  require Logger

  def init(options) do
    options
  end


  def call(conn, _) do
    conn = fetch_session(conn)
    Logger.info("heeere")

    if get_session(conn, :logged_in) do
      assign(conn, :current_user, get_session(conn, :current_user))
    else
      conn |> Phoenix.Controller.redirect(to: not_logged_in_url) |> halt
    end
  end

  def not_logged_in_url do
    "/login"
  end

end
