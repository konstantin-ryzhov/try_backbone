var AppView = Backbone.View.extend({    
    el: $("#app"),

    events: {
      "click #add": "add",
    },

    initialize: function() {
        posts.bind('add',   this.addOne, this);
        posts.bind('reset', this.addAll, this);
        posts.bind('all',   this.render, this);
        
        posts.fetch();
    },

    addOne: function(post) {
      var post_view = new PostView({model: post});
      
      $("#posts").append(post_view.render().el);
    },

    addAll: function() {
      posts.each(this.addOne);
    },

    render: function(){

    },

    add: function(e) {
      var input_field = $("#title");
      var error_field = $("#error");
      var new_title = input_field.val();
      // if (!new_title) return;

      post = new Post({title: new_title, status: 666});

      if (!post.isValid()) {
        error_field.html(post.validationError);
        return;
      }

      post.save();
      var p = posts.push(post);
      input_field.val("");
      error_field.html("");
    }
});
