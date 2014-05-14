define(
  [
    "backbone",
    "models/chat_manager",
    "views/auth",
    "views/chat",
    "views/contact_list"
  ],

  function(Backbone, ChatManager, AuthView, ChatView, ContactListView) {
    var RSJSWebChat = Backbone.View.extend({

      initialize: function() {
        this.chatManager = new ChatManager();

        this.authView = new AuthView({ model: this.chatManager });
        this.chatView = new ChatView({ el: "#chat", model: this.chatManager });
        this.contactList = new ContactListView({ el: "#buddies", model: this.chatManager });

        this.listenTo(this.chatManager, "change:connected", this.onConnected);
        this.listenTo(this.chatManager, "change:connectionStatus", this.onUpdateConnectionStatus);
      },

      init: function() {
        this.render();
      },

      onConnected: function () {
        this.authView.destroy();
      },

      onUpdateConnectionStatus: function() {
        $(".lead").html(this.chatManager.get("connectionStatus"));
      },

      render: function() {
        this.$el.append(this.authView.render().el);
        return this;
      }
    });

    return RSJSWebChat;
  }
);
