(function() {
  'use strict';
  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $title.tooltip({ delay: 50 }).text(movie.Title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  
  let apiUrl = 'http://www.omdbapi.com/?apikey=b224234e&s='
  function getAPI(search){
    fetch(apiUrl + search)
    .then((response) => response.json())
    .then(data => {
      for (let i = 0; i < data.Search.length; i++){

        movies.push(data.Search[i])
      }
      renderMovies()    
    })
  }
  let button = document.querySelector('button')
  button.addEventListener('click',function(e){
    e.preventDefault()
    if (movies.length !== 0){
      movies = []
    } else {
      let search = document.querySelector('#search')
      let searchValue = search.value
      getAPI(searchValue)  
    }
  })

  // ADD YOUR CODE HERE
})();
