defmodule Ginga.TaskView do
  use Ginga.Web, :view

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, Ginga.TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, Ginga.TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id}
  end
end
