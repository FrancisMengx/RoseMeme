$(document).ready(function(){
	$('#display-add-meme-modal').click(function () {
		console.log('asdfasdf');
		$('#myModalLabel').html('Add a meme');
		$('#add-meme-button').html("Add Meme");
		$('#caption').val('');
		$('#imgUrl').val('');
		$('#add-meme-modal').modal('show');
	});

	$('#add-meme-button').click(function(){
		$('#columns').append('<div class = "pin"><img src = "'+$('#imgUrl').val()+'"/><p>'+$('#caption').val()+'</p></div>');
		$('#add-meme-modal').modal('hide');
	});

	$('.pin').click(function(){

	});
});

