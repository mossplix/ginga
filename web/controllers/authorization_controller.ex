defmodule Ginga.AuthorizationController do
  use Ginga.Web, :controller
  use Guardian.Phoenix.Controller

  alias Ginga.Repo
  alias Ginga.Authorization

  def index(conn, params, current_user, _claims) do
    render conn, "index.html", current_user: current_user, authorizations: authorizations(current_user)
  end

  defp authorizations(user) do
    Ecto.Model.assoc(user, :authorizations) |> Repo.all
  end
end
