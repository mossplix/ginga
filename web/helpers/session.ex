defmodule Ginga.Session do
  alias Ginga.{Repo, User,Authorization}

  def authenticate(%{"email" => email, "password" => password}) do
    authorization = Repo.get_by(Authorization, uid: String.downcase(email),provider: "identity")

    case authorization  do

        nil -> :error
        authorization -> if Comeonin.Bcrypt.checkpw(password, authorization.token) do
                                case Repo.one(Ecto.Model.assoc(authorization, :user)) do
                                     nil -> :error
                                    user ->{:ok,user}
                                end

                        else
                          :error
                        end



    end


  end


end

