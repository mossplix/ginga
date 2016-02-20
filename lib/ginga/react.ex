defmodule Ginga.React do
  use HTTPotion.Base


    def process_url(url) do


      "http://127.0.0.1:3000/qz" <> url
    end

    def process_request_headers(headers) do
      Dict.put headers, :"User-Agent", "react-potion"
    end

    def process_response_body(body) do
      body |> to_string
    end
end
