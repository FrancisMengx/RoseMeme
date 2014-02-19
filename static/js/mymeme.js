
var rh = rh || {};
rh.rosememe = rh.rosememe || {};
rh.rosememe.endpoints = rh.rosememe.endpoints || {};
rh.rosememe.selectedId = -1;

// ----------------------- Endpoints methods -----------------------

rh.rosememe.endpoints.insertRoseMeme = function(caption, url){
	var postJson = {
		'caption': caption,
		'image_url': url
	};
	console.log(postJson);
	gapi.client.rosememe.meme.insert(postJson).execute(function (resp) {
		console.log(resp);
		if (!resp.code) {
			rh.rosememe.print(resp);
		}
	});
};

rh.rosememe.endpoints.listRoseMeme = function(){
	gapi.client.rosememe.meme.list({'order': '-last_touch_date_time'}).execute(
		function (resp) {
			if (!resp.code) {
				$('#outputLog').html('');
				resp.items = resp.items || [];
				// Loop through in reverse order since the newest goes on top.
				for (var i = resp.items.length - 1; i >= 0; i--) {
					rh.rosememe.print(resp.items[i]);
				}
				rh.rosememe.enableEditButton();
			}
		});
};

rh.rosememe.endpoints.deleteRoseMeme = function(memeId){
	gapi.client.rosememe.meme.delete({'id': memeId}).execute(
	function(resp){
		if(!resp.code){
			$('#' + memeId).slideUp();
		}
	});
};

// ----------------------- Enable methods -----------------------
rh.rosememe.enableButtons = function(){
	$('#display-add-meme-modal').click(function () {
		$('#myModalLabel').html('Add a meme');
		$('#add-meme-button').html("Add Meme");
		$('#caption').val('');
		$('#imgUrl').val('');
		$('#add-meme-modal').modal('show');
	});

	$('#add-meme-button').click(function(){
		var url = $('#imgUrl').val();
		var caption = $('#caption').val();
		rh.rosememe.endpoints.insertRoseMeme(caption,url);
		$('#add-meme-modal').modal('hide');
	});

	$('.pin').click(function(){

	});
};

rh.rosememe.enableEditButton = function(){
	$('.edit-meme').click(function(){
		$('#myModalLabel').html('Edit a meme');
		$('#add-meme-button').html("Edit Meme");
		$('#caption').val('');
		$('#imgUrl').val('');
		$('#add-meme-modal').modal('show');
	});

	$('.delete-meme').click( function(){
		var id = rh.rosememe.getMemeId($(this));
		rh.rosememe.endpoints.deleteRoseMeme(id);
	});
};


// ----------------------- Other methods -----------------------
rh.rosememe.getMemeId = function($rowButton){
	var memeId = 0;
	var $parent = null;
	var parentEls = $rowButton.parents();
	for (var i = 0; i < parentEls.length; i++) {
		$parent = $(parentEls[i]);
		if ($parent.hasClass('pin')) {
			memeId = $parent.attr('id');
			break;
		}
	}
	return memeId;
};

rh.rosememe.init = function(apiRoot){
	var apisToLoad;
	var callback = function() {
		console.log("Loaded an api");
		if (--apisToLoad == 0) {
			rh.rosememe.enableButtons();
			rh.rosememe.endpoints.listRoseMeme();

		}
	};
	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('rosememe', 'v1', callback, apiRoot);
};

rh.rosememe.print = function(meme){
	$('#columns').append('<div class = "pin" id = "'+meme.id+'">' +
		'<div class = "pin-icon"><i class="fa fa-pencil-square-o edit-meme"></i>' +
		'<span class = "delete-meme">X</span></div>' +
		'<img src = "'+meme.image_url+'"/>' +
		'<p>'+meme.caption+'</p></div>');
};
