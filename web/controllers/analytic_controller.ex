defmodule Ginga.AnalyticController do
  use Ginga.Web, :controller

  alias Ginga.Analytic

  plug :scrub_params, "analytic" when action in [:create, :update]

  def index(conn, _params) do
    analytics = Repo.all(Analytic)
    render(conn, "index.json", analytics: analytics)
  end

  def create(conn, %{"analytic" => analytic_params}) do
    changeset = Analytic.changeset(%Analytic{}, analytic_params)

    case Repo.insert(changeset) do
      {:ok, analytic} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", analytic_path(conn, :show, analytic))
        |> render("show.json", analytic: analytic)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    analytic = Repo.get!(Analytic, id)
    render(conn, "show.json", analytic: analytic)
  end

  def update(conn, %{"id" => id, "analytic" => analytic_params}) do
    analytic = Repo.get!(Analytic, id)
    changeset = Analytic.changeset(analytic, analytic_params)

    case Repo.update(changeset) do
      {:ok, analytic} ->
        render(conn, "show.json", analytic: analytic)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    analytic = Repo.get!(Analytic, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(analytic)

    send_resp(conn, :no_content, "")
  end
end
