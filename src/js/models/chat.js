define(
  [
    "backbone",
    "underscore",
    "strophejs"
  ],

  function(Backbone, _, Strophe) {
    var Chat = Backbone.Model.extend({
      defaults: {
        body: null,
        connection: null,
        connectionStatus: null,
        connected: false,
        extensions: {
          NS_MUC: "http://jabber.org/protocol/muc"
        },
        joined: null,
        participants: [],
        nickname: null,
        rooms: [],
        room: null
      },

      initialize: function() {
        this.on("change:connected", this.getRooms, this);
      },

      getRooms: function() {
        var iq = new Strophe.Builder("iq", { to: "conference.taskie.org", type: "get", id: "rooms-info" });
        iq.c("query", { xmlns: "http://jabber.org/protocol/disco#items" });

        console.log("[iq] get rooms", iq.tree());

        this.connection.send(iq);
      },

      joinChat: function(room, nickname) {
        this.set({
          room: room, nickname: nickname });

        this.joined = false;

        var presence = new Strophe.Builder("presence",
          { to: this.get("room") + "/" + this.get("nickname") });

        presence.c("x", { xmlns: this.get("extensions").NS_MUC });

        console.log("[presence] join chat", presence.tree());

        this.connection.send(presence);
      },

      connect: function(jid, passwd) {
        var _this = this;

        this.connection = new Strophe.Connection("http://taskie.org:5280/http-bind");
        this.connection.addHandler(_.bind(this.onPresence, this), null, "presence");
        this.connection.addHandler(_.bind(this.onRoomsInfo, this), null, "iq", "result", "rooms-info");
        this.connection.addHandler(_.bind(this.onPublicMessage, this), null, "message", "groupchat");
        this.connection.connect(jid, passwd, function(status) {
          switch(status) {
            case Strophe.Status.CONNECTED:
              _this.set({
                "connected": true,
                "connectionStatus": "Connected"});
              break;
            case Strophe.Status.CONNECTING:
              _this.set({"connectionStatus": "Connecting"});
              break;
            case Strophe.Status.AUTHENTICATING:
              _this.set({"connectionStatus": "Authenticating"});
              break;
            case Strophe.Status.DISCONNECTING:
              _this.set({"connectionStatus": "Disconnecting"});
              break;
            case Strophe.Status.DISCONNECTED:
              _this.set({"connectionStatus": "Disconnected"});
              break;
            case Strophe.Status.CONNFAIL:
              _this.set({"connectionStatus": "Conn Fail"});
              break;
            case Strophe.Status.AUTHFAIL:
              _this.set({"connectionStatus": "Auth Fail"});
              break;
            default:
              _this.set({"connectionStatus": "Erro"});
              break;
          }
        });
      },

      onPresence: function(presence) {

        console.log("[presence] onPresence", presence);

        var $presence = $(presence)
          , presenceType = $presence.attr("type");

        var from = $presence.attr("from")
          , room = Strophe.getBareJidFromJid(from);

        if (room === this.get("room")) {
          var nick = Strophe.getResourceFromJid(from);

          if (presenceType === "error" && !this.get("joined")) {
            this.connection.disconnect();
          } else if (presenceType !== "unavailable") {
            this.set({
              "participants": this.get("participants").concat({ nickname: nick }) });
          }
        }

        if (presenceType !== "error" && !this.get("joined")) {
          if ($presence.find("status[code='110']").length > 0) {
            if ($presence.find("status[code='210']").length > 0) {
              this.set("nickname", Strophe.getResourceFromJid(from));
            }

            this.set("joined", true);
          }
        }

        return true;
      },

      onPublicMessage: function(message) {

        console.log("[message] onPublicMessage", message);

        var $message = $(message);

        var from = $message.attr("from")
          , room = Strophe.getBareJidFromJid(from)
          , nick = Strophe.getResourceFromJid(from);

        if (room === this.get("room")) {
          var notice = !nick;

          var nick_class = "nick";
          if (nick === this.get("nickname")) {
            nick_class += "-self";
          }

          var body = $message.children("body").text();

          if (!notice) {
            this.set("body", "<div class=\"message\">" + "<span class=\"" + nick_class + "\">" + nick + ": </span><span class=\"body\">" + body + "</span></div>");
          } else {
            this.set("body", "<div class=\"notice\">*** " + body + "</div>");
          }
        }

        return true;
      },

      onRoomsInfo: function(iq) {
        console.log("[iq] onRoomsInfo", onRoomsInfo);
        var $IQ = $(iq);

        var items = $IQ.find("item")
          , rooms;

        rooms = _.map(items, function(item) {
          var $item = $(item);

          return { jid: $item.attr("jid"), name: $item.attr("name") };
        });

        this.set("rooms", rooms);
        return true;
      },

      sendMessage: function(msg) {
        var message = new Strophe.Builder("message",
            { to: this.get("room"), type: "groupchat"});

        message.c("body").t(msg);
        this.connection.send(message);
      }
    });

    return Chat;
  }
);
