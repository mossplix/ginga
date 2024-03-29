defmodule Ginga.ContactControllerTest do
  use Ginga.ConnCase

  alias Ginga.Contact
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, contact_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    contact = Repo.insert! %Contact{}
    conn = get conn, contact_path(conn, :show, contact)
    assert json_response(conn, 200)["data"] == %{"id" => contact.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, contact_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, contact_path(conn, :create), contact: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Contact, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, contact_path(conn, :create), contact: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    contact = Repo.insert! %Contact{}
    conn = put conn, contact_path(conn, :update, contact), contact: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Contact, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    contact = Repo.insert! %Contact{}
    conn = put conn, contact_path(conn, :update, contact), contact: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    contact = Repo.insert! %Contact{}
    conn = delete conn, contact_path(conn, :delete, contact)
    assert response(conn, 204)
    refute Repo.get(Contact, contact.id)
  end
end
