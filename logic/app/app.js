var app = angular.module('app', []);

var appItemsController = app.controller('Items', function ($scope) {
  var self = this;

  // Restoring data from local storage
  var cachedData = localStorage.getItem('cachedItemsData')
  if (!cachedData) cachedData = {}
  else cachedData = JSON.parse(cachedData)

  if (!self.data) self.data = {}
  self.data.items = cachedData.items
  self.data.selected = cachedData.selected

  // Ensure structure of data
  if (!Array.isArray(self.data.items)) self.data.items = []
  if (self.data.selected === undefined) self.data.selected = 0

  // 
  // API
  // 
  self.addItem = function () {
    if (!self.newItemText) return

    var id = Date.now()

    self.data.items.push({
      id: id,
      name: self.newItemText,
      comments: []
    })

    self.newItemText = ''

    cache()
  }

  self.addComment = function () {
    if (!self.newCommentText) return

    var id = Date.now()

    var selectedItem = self.getSelectedItem()
    selectedItem.comments.push({
      id: id,
      avatarColor: getRandomColor(),
      text: self.newCommentText
    })

    self.newCommentText = ''

    cache()
  }

  self.trySubmitComment = function (event) {
    if (event.code == 'Enter' && !event.shiftKey) {
      self.addComment()
      event.stopPropagation()
      event.preventDefault()
    }
  }

  self.select = function (id) {
    self.data.selected = id

    cache()
  }

  self.delete = function (id) {
    var itemIndex
    for (var i = 0; i < self.data.items.length; i++) {
      if (self.data.items[i].id == id) {
        itemIndex = i
        break
      }
    }

    if (id == self.data.selected) self.data.selected = ''
    self.data.items.splice(i, 1)

    cache()
  }

  self.getSelectedItem = function () {
    var selectedItem = self.data.items.find(function (item) {
      return item.id == self.data.selected
    })

    return selectedItem
  }

  self.getSelectedItemName = function () {
    var selectedItem = self.getSelectedItem()
    if (selectedItem) return selectedItem.name
    return ''
  }

  // 
  // Utils 
  //
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function cache() {
    cachedData = JSON.stringify(self.data)
    localStorage.setItem('cachedItemsData', cachedData)
  }
})

__hideLoader();