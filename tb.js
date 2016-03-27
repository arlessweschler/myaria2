request = require('request');
cheerio = require('cheerio');
fs = require('fs');

function logx(str){
	fs.appendFile('lk.txt',str+"\n",'utf8',function(err){
		if(err)throw err;
		console.log('记录ok.');
	});
}

function getids(url,page){
	matchs = url.match(/http(.*?)com/);
	baseurl = "http"+matchs[1]+"com";

	newurl = url+'?pageNo='+page;
	//$('#outdiv').a(newurl);//return false;
	//console.log(newurl);
	//return false;
	//newurl = url;

	request(newurl,function(er,response,body){
		if(er) throw er;

		CCC = cheerio.load(body);
		urx = CCC('#J_ShopAsynSearchURL').val();
		urlx = baseurl+urx;
		console.log(urlx);

		request(urlx,function(er,response,body){
			if(er) throw er;

			body = body.replace(/\\"/ig,'"');
			body = body.replace(/\/\//ig,'http://');
			CCC = cheerio.load(body);
			//logx(body);
			
			//pageinfo = $('.page-info').html();
			//console.log(pageinfo);
			//parr = pageinfo.split('/');

			CCC('.item').each(function(idx,obj){
				//logx($$(obj).find('a').attr('href'));
				$('#outdiv').append('<div class="alert alert-info">'+CCC(obj).find('a').attr('href')+'</div>');
			});

			//没到最后一页
			//if(parr[0] != parr[1]){
				//nextpage = page+1;
				//getids(url,nextpage);
			//}
			
			//return parr[1];
		});



	});
}


url = 'https://shop100805838.taobao.com/category-1120551875.htm';

shoppath_tmp = '';
shoppath = '';

function gopage(url,start,end){
	shoppath_tmp = url.match(/https:\/\/(.*?)\.htm/);
	shoppath = shoppath_tmp[1];
	for(i = start;i<=end;i++){
		getids(url,i);
	}
}

