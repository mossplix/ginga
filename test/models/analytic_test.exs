defmodule Ginga.AnalyticTest do
  use Ginga.ModelCase

  alias Ginga.Analytic

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Analytic.changeset(%Analytic{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Analytic.changeset(%Analytic{}, @invalid_attrs)
    refute changeset.valid?
  end
end
