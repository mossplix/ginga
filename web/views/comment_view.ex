defmodule Ginga.CommentView do
  use Ginga.Web, :view

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, Ginga.CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, Ginga.CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id}
  end
end
