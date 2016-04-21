defmodule Ginga.CampaignControllerTest do
  use Ginga.ConnCase

  alias Ginga.Campaign
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, campaign_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    campaign = Repo.insert! %Campaign{}
    conn = get conn, campaign_path(conn, :show, campaign)
    assert json_response(conn, 200)["data"] == %{"id" => campaign.id}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, campaign_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, campaign_path(conn, :create), campaign: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Campaign, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, campaign_path(conn, :create), campaign: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    campaign = Repo.insert! %Campaign{}
    conn = put conn, campaign_path(conn, :update, campaign), campaign: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Campaign, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    campaign = Repo.insert! %Campaign{}
    conn = put conn, campaign_path(conn, :update, campaign), campaign: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    campaign = Repo.insert! %Campaign{}
    conn = delete conn, campaign_path(conn, :delete, campaign)
    assert response(conn, 204)
    refute Repo.get(Campaign, campaign.id)
  end
end
