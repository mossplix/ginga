%%%-------------------------------------------------------------------
%%% @author mossplix
%%% @copyright (C) 2015, Sparkpl.ug
%%% @doc
%%%
%%% @end
%%% Created : 26. May 2015 11:32 PM
%%%-------------------------------------------------------------------
-module(ginga_email_utils).
-compile([export_all]).
-author("mossplix").


convert_unix_newlines_to_dos(Body) when is_binary(Body) ->
  convert_unix_newlines_to_dos(binary_to_list(Body));
convert_unix_newlines_to_dos(Body) when is_list(Body) ->
  convert_unix_newlines_to_dos(Body, []).

convert_unix_newlines_to_dos([], Acc) ->
  lists:reverse(Acc);
convert_unix_newlines_to_dos([$\r, $\n|Rest], Acc) ->
  convert_unix_newlines_to_dos(Rest, [$\n, $\r|Acc]);
convert_unix_newlines_to_dos([$\n|Rest], Acc) ->
  convert_unix_newlines_to_dos(Rest, [$\n, $\r|Acc]);
convert_unix_newlines_to_dos([H|T], Acc) when is_binary(H); is_list(H) ->
  convert_unix_newlines_to_dos(T, [convert_unix_newlines_to_dos(H)|Acc]);
convert_unix_newlines_to_dos([H|T], Acc) ->
  convert_unix_newlines_to_dos(T, [H|Acc]).

build_content_type(ContentType, CharSet) ->
  case CharSet of
    undefined ->
      ContentType;
    _ ->
      io_lib:format("~s; charset=~s", [ContentType, CharSet])
  end.


add_fields([], _, Acc) ->
  lists:reverse(Acc);
add_fields([{Key, Value}|Rest], Seen, Acc) ->
  case proplists:get_value(Key, Seen) of
    undefined ->
      add_fields(Rest, [Key|Seen], [[Key, ": ", Value, "\r\n"] | Acc]);
    _ ->
      add_fields(Rest, Seen, Acc)
  end.


build_message_header(HeaderFields, DefaultMimeType, CharSet) ->
  MessageID = case proplists:get_value("Message-ID", HeaderFields) of
                undefined -> smtp_util:generate_message_id();
                Other -> Other
              end,
  ContentType = build_content_type(proplists:get_value("Content-Type", HeaderFields, DefaultMimeType), CharSet),
  Date = proplists:get_value("Date", HeaderFields, erlydtl_dateformat:format("r")),
  AllHeaders = [{"Date", Date}, {"Content-Type", ContentType},
    {"MIME-Version", "1.0"}, {"Message-ID", MessageID} | HeaderFields],
  add_fields(AllHeaders, [], []).

email_body(Body,Subject,ToAddress,FromAddress,ContentType) ->
  %%CleanBody = build_message_body("UTF-8",convert_unix_newlines_to_dos(Body)),
  MessageHeader = build_message_header([
    {"Subject", Subject},
    {"To", ToAddress},
    {"From", FromAddress}],
    ContentType,
    undefined),

  [MessageHeader, "\r\n", convert_unix_newlines_to_dos(Body)].



build_message_body_attachments( Attachments, CharSet,Body) ->
  Boundary = smtp_util:generate_message_boundary(),
  {MimeType, MessageBody} = build_message_body(CharSet,Body),
  {"multipart/mixed; boundary=\""++Boundary++"\"",
    render_multipart_view([{MimeType, MessageBody}|Attachments], Boundary, CharSet)}.

build_message_body(CharSet,Body) ->
          Boundary = smtp_util:generate_message_boundary(),
          {"multipart/alternative; boundary=\""++Boundary++"\"",
            render_multipart_view(
              [{"text/html",Body}], Boundary, CharSet)}.


render_multipart_view(Parts, Boundary, CharSet) ->
  ["This is a message with multiple parts in MIME format.\r\n",
    render_multipart_view1(Parts, Boundary, CharSet)].

render_multipart_view1([], Boundary, _) ->
  ["--", Boundary, "--"];
render_multipart_view1([{FileName, MimeType, Body}|Rest], Boundary, CharSet) ->
  ["--", Boundary,
    "\r\n", "Content-Type: ", build_content_type(MimeType, CharSet),
    "\r\n", "Content-Disposition: attachment; filename=", FileName,
    "\r\n", "Content-Transfer-Encoding: base64",
    "\r\n\r\n",
    wrap_to_76(base64:encode(erlang:iolist_to_binary(Body))), "\r\n", render_multipart_view1(Rest, Boundary, CharSet)];
render_multipart_view1([{MimeType, Body}|Rest], Boundary, CharSet) ->
  ["--", Boundary, "\r\n", "Content-Type: ", build_content_type(MimeType, CharSet), "\r\n\r\n",
    Body, "\r\n", render_multipart_view1(Rest, Boundary, CharSet)].


wrap_to_76(String) ->
  [wrap_to_76(String, [])].

wrap_to_76(<<>>, Acc) ->
  list_to_binary(lists:reverse(Acc));
wrap_to_76(<<Head:76/binary, Tail/binary>>, Acc) ->
  wrap_to_76(Tail, [<<"\r\n">>, Head | Acc]);
wrap_to_76(Head, Acc) ->
  list_to_binary(lists:reverse([<<"\r\n">>, Head | Acc])).


