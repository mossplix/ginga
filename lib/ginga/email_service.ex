defmodule Ginga.EmailService do
	@moduledoc """
  Email sending service.
"""

  require Logger
  use Gingadb

  # Environment variable names
  @smtp_server "smtp.mandrillapp.com"
  @smtp_login "mugisha@sparkpl.ug"
  @smtp_password "BzMv0r0Q1O7JmC3LWnazUA"

	# API

	@spec email_api_key([user: %User{}, api_key: String.t]) :: :ok | {:error, :email_not_sent}
	@doc "Email a new api key to a user"
  def email_api_key([user: user, api_key: api_key]) do
        {:safe,[""|html]}=Phoenix.View.render(Ginga.EmailView, "alert.html", name: "John Doe")

		text = """
Hi #{user.name},

This is your api key: #{api_key}

Thanks,
Ginga Team
    """
		send! to: user.email, subject: "Your Ginga API key", body: text
  end

	@spec email_password([user: %User{}, password: String.t]) :: :ok | {:error, :email_not_sent}
	@doc "Email a new password to a user"
  def email_password([user: user, password: password]) do
		text = """
Hi #{user.name},

Your new password is: #{password}

Thanks,
Ginga
    """
		send! to: user.email, subject: "Your new Ginga password", body: text
  end

  @spec password_changed([user: %User{}]) :: :ok | {:error, :email_not_sent}
	@doc "Send email notice of password change."
  def password_changed([user: user]) do
		text = """
Hi #{user.name},

Your password was changed.

Thanks,
Ginga
    """
		send! to: user.email, subject: "Your Ginga password was changed", body: text
  end



	# PRIVATE

	@spec send!([to: String.t, subject: String.t, body: String.t]) :: :ok | {:error, :email_not_sent}
  defp send!([to: to, subject: subject, body: body]) do
		result = :gen_smtp_client.send({to, [smtp_login], "Subject: #{subject}\r\nFrom: #{smtp_login}\r\nTo: #{to}\r\n\r\n#{body}"}, [{:relay, smtp_server},{:port,587}, {:username, smtp_login}, {:password, smtp_password}])
		Logger.debug "Email sent to #{to}: #{inspect result}"
		case result do
			{:ok, _} -> :ok
			_ -> Logger.warn "Failed to email \"#{subject}\" to #{to}: #{inspect result}"
					 {:error, :email_not_sent}
    end
	end

	 def send_email([to: to, subject: subject, body: body]) do
	        #Ginga.EmailService.send_email([to: "mossplix@gmail.com", subject: "hii", body: "hiii"])
    		result = :gen_smtp_client.send({to, [@smtp_login], "Subject: #{subject}\r\nFrom: #{@smtp_login}\r\nTo: #{to}\r\n\r\n#{body}"}, [{:relay, @smtp_server},{:port,587}, {:username, @smtp_login}, {:password, @smtp_password}])
    		Logger.debug "Email sent to #{to}: #{inspect result}"
    		case result do
    			{:ok, _} -> :ok
    			_ -> Logger.warn "Failed to email \"#{subject}\" to #{to}: #{inspect result}"
    					 {:error, :email_not_sent}
        end
    	end

    	#:gen_smtp_client.send({"mugisha@sparkpl.ug", ["mossplix@gmail.com"], "Subject: #{subject}\r\nFrom: #{"mugisha@sparkpl.ug"}\r\nTo: #{"mugisha@sparkpl.ug"}\r\n\r\n#{html}"}, [{:relay, "smtp.mandrillapp.com"},{:port,587}, {:username, "mugisha@sparkpl.ug"}, {:password, "BzMv0r0Q1O7JmC3LWnazUA"}])


	def send_template_email([to: to,from: from, subject: subject,template: template,template_args: template_args]) do
        #Ginga.EmailService.send_template_email([to: ["mossplix@gmail.com"],from: "mugisha@sparkpl.ug", subject: "Hi Moses",template: "action.html",template_args: []])

	    {:safe,[""|html]}=Phoenix.View.render(Ginga.EmailView, template, template_args)

	    get_body=:Ginga_email_utils.email_body(html,subject,to,from,"text/html")
	     message_body={from, to, get_body}
	    result = :gen_smtp_client.send(message_body, [{:relay, @smtp_server}, {:username, @smtp_login}, {:password, @smtp_password}])

	    case result do
        			{:ok, _} -> :ok
        			_ -> Logger.warn "Failed to email \"#{subject}\" to #{to}: #{inspect result}"
        					 {:error, :email_not_sent}
            end



	end



  defp smtp_server do
		System.get_env @smtp_server
  end

  defp smtp_login do
		System.get_env @smtp_login
	end

  defp smtp_password do
    System.get_env @smtp_password
  end

end
