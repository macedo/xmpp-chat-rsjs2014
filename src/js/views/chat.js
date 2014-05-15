define(
  [
    "backbone",
    "underscore"
  ],

  function(Backbone, _) {
    var Chat = Backbone.View.extend({
      template: _.template($("#chat-tpl").html()),

      events: {
        "keypress #chat-input": "sendMessage"
      },

      initialize: function() {
        this.listenTo(this.model, "change:joined", this.render);
        this.listenTo(this.model, "change:body", this.addMessage);
      },

      addMessage: function() {
        var chatArea = this.$el.find("#chat-area").get(0)
          , atBottom = chatArea.scrollTop >= chatArea.scrollHeight - chatArea.clientHeight;

        $(chatArea).append(this.model.get("body"));

        this.model.set("body", null);

        if (atBottom) {
          chatArea.scrollTop = chatArea.scrollHeight;
        }
      },

      notify: function() {
        var chatArea = this.$el.find("#chat-area");

        if (this.model.get("joined")) {
          chatArea.append("<div class=\"notice\">***Room Joined.</div>");
        }
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.notify();

        return this;
      },

      sendMessage: function(e) {
        if (e.which === 13) {
          e.preventDefault();
          this.model.sendMessage($(e.target).val());
        }
      }
    });

    return Chat;
  }
);
