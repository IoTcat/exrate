const request = require('request');

request('https://www.huilv.cc/GBP_CNY/', (err, header, body)=>{
	var val = body.match(/<span(.*?)<\/span>/g)[0].match(/\d+(.\d+)?/g)[0];
	console.log(val);
});
