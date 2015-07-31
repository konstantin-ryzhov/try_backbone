var PostList = Backbone.Collection.extend({
    model: Post,
    localStorage: new Store("posts")
});

var posts = new PostList;