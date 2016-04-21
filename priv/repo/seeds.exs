[
  %{
    name: "Basic",
    cost: "20",
  },
  %{
    name: "Plus",
    cost: "20",
  },
  %{
    name: "Premium",
    cost: "20",
  },
  %{
    name: "Free",
    cost: "20",
  },
   %{
    name: "Custom",
    cost: "20",
  },
   %{
    name: "Enterprise",
    cost: "20",
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))