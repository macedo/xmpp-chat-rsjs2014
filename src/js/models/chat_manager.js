define(
  [
    "backbone",
    "strophejs"
  ],

  function(Backbone, Strophe) {
    var ChatManager = Backbone.Model.extend({
      defaults: {
        connection: null,
        connectionStatus: null,
        connected: false,
        extensions: {
          NS_MUC: "http://jabber.org/protocol/muc"
        },
        joined: null,
        participants: null,
        nickname: null,
        room: null
      },

      connect: function(jid, passwd) {
        var _this = this;

        this.connection = new Strophe.Connection("http://bosh.metajack.im:5280/xmpp-httpbind");
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
      }
    });
    return ChatManager;
  }
);
