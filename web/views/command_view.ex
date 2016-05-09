defmodule Ginga.CommandView do
  use Ginga.Web, :view

  def render("index.json", %{commands: commands}) do
    %{data: render_many(commands, Ginga.CommandView, "command.json")}
  end

  def render("show.json", %{command: command}) do
    %{data: render_one(command, Ginga.CommandView, "command.json")}
  end

  def render("command.json", %{command: command}) do
    %{id: command.id}
  end
end
