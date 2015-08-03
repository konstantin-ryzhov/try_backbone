var Post = Backbone.Model.extend({
    defaults: {
        title: '',
        status: 0
    },

    validate: function( attributes ){
      var errors = null;
      var add_error = function(field_name, error) {
        errors = errors || {};
        errors[field_name] = errors[field_name] || [];
        errors[field_name].push(error);
      }

      if( attributes.title == "")
        add_error("title", "Пустой заголовок");

      if( attributes.title.length > 5 )
        add_error("title", "Длинный заголовок > 5");

      if( attributes.title.length < 3 )
        add_error("title", "Короткий заголовок < 3");

      if( attributes.status > 4 || attributes.status < 0)
        add_error("status", "Статус может быть от 0 до 4");

      return errors;
    },

    localStorage: new Store("posts")
});