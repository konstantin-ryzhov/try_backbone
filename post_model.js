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