
-define(TOKEN_TYPE, <<"bearer">>).

-type context()  :: proplists:proplist().
-type auth()     :: #a{}.
-type user()     :: any().                      %% Opaque User Object
-type client()   :: any().                      %% Opaque Client Object
-type rediruri() :: any().                      %% Opaque Redirection URI
-type token()    :: binary().
%-type response() :: oauth2_response:response().
-type lifetime() :: non_neg_integer().
-type scope()    :: list(binary()) | binary().
-type appctx()   :: term().
-type error()    :: access_denied | invalid_client | invalid_grant |
invalid_request | invalid_authorization | invalid_scope |
unauthorized_client | unsupported_grant_type |
unsupported_response_type | server_error |
temporarily_unavailable.

-record(response, {
  access_token            :: token()
,access_code              :: token()
,expires_in               :: lifetime()
,resource_owner           :: term()
,scope                    :: scope()
,refresh_token            :: token()
,refresh_token_expires_in :: lifetime()
,token_type = ?TOKEN_TYPE :: binary()
}).