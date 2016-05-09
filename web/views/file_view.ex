defmodule Ginga.FileView do
  use Ginga.Web, :view

  def render("index.json", %{files: files}) do
    %{data: render_many(files, Ginga.FileView, "file.json")}
  end

  def render("show.json", %{file: file}) do
    %{data: render_one(file, Ginga.FileView, "file.json")}
  end

  def render("file.json", %{file: file}) do
    %{id: file.id}
  end
end
