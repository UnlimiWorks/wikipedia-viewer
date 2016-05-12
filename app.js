$('#search').keypress(function (event) {
  if (event.which === 13) {
    var searchSection = $('#results')
    $('.result').remove()
    $.getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + event.currentTarget.value + '&srlimit=20&format=json&formatversion=2&callback=?')
    .then(function (data) {
      data.query.search.forEach(function (element) {
        searchSection.append(generateSearchView(element.title, element.snippet, element.title.replace(/ /g, '_')))
      })
    })
  }
})

function generateSearchView (title, description, link) {
  return '<a target="_blank" href="https://en.wikipedia.org/wiki/' + link + '"><article class="result animated fadeIn"><h4>' + title + '</h4><p>' + description + '</p></article></a>'
}
