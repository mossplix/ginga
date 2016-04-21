defmodule Ginga.PageController do
  use Ginga.Web, :controller
    alias Ginga.Repo



  plug Guardian.Plug.EnsureAuthenticated, [handler: Ginga.TokenController] when action in [:app]

  def index(conn, _params, current_user, _claims) do
    render conn, "index.html", current_user: current_user
  end

  def pricing(conn, _params,current_user, _claims) do
    render conn, "pricing.html", current_user: current_user
  end

  def guide(conn, _params,current_user, _claims) do
    render conn, "guide.html", current_user: current_user
  end


  def app(conn,_params,current_user, _claims) do

    case current_user.state do
        "email_pending" -> conn=conn
                                |> put_flash(:error, "Please Verify Your Email Address first")
                                |> redirect(to: "/")



        _ ->  put_layout(conn, "react.html")
  	           |> render "app.html"


    end
  	put_layout(conn, "react.html")
  	    |> render "app.html"

	end

	def chat(conn,_params) do
      	put_layout(conn, "chat.html")
      	    |> render "chat.html"

    	end




    	def rethinkdb(conn,_params) do
    	        db="mossplix"
              	redirect conn, external: "http://127.0.0.1:28015/"<>db<>"/"
            	end

  def settings(conn,_params) do
        put_layout(conn, "chat.html")
            |> render "settings.html"
  end

  def messages(conn,_params) do
        put_layout(conn, "chat.html")
            |> render "messages.html"
  end


  @layout_b """

      <!DOCTYPE html>
      <html>
      <head>
          <title>Soko :: Spark Your Business</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="/styles/app.css">
             <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                <script src="/js/bundle.js"></script>
      </head>
      <body >
      <section id="container">
      <h1>Hello </h1>
         <%= render %>
          </section>



      </body>
      </html>


    """
    @startup_code """

       <script>require('react').render(require(
            <%= module %>)({'name':'moses'}),
            document.getElementById('<%= container %>'))
            </script>


    """


  def react_component(module,props) do


    json_props = JSON.encode! (props)
	js_md=URI.encode(module)
	params= js_md <> URI.encode(json_props)


    server_markup = Soko.React.get(url=params)


  end


  def react_test(conn,_params) do

    render=Soko.React.get(url="?module=js/app.js").body



    container_markup = "<div id='" <> "container"  <> "'>" <> render <> "</div>"

    props="{'name': 'moses'}"

    to_render = container_markup <> EEx.eval_string(@startup_code,module: "js/app.js",container: "container")





  send_resp(conn, 200,EEx.eval_string(@layout_b,render: to_render))


  end
end
