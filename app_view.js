var AppView = Backbone.View.extend({    
    el: $("#app"),

    events: {
      "click .add_button": "add_new",
      "click .save_button": "save_new",
      "click .cancel_button": "cancel_new",
    },

    initialize: function() {
        this.listenTo(posts, 'add', this.addOne);

        var tmp = _.template($("#add_template").html());
        this.$(".new").html(tmp());

        posts.fetch();
    },

    addOne: function(post) {
      var post_view = new PostView({model: post});
      this.$(".list").append(post_view.render().el);
    },

    render: function(){

    },

    //обработка кнопок

    add_new: function() {
      var tmp = _.template($("#edit_template").html());
      this.$(".new").html(tmp({
        error: "",
        title: "",
        status: ""
      }));
    },

    save_new: function(){
      posts.create({
        title: this.$(".title").val(),
        status: this.$(".status").val()
      });
      this.cancel_new();
    },

    cancel_new: function() {
      var tmp = _.template($("#add_template").html());
      this.$(".new").html(tmp());
    }
});
