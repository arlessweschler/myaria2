request = require('request');
var path = require('path');

function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

var req = function(urlx,data){
        opt = {
                url: urlx,
                form: data
        };
        return opt;
}


function getimgcmd(){
	arr = $('#outdiv .alert');
	for(x in arr){
		//console.log($(arr[x]).html());return false;
		newurl = $(arr[x]).html();
		//newurl.trim();
		console.log(newurl);
		if(newurl == '') continue;
		
		request(newurl,function(er,response,body){
			//console.log(body);
			matchs = body.match(/auctionImages.*?:([.\s\S]*?)]/);
			//console.log(matchs);return false;
			rst = matchs[1].replace(/[\[\]"]/ig,'').replace(/\/\//ig,'http://');
			iuarr = rst.split(/\,/ig);

			//获取id
			tmp = body.match(/itemId.*?'(.*?)'/);
			pathname = tmp[1];

			for(xx in iuarr){
				imgurl = iuarr[xx].trim();
				if(imgurl == '') continue;

				filename = parseUrlForFileName(imgurl);

				//cmdstr = 'wget -c --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" ';
				//cmdstr = cmdstr + ' -P "images/' + pathname +'" "'+imgurl+'"';

				//rr = spawn('aria2c', ['-c','--user-agent=Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16',imgurl,'-d images/'+pathname]);

				/*
				rr.stdout.on('data',function(data){
					$('#outdiv2').append('<div class="alert alert-info">'+data+'</div>');
				});
				*/
				//data = [{"jsonrpc":"2.0","method":"aria2.addUri","params":[[imgurl],{"dir":'images/'+pathname}]}];
/*
					request.post(req('http://localhost:6800/jsonrpc?tm='+Math.random(),data),function(err,response,body){
						$('#outdiv2').append('<div class="alert alert-info">'+body+'</div>');		
					});
*/
//				shoppath_tmp = $('#url').val().match(/https:\/\/(.*?)\.htm/);

				tmppath = shoppath != '' ? shoppath+'/' : '';

foo.call(
	'aria2.addUri', [[imgurl],{"dir":'images/'+tmppath+pathname}],
	function(result) { 
		//alert('Foo bar answered: ' + result.my_answer); 
	},
	function(error)  {
		//console.log('There was an error', error);
	}
);
/*
				$.jsonRPC.request('aria2.addUri', {
				  params: [[imgurl],{"dir":'images/'+pathname}],
				  success: function(result) {
					// Do something with the result here
					// It comes back as an RPC 2.0 compatible response object
				  },
				  error: function(result) {
					// Result is an RPC 2.0 compatible response object
				  }
				});
*/
				//logx(cmdstr);
				//$('#outdiv2').append('<div class="alert alert-info">'+cmdstr+'</div>');

			}

		});

	}
}  

