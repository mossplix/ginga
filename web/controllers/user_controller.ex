defmodule Ginga.UserController do
  use Ginga.Web, :controller

  alias Ginga.Repo
  alias Ginga.User
  alias Ginga.Authorization

  def new(conn, params, current_user, _claims) do
    render conn, "new.html", current_user: current_user
  end
end
