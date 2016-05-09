defmodule Ginga.PushNotificationView do
  use Ginga.Web, :view

  def render("index.json", %{push_notifications: push_notifications}) do
    %{data: render_many(push_notifications, Ginga.PushNotificationView, "push_notification.json")}
  end

  def render("show.json", %{push_notification: push_notification}) do
    %{data: render_one(push_notification, Ginga.PushNotificationView, "push_notification.json")}
  end

  def render("push_notification.json", %{push_notification: push_notification}) do
    %{id: push_notification.id}
  end
end
