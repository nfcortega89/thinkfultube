$(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
});

function getRequest(searchTerm){
  var params = {
    part: 'snippet',
    key: 'AIzaSyA0AkXc5LXvVAxPyBIOcLqpboV5JUW5ixA',
    q: searchTerm
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    showResults(data.items);
  });
}

function showResults(results){
  var html = "";
$.each(results, function(index, value) {
            console.log(value);
            html += "<a href='https://www.youtube.com/watch?v=" + value.id.videoId + "'><img border='0' src='" + value.snippet.thumbnails.high.url + "'>";
});
 $('#search-results').html(html);
}

