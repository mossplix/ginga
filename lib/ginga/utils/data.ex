defmodule Ginga.Utils do
  require Logger
   require Amnesia
  alias RethinkDB.Query, as: Q


    def hash_password(password) do

        :bcrypt.hashpw(password, Ginga.Endpoint.config(:salt))|> elem(1)
    end

    def add_field(table,field) do
        key_map=table.attributes|>Enum.into Map.new
        keys=key_map|> Map.keys
        Amnesia.Table.transform(table,:ignore,keys++[field])
    end




    def get_roster(username,host) do
       :mod_roster.get_roster(username,host)

    end

    def create_group(host,name) do
      :mod_shared_roster.create_group(host,name)
    end

    def delete_group(host,name) do
       :mod_shared_roster.delete_group(host,name)
    end
    def add_to_group(host,group,user) do
      :mod_shared_roster.add_user_to_group(host,{user.username,host},group)
    end
    def remove_from_group(host,group,user) do
      :mod_shared_roster.remove_user_to_group(host,{user.username,host},group)
    end

    def get_hosts() do
      :ejabberd_admin.registered_vhosts
    end

    def add_default_opts(host,jid) do

      create_room("general","All Company Users",host,jid)
      add_to_channel("general",host,jid,"owner")
      create_group(host,"all_company")
      add_group_to_channel("all_company",host,"general")

    end



    def add_host(host) do
        {:atomic,[{_,_,modules}]}=:mnesia.transaction(fn()->:mnesia.read(:local_config, {:modules,:global}) end)
         modules|>Enum.map fn({module,args}) ->
          Logger.info(inspect args)
           Logger.debug(inspect module)
           try do
              :gen_mod.start_module(host, module, args)
           catch
              kind, reason -> Logger.info(inspect reason)


              end

          end
    end




    def create_room(name,description,host,creator) do
      connection=RethinkDB.connect
      [_,database]=String.split(creator,"@")
      :mod_muc_admin.create_room(name,"channels."<>host,host)
      %Gingadb.UserRoom{room_id:  [name, "channels."<>host],jid: creator}|> UserRoom.write!
      room=name<>"@channels."<>host
      Q.Selection.db(database)|>Q.Selection.table("channels")|>Q.WritingData.insert(%{admin: creator,name: name,description: description,jid: room})|>RethinkDB.run connection
      add_to_channel(name,host,creator,"owner")
    end

    def add_to_channel(channel,host,jid,role) do
       #roles are  "outcast" | "none" | "member" | "admin" | "owner"
       #none removes user
      :mod_muc_admin.set_room_affiliation(channel,"channels."<>host,jid,role)
    end



      def add_group_to_channel(group,host,channel) do
           users=:mod_shared_roster.get_group_users(host,group)
           users|>Enum.map fn({username,host}) -> add_to_channel(channel,host,username<>"@"<>host,:member) end
      end

      def get_online_user_rooms(host,jid) do
        :mod_muc_admin.get_user_rooms(host,jid)
      end

      def get_user_rooms(jid) do



      end




end
