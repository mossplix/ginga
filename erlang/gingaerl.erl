-module(gingaerl).

-compile([export_all]).
-include_lib("stdlib/include/qlc.hrl").
-record('Elixir.Gingadb.User', {id=nil,email="", name="", jid="",location="", assignments=[], vouchers=[],active=true,roles=[],props=[],state=nil}).


%%%_* Macros ===========================================================
-define(TOKEN_LENGTH, 32).



-record(company, {id, name, plan, couch_database, category, employees, active, website,hbase}).
-record(old_company, {id, name, plan, couch_database, category, employees, active, website}).



transorm_users() ->
  Transformer = fun(X) -> #'Elixir.Gingadb.User'{id=X#'Elixir.Gingadb.User'.id,email=X#'Elixir.Gingadb.User'.email, name=X#'Elixir.Gingadb.User'.name, jid=X#'Elixir.Gingadb.User'.jid,location=X#'Elixir.Gingadb.User'.location, assignments=X#'Elixir.Gingadb.User'.assignments, vouchers=X#'Elixir.Gingadb.User'.vouchers,active=X#'Elixir.Gingadb.User'.active,roles=X#'Elixir.Gingadb.User'.roles} end,

  {atomic, ok} = mnesia:transform_table('Elixir.Gingadb.Company', Transformer,
    record_info(fields, 'Elixir.Gingadb.User'),
    'Elixir.Gingadb.User'),
  io:format("Before: ~p\n", [ets:tab2list('Elixir.Gingadb.User')]).


uuid_time() ->
  %% Transform unix epoch

  {MegaSeconds, Seconds, MicroSeconds} = now(),
  UnixEpoch =
    (MegaSeconds * 1000000000000 + Seconds * 1000000 + MicroSeconds)/1000.


%%%_* Code =============================================================


%%%_ * API -------------------------------------------------------------
%% @doc Generates a random OAuth2 token.
generate_token() -> generate_fragment(?TOKEN_LENGTH).

%%%_* Private functions ================================================
-spec generate_fragment(integer()) -> binary().
generate_fragment(0) -> <<>>;
generate_fragment(N) ->
  Rand = base64:encode(rand_bytes(N)),
  Frag = << <<C>> || <<C>> <= <<Rand:N/bytes>>, is_alphanum(C) >>,
  <<Frag/binary, (generate_fragment(N - byte_size(Frag)))/binary>>.

%% @doc Returns true for alphanumeric ASCII characters, false for all others.
-spec is_alphanum(char()) -> boolean().
is_alphanum(C) when C >= 16#30 andalso C =< 16#39 -> true;
is_alphanum(C) when C >= 16#41 andalso C =< 16#5A -> true;
is_alphanum(C) when C >= 16#61 andalso C =< 16#7A -> true;
is_alphanum(_)                                    -> false.

%% @doc Generate N random bytes, using the crypto:strong_rand_bytes
%%      function if sufficient entropy exists. If not, use crypto:rand_bytes
%%      as a fallback.
-spec rand_bytes(non_neg_integer()) -> binary().
rand_bytes(N) ->
  try
    %% NOTE: Apparently we can't meck away the crypto module,
    %% so we install this proxy to allow for testing the low_entropy
    %% situation.
    ?MODULE:strong_rand_bytes_proxy(N)
  catch
    throw:low_entropy ->
      crypto:rand_bytes(N)
  end.

%% @equiv crypto:strong_rand_bytes(N)
-spec strong_rand_bytes_proxy(non_neg_integer()) -> binary().
strong_rand_bytes_proxy(N) -> crypto:strong_rand_bytes(N).


%% @doc traverse table and print content
-spec traverse_table_and_show(Table_name::nonempty_string()) -> ok.
traverse_table_and_show(Table_name)->
  Iterator =  fun(Rec,_)->
    log:log(warn, "~p~n",[Rec]),
    []
  end,
  case mnesia:is_transaction() of
    true -> mnesia:foldl(Iterator,[],Table_name);
    false ->
      Exec = fun({Fun,Tab}) -> mnesia:foldl(Fun, [],Tab) end,
      mnesia:activity(transaction,Exec,[{Iterator,Table_name}],mnesia_frag)
  end.

get_all_rows(Table) ->
  mnesia:transaction(fun() -> qlc:eval(qlc:q([X || X <- mnesia:table(Table)])) end).
