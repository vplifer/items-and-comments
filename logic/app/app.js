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

    console.log(items.data.items)

    items.data.items.push({
      id: id,
      name: items.newItemText,
      comments: [{
        avatarColor: '#444',
        text: 'hello'
      }]
    })

    items.newItemText = ''

    cache()
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

  function cache() {
    cachedData = JSON.stringify(items.data)
    localStorage.setItem('cachedItemsData', cachedData)
  }
})

__hideLoader();