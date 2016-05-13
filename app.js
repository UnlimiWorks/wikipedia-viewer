var wikiViewer = (function IIFE () {
  var searchQuery = {}
  var $variables = {}

  function getData () {
    return $.getJSON(searchQuery.url + searchQuery.query + searchQuery.argsString)
  }

  function generateOutput (data) {
    data.query.search.forEach(function (element) {
      $variables.output.append('<a target="_blank" href="https://en.wikipedia.org/wiki/' + element.title.replace(/ /g, '_') + '">' +
      '<article class="' + $variables.outputLinks.slice(1) + ' animated fadeIn">' +
      '<h4>' + element.title + '</h4>' +
      '<p>' + element.snippet + '</p></article></a>')
    })
  }

  function handleEnterKeypress (event) {
    if (event.which === 13) {
      searchQuery.query = event.currentTarget.value

      $($variables.outputLinks).remove()
      getData().then(generateOutput)
    }
  }

  function init (options) {
    $variables.input = $(options.input)
    $variables.output = $(options.output)
    $variables.outputLinks = options.outputLinksClass
    searchQuery = options.query

    $variables.input.bind('keypress', handleEnterKeypress)
  }

  return {
    init: init
  }
}())

$(document).ready(function () {
  wikiViewer.init({
    input: '#search',
    output: '#results',
    outputLinksClass: '.result',
    query: {
      url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=',
      argsString: '&srlimit=20&format=json&formatversion=2&callback=?'
    }
  })
})
