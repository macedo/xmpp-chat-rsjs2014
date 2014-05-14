define(
  [
    "backbone",
    "underscore"
  ],

  function(Backbone, _) {
    var ContactList = Backbone.View.extend({
      template: _.template($("#buddies-tpl").html()),

      initialize: function() {
        this.listenTo(this.model, "change:connected", this.render);
      },

      render: function() {
        this.$el.html(this.template());
        return this;
      }
    });

    return ContactList;
  }
);
