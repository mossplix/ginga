defmodule Ginga.Couch do




def start() do

 url="http://localhost:5984"
  #:couchbeam.start()
 s = :couchbeam.server_connection(url, [basic_auth: {"mossplix","mosespass"}])

end


def create_company_db(s,company) do

 d=:couchbeam.open_or_create_db(s,company.couch_database,[])


  x=%{"name" => "Mark", "password" => "mosespass", "roles" => [], "type" => "user","id" => "org.couchdb.user:mark"} |> Poison.encode!


 HTTPotion.post "http://mossplixx:mosespass@127.0.0.1:5984/_users", [body: x, headers: ["Content-Type": "application/json"]]






end






end
