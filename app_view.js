var AppView = Backbone.View.extend({    
    el: $("#app"),

    events: {
      "click .add_button": "edit_new"
    },

    initialize: function() {
        this.listenTo(posts, 'add', this.add_one);

        this.show_add_button();

        posts.fetch();
    },

    add_one: function(post) {
      var post_view = new PostView({model: post});
      this.$(".list").append(post_view.render().el);
    },

    render: function(){

    },

    edit_new: function() {
      var post = new Post();
      var post_view = new PostView({model: post});
      this.$(".new").html(post_view.edit().el);

      this.listenToOnce(post, 'sync destroy', function(){
        this.show_add_button();
        if(!post.isNew())
          posts.push(post);
      });
    },

    show_add_button: function() {
      var tmp = _.template($("#add_template").html());
      this.$(".new").html(tmp());
    }
});
