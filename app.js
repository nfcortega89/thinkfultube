$(function() {
    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm);
    });
    $('.next').on('click', function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm, $('.next').data('next'), undefined);
    })
    $('.prev').on('click', function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        getRequest(searchTerm, undefined, $('.prev').data('prev'));
    })
});


function getRequest(searchTerm, nextPageToken, prevPageToken) {
    /// a function on steroids?
    var params = {
        part: 'snippet',
        key: 'AIzaSyA0AkXc5LXvVAxPyBIOcLqpboV5JUW5ixA',
        q: searchTerm
    };
    if (nextPageToken !== undefined) {
        params.pageToken = nextPageToken;
    }
    if (prevPageToken !== undefined) {
        params.pageToken = prevPageToken;
    }
    url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
        // check to see if data has nextPageToken
        showResults(data.items);
        console.log(data);
        // show next or previous buttons
        if (data.nextPageToken) {
            $('.next').show();
            $('.next').data("next", data.nextPageToken);
        }
        if (data.prevPageToken) {
            $('.prev').show();
            $('.prev').data('prev', data.prevPageToken);
        }
    });
}

function showResults(results) {
    var html = "";
    $.each(results, function(index, value) {
        console.log(value);
        html += "<a href='#' data-featherlight='#" + value.id.videoId + "'><img border='0' src='" + value.snippet.thumbnails.high.url + "'></a>" +
            '<iframe width="640" height="360" id="' + value.id.videoId + '" class="lightbox" src="https://www.youtube.com/embed/' +
            value.id.videoId +
            '" style="border:none;" frameborder="0" allowfullscreen></iframe>'; 
            // + // "<a href='https://www.youtube.com/channel/" + value.snippet.channelId + "'>link</a>";

    });
    $('#search-results').html(html);
}
