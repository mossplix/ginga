defmodule Ginga.OpportunityController do
  use Ginga.Web, :controller

  alias Ginga.Opportunity

  plug :scrub_params, "opportunity" when action in [:create, :update]

  def index(conn, _params) do
    opportunities = Repo.all(Opportunity)
    render(conn, "index.json", opportunities: opportunities)
  end

  def create(conn, %{"opportunity" => opportunity_params}) do
    changeset = Opportunity.changeset(%Opportunity{}, opportunity_params)

    case Repo.insert(changeset) do
      {:ok, opportunity} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", opportunity_path(conn, :show, opportunity))
        |> render("show.json", opportunity: opportunity)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    opportunity = Repo.get!(Opportunity, id)
    render(conn, "show.json", opportunity: opportunity)
  end

  def update(conn, %{"id" => id, "opportunity" => opportunity_params}) do
    opportunity = Repo.get!(Opportunity, id)
    changeset = Opportunity.changeset(opportunity, opportunity_params)

    case Repo.update(changeset) do
      {:ok, opportunity} ->
        render(conn, "show.json", opportunity: opportunity)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    opportunity = Repo.get!(Opportunity, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(opportunity)

    send_resp(conn, :no_content, "")
  end
end
