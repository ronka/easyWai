$(document).ready(function() {
	$('.more-info').on('click', function(e) {
		e.preventDefault();
		$(this).next().fadeToggle();
	})

	$('.close').on('click',function(e){
		console.log($(this).parent());
		$(this).parent().fadeToggle();
	})

	$('#jetform').jetform({
		token: 'tGeHniL3z8XJcr87rLaLGHhMNp30Zg5xS5lu0EGTxXm7Xcs7eQ7RGSfMuhJIJwP8KpfFALuHtQEKyoDhmyTK8Q==',
		errorAtBottom: '#jf_err',
		onSuccess:function(args){
			console.log(args);
			$.ajax({
				url: '//view.co.il/ytbwa/ace/dovale/loadView.aspx',
				type: 'post',
				dataType: 'json',
				data:
				{
					campId: '595',
					fname: args.jf_txt_1,
					phone: args.jf_txt_2,
					text1: args.jf_rdb_3,
					src: queryString('lead_source')
				},
				complete: function()
				{
					// alert('הפרטים התקבלו בהצלחה');
					$('#jetform').hide();
					$('#thanks').show();
				}
			});
		}
	});
	
	function queryString(key, query) {
	    var urlPath = "",
	        queryArray = [],
	        queryParam = [];
	    urlPath = query || decodeURIComponent(window.location.search.substring(1));
	    if (urlPath.indexOf("&") == -1) queryArray.push(urlPath);
	    else queryArray = urlPath.split("&");
	    for (var i = 0; i < queryArray.length; i++) {
	        queryParam = queryArray[i].split("=");
	        if (queryParam[0].toLowerCase() == key.toLowerCase())
	            return queryParam[1];
	    }
	    return false;
	}
})