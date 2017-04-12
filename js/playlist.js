$(document).ready(function(){
	function search(query) {
		
		$.ajax({
			url: 'https://api.spotify.com/v1/search?q='+ query + '&type=artist,track',
			dataType: 'json',
			success: function(response) {
				$('div#search').empty();
				var tracks = response.tracks.items;
				for (var i = 0; i < tracks.length; i ++) {
					var thisTrack = tracks[i];
					var thisArtist = thisTrack.artists[0];
					var thisAlbumsImage = thisTrack.album.images[0];
					var title = $('<h3></h3>').text(thisTrack.name + ' by ' + thisArtist.name);
					var img = $('<img/>').attr( 'src', thisAlbumsImage.url);
					var a = $('<a></a>').attr('href', thisTrack.preview_url).attr('target', '_blank').addClass('btn').addClass('btn-primary').text('Play Preview');
					var div = $('<div></div>').append(title, img, a).addClass('course');
					 $('div#search').append(div);
				}
			}
		}); 
	}
	
  $('input[name="search"]').on('click', function(event){
	  search($('input[name="query"]').val());
	  event.preventDefault();
	  return false;
	  
  });
});
