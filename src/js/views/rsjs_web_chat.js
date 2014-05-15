define(
  [
    "backbone",
    "models/chat",
    "views/auth",
    "views/chat",
    "views/contact_list"
  ],

  function(Backbone, Chat, AuthView, ChatView, ContactListView) {
    var RSJSWebChat = Backbone.View.extend({

      initialize: function() {
        this.chat = new Chat();

        this.authView = new AuthView({ model: this.chat });
        this.chatView = new ChatView({ el: "#chat", model: this.chat });
        this.contactList = new ContactListView({ el: "#buddies", model: this.chat });

        this.listenTo(this.chat, "change:joined", this.onJoined);
        this.listenTo(this.chat, "change:connectionStatus", this.onUpdateConnectionStatus);
      },

      init: function() {
        this.render();
      },

      onJoined: function () {
        this.authView.destroy();
      },

      onUpdateConnectionStatus: function() {
        $(".lead").html(this.chat.get("connectionStatus"));
      },

      render: function() {
        this.$el.append(this.authView.render().el);
        return this;
      }
    });

    return RSJSWebChat;
  }
);
