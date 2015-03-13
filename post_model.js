var Post = Backbone.Model.extend({
    defaults: {
        title: 'title',
        status: 0
    },

    validate: function( attributes ){
        if( attributes.title == "")
          return "Пустой заголовок";
        if( attributes.title.length > 5 )
          return "Длинный заголовок 5";
        if( attributes.title.length > 3 )
          return "Длинный заголовок 3";
    },
    localStorage: new Store("posts")
});

var PostList = Backbone.Collection.extend({
    model: Post,
    localStorage: new Store("posts")
});

var PostView = Backbone.View.extend({
    tagName:  "tr",
    events: {
      "click .remove_button": "delete",
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'invalid', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){

        // var tmp = _.template("<strong><%= a %></strong><p><%= b %></p>");
        var tmp = _.template($("#post_template").html());
        var html = tmp({
          error: this.model.validationError,
          title: this.model.get('title'),
          status: this.model.get('status')
        });


        this.$el.html(html);

        return this;
    },

    delete: function(){
      this.model.destroy();
    }
});

var posts = new PostList;