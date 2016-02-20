var localStorage = require('localStorage');
var ResourceSchema = require("../stores/schema/resource");

var XmppUtils={

    statusChange: function (text) {
        me.status = text;
        client.sendPresence({
            status: text,
            caps: client.disco.caps
        });
    },
    createResource(pres,contact_id){
        contact=_contacts[contact_id];
        rs={id:pres.from.full

           };
        resource=_.assign(new ResourceSchema(),rs);




        if (!pres.caps) {
            resource.fetchDisco();
        }
        resource.fetchTimezone();

        _.add(contact.resources,resource);
        _contacts[contact_id]=contact;


    },
    addContact: function (contact) {


        app.api.sendPresence({to: contact, type: 'subscribe'});

    },
    joinMUC: function (muc) {

        client.joinRoom(muc.jid, app.config.nickname, {
            history: {
                maxstanzas: 50
                //since: this.lastInteraction
            }
        });


    },
    showChat: function (mucjid) {

        client.sendMessage({
            type: 'groupchat',
            to: mucjid,
            chatState: 'active'
        });
    },
    isMuc: function(jid){
        return /@conf/.test(jid)
    },
    getDefaults:
        function() {
            return {
                active_chat: "",
                current_user: {},
                activeRooms: {},
                allRooms: {},
                messageHistory: {},
                newMessages: {},
                roster: {},
                profiles: {},
                smileys: {},
                emoticons: {
                    path_prefix: "",
                    icons: {}
                },
                connection: {
                    connected: !0,
                    reconnecting: !1,
                    disconnecting: !1,
                    reconnectingIn: 0
                },
                mentionRegexUser: null,
                mentionRegexMe: null,
                group_name: "",
                group_id: null,
                conference_server: null,
                features: {},
                permissions: {}
            }
        },

    get_user_status: function(st) {
        var t;
        switch (st) {
            case "chat":
                t = "Available";
                break;
            case "away":
                t = "Idle";
                break;
            case "dnd":
                t = "Do not disturb";
                break;
            case "mobile":
                t = "Mobile";
                break;
            case "unknown":
                t = "Unavailable"
        }
        return t
    },
    chat_header_status: function(st) {
        var t;
        switch (st) {
            case "chat":
                t = "Available";
                break;
            case "away":
                t = "Away";
                break;
            case "dnd":
                t = "Do Not Disturb";
                break;
            case "mobile":
                t = "Mobile";
                break;
            case "unknown":
                t = "Unavailable";
                break;
            default:
                t = "Unknown"
        }
        return t
    },



    filetypes: function() {
        return {
            audio: ["aif", "aiff", "mp3", "wav", "wma"],
            code: ["asp", "coffee", "css", "html", "htm", "java", "js", "json", "jsp", "less", "lib", "php", "prl", "py", "sass", "sh", "xml"],
            doc: ["doc", "docm", "docx", "dotm", "dotx", "gdoc", "pages"],
            ai: ["ai"],
            psd: ["psd"],
            img: ["bmp", "gif", "jpg", "jpeg", "png", "tif", "tiff"],
            pdf: ["pdf"],
            presentation: ["keynote", "ppam", "ppsm", "ppsx", "ppt", "pptm", "pptx"],
            spreadsheet: ["numbers", "ods", "xlam", "xls", "xlsb", "xlsm", "xlsx", "xltm", "xltx"],
            vector: ["dxf", "eps", "svg"],
            video: ["flv", "m4v", "mov", "mp4", "wmv", "webm", "ogv"],
            zip: ["apk", "gz", "rar", "tar", "zip", "zipx"]
        }
    },

mimes: function() {
            return {
                "image/jpg": "jpg",
                "image/png": "png",
                "image/gif": "gif",
                "image/svg+xml": "svg",
                "audio/mpeg3": "mpg3",
                "audio/wav": "wav",
                "application/pdf": "pdf",
                "application/text": "txt",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
                "video/mp4": "mp4",
                "video/quicktime": "mov"
            }
        }




}

module.exports = XmppUtils;