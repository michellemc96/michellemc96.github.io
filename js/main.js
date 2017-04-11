$(document).ready(function(){
	$.ajax({
    url: 'https://www.codeschool.com/users/3577190.json',
    dataType: 'jsonp',
    success: function(response) {
		var completedCourses = response.courses.completed;
     for(var i = 0; i < completedCourses.length; i ++) {
		 var title = $('<h3></h3>').text(completedCourses[i].title);
		 var img = $('<img/>').attr( 'src', completedCourses[i].badge);
		 var a = $('<a></a>').attr('href', completedCourses[i].url ).attr('target', '_blank').addClass('btn').addClass('btn-primary').text('See Course');
		 var div = $('<div></div>').append(title, img, a).addClass('course');
		 $('div#badges').append(div);
	 }
    }
  });
}); 
