defmodule Ginga.ContactView do
  use Ginga.Web, :view

  def render("index.json", %{contacts: contacts}) do
    %{data: render_many(contacts, Ginga.ContactView, "contact.json")}
  end

  def render("show.json", %{contact: contact}) do
    %{data: render_one(contact, Ginga.ContactView, "contact.json")}
  end

  def render("contact.json", %{contact: contact}) do
    %{id: contact.id}
  end
end
