defmodule Ginga.AnalyticControllerTest do
  use Ginga.ConnCase

  alias Ginga.Analytic
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, analytic_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    analytic = Repo.insert! %Analytic{}
    conn = get conn, analytic_path(conn, :show, analytic)
    assert json_response(conn, 200)["data"] == %{"id" => analytic.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, analytic_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, analytic_path(conn, :create), analytic: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Analytic, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, analytic_path(conn, :create), analytic: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    analytic = Repo.insert! %Analytic{}
    conn = put conn, analytic_path(conn, :update, analytic), analytic: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Analytic, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    analytic = Repo.insert! %Analytic{}
    conn = put conn, analytic_path(conn, :update, analytic), analytic: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    analytic = Repo.insert! %Analytic{}
    conn = delete conn, analytic_path(conn, :delete, analytic)
    assert response(conn, 204)
    refute Repo.get(Analytic, analytic.id)
  end
end
