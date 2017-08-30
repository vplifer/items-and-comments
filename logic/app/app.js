var app = angular.module('app', []);

var appItemsController = app.controller('Items', function ($scope) {
  var items = this;

  var cachedData = localStorage.getItem('cachedItemsData')
  if (!cachedData) cachedData = {}
  else cachedData = JSON.parse(cachedData)

  if (!items.data) items.data = {}
  items.data.items = cachedData.items
  items.data.selected = cachedData.selected

  // Ensure structure of data
  if (!Array.isArray(items.data.items)) items.data.items = []
  if (items.data.selected === undefined) items.data.selected = 0

  items.addItem = function () {
    if (!items.newItemText) return

    var id = Date.now()

    items.data.items.push({
      id: id,
      name: items.newItemText,
      comments: []
    })

    items.newItemText = ''

    cache()
  }

  items.addComment = function () {
    if (!items.newCommentText) return

    var id = Date.now()

    var selectedItem = items.getSelectedItem()
    selectedItem.comments.push({
      id: id,
      avatarColor: getRandomColor(),
      text: items.newCommentText
    })

    items.newCommentText = ''

    cache()
  }

  items.trySubmitComment = function (event) {
    if (event.code == 'Enter' && !event.shiftKey) {
      items.addComment()
      event.stopPropagation()
      event.preventDefault()
    }
  }

  items.select = function (id) {
    items.data.selected = id

    cache()
  }

  items.delete = function (id) {
    var itemIndex
    for (var i = 0; i < items.data.items.length; i++) {
      if (items.data.items[i].id == id) {
        itemIndex = i
        break
      }
    }

    if (id == items.data.selected) items.data.selected = ''
    items.data.items.splice(i, 1)

    cache()
  }

  items.getSelectedItem = function () {
    var selectedItem = items.data.items.find(function (item) {
      return item.id == items.data.selected
    })

    return selectedItem
  }

  items.getSelectedItemName = function () {
    var selectedItem = items.getSelectedItem()
    if (selectedItem) return selectedItem.name
    return ''
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function cache() {
    cachedData = JSON.stringify(items.data)
    localStorage.setItem('cachedItemsData', cachedData)
  }
})

__hideLoader();