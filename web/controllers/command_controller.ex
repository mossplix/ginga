defmodule Ginga.CommandController do
  use Ginga.Web, :controller

  alias Ginga.Command

  plug :scrub_params, "command" when action in [:create, :update]

  def index(conn, _params) do
    commands = Repo.all(Command)
    render(conn, "index.json", commands: commands)
  end

  def create(conn, %{"command" => command_params}) do
    changeset = Command.changeset(%Command{}, command_params)

    case Repo.insert(changeset) do
      {:ok, command} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", command_path(conn, :show, command))
        |> render("show.json", command: command)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    command = Repo.get!(Command, id)
    render(conn, "show.json", command: command)
  end

    def suggestions(conn, %{"term" => term}) do
    commands = Repo.all(Command)
    render(conn, "index.json", commands: commands)
  end

  def update(conn, %{"id" => id, "command" => command_params}) do
    command = Repo.get!(Command, id)
    changeset = Command.changeset(command, command_params)

    case Repo.update(changeset) do
      {:ok, command} ->
        render(conn, "show.json", command: command)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    command = Repo.get!(Command, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(command)

    send_resp(conn, :no_content, "")
  end
end
