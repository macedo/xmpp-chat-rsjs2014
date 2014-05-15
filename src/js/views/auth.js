define(
  [
    "backbone",
    "underscore"
  ],

  function(Backbone, _) {
    var Auth = Backbone.View.extend({
      template: _.template($("#auth-tpl").html()),

      className: "form-horizontal",

      events: {
        "click #login": "onLogin",
        "click #join": "onJoin"
      },

      initialize: function() {
        this.listenTo(this.model, "change:connected", this.onConnected);
        this.listenTo(this.model, "change:rooms", this.renderRooms);
      },

      onConnected: function() {
        this.$el.find(".auth").toggleClass("hidden");
      },

      onJoin: function() {
        var room;

        if ($("#new-chat-room").val() === "") {
          room = $("#chat-rooms option:selected").val();
        } else {
          room = $("#new-chat-room").val() + "@conference.taskie.org";
        }

        this.model.joinChat(room, $("#nickname").val());
      },

      onLogin: function() {
        this.model.connect($("#jid").val(), $("#passwd").val());
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      renderRooms: function() {
        _.each(this.model.get("rooms"), function(room) {
          $("#chat-rooms").append("<option value=\"" + room.jid + "\">" + room.name + "</option>");
        });
      },

      destroy: function() {
        this.remove();
        this.off();
        this.model.off(null, null, this);
      }
    });

    return Auth;
  }
);
