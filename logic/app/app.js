angular.module('app', [])
  .controller('Items', function ($scope) {
    $scope.items = [
      {
        title: "some"
      }
    ]

    var items = this;

    items.items = [
      {
        title: "some",
        commentsCount: 10
      },
      {
        title: "some",
        commentsCount: 10
      }
      , {
        title: "some",
        commentsCount: 10
      }
    ]

    items.todos = [
      { text: 'learn AngularJS', done: true },
      { text: 'build an AngularJS app', done: false }];

    items.addTodo = function () {
      items.todos.push({ text: items.todoText, done: false });
      items.todoText = '';
    };

    items.remaining = function () {
      var count = 0;
      angular.forEach(items.todos, function (todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    items.archive = function () {
      var oldTodos = items.todos;
      items.todos = [];
      angular.forEach(oldTodos, function (todo) {
        if (!todo.done) items.todos.push(todo);
      });
    };
  })
  .controller('comments', function () {

  });

__hideLoader();