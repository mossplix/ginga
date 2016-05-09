defmodule Ginga.PushNotificationController do
  use Ginga.Web, :controller

  alias Ginga.PushNotification

  plug :scrub_params, "push_notification" when action in [:create, :update]

  def index(conn, _params) do
    push_notifications = Repo.all(PushNotification)
    render(conn, "index.json", push_notifications: push_notifications)
  end

  def create(conn, %{"push_notification" => push_notification_params}) do
    changeset = PushNotification.changeset(%PushNotification{}, push_notification_params)

    case Repo.insert(changeset) do
      {:ok, push_notification} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", push_notification_path(conn, :show, push_notification))
        |> render("show.json", push_notification: push_notification)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    push_notification = Repo.get!(PushNotification, id)
    render(conn, "show.json", push_notification: push_notification)
  end

  def update(conn, %{"id" => id, "push_notification" => push_notification_params}) do
    push_notification = Repo.get!(PushNotification, id)
    changeset = PushNotification.changeset(push_notification, push_notification_params)

    case Repo.update(changeset) do
      {:ok, push_notification} ->
        render(conn, "show.json", push_notification: push_notification)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Ginga.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    push_notification = Repo.get!(PushNotification, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(push_notification)

    send_resp(conn, :no_content, "")
  end
end
