var PostView = Backbone.View.extend({
    tagName:  "div",
    callback: null,
    events:{
      "click .delete_button": "delete",
      "click .edit_button": "edit",
      "click .save_button": "save",
      "click .cancel_button": "cancel"
    },

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'invalid', this.edit);
      this.listenTo(this.model, 'edit', this.edit);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){
      var tmp = _.template($("#show_template").html());
      var html = tmp({
        error: this.model.validationError,
        title: this.model.get('title'),
        status: this.model.get('status')
      });

      this.$el.html(html);

      return this;
    },

    //Обработка кнопок

    delete: function(){
      this.model.destroy();
      return this;
    },

    save: function(){
      this.model.save({
        title: this.$(".title").val(),
        status: this.$(".status").val(),
      });
      return this;
    },

    cancel: function(){
      is_new = this.model.isNew();

      if(is_new)
        this.model.destroy();

      this.render();
      return this;
    },

    edit: function(){
      var tmp = _.template($("#edit_template").html());
      var html = tmp({
        error: this.model.validationError,
        title: this.model.get('title'),
        status: this.model.get('status')
      });

      this.$el.html(html);

      return this;
    }
});
