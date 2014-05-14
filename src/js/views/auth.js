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
        "click #join": "onJoin"
      },

      onJoin: function() {
        this.model.set({
          room:     $("#room").val(),
          nickname: $("#nickname").val()
        });

        this.model.connect($("#jid").val(), $("#passwd").val());
      },

      render: function() {
        this.$el.html(this.template());
        return this;
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
