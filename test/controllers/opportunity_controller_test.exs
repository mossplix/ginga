defmodule Ginga.OpportunityControllerTest do
  use Ginga.ConnCase

  alias Ginga.Opportunity
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, opportunity_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    opportunity = Repo.insert! %Opportunity{}
    conn = get conn, opportunity_path(conn, :show, opportunity)
    assert json_response(conn, 200)["data"] == %{"id" => opportunity.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, opportunity_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, opportunity_path(conn, :create), opportunity: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Opportunity, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, opportunity_path(conn, :create), opportunity: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    opportunity = Repo.insert! %Opportunity{}
    conn = put conn, opportunity_path(conn, :update, opportunity), opportunity: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Opportunity, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    opportunity = Repo.insert! %Opportunity{}
    conn = put conn, opportunity_path(conn, :update, opportunity), opportunity: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    opportunity = Repo.insert! %Opportunity{}
    conn = delete conn, opportunity_path(conn, :delete, opportunity)
    assert response(conn, 204)
    refute Repo.get(Opportunity, opportunity.id)
  end
end
