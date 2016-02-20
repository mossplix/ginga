defmodule Ginga.LayoutView do
  use Ginga.Web, :view
  import Plug.Conn
  require Logger




  def logged_in(conn) do
    case  current_user(conn) do
      nil -> false
      _  -> true
    end

  end
end
