define(
  [
    "backbone",
    "underscore"
  ],

  function(Backbone, _) {
    var ContactList = Backbone.View.extend({
      template: _.template($("#buddies-tpl").html()),

      initialize: function() {
        this.listenTo(this.model, "change:joined", this.render);
        this.listenTo(this.model, "change:participants", this.render);
      },

      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
    });

    return ContactList;
  }
);
