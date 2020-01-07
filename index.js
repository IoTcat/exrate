const request = require('request');


var ref = 9.4;
var LastRefDate = new Date();
const thre = 0.2;
const maxDays = 5;
const checkInterval = 1000*60*5;

setInterval(()=>{
	getRate("GBP", "CNY", (rate)=>{
		console.log((new Date()) + " - GBP->CNY :: " + rate + "  ref: " + ref);
		if(rate < ref - thre){
			console.log("GBP DOWN!!");
			mail("i@yimian.xyz", `GBP DOWN TO ${rate}`, `Current Rate: ${rate}, Ref Rate: ${ref}`);
			sms("18118155257", `英镑跌至${rate}`, `发消息提醒`);
			sms("15827586269", `英镑跌至${rate}`, `发消息提醒`);
			ref = rate;
			LastRefDate = new Date();
		}
		if((new Date).valueOf() > LastRefDate.valueOf() + 1000*60*60*24*maxDays){
			ref = rate;
			LastRefDate = new Date();
		}
	});
}, checkInterval);



var getRate = (from = "GBP", to = "CNY", callback) => {
request(`https://webapi.huilv.cc/api/exchange?num=100&chiyouhuobi=${from}&duihuanhuobi=${to}`, function (error, response, body) {
	  if (error) console.log('error:', error); // Print the error if one occurred
	  var jisuanjieguo = (res) => {
		return res.dangqianhuilv;
	  };
	  var erate = eval(body);
	  callback(erate);
});}


var mail = (to, subject, body) => {
	request(encodeURI(`https://api.yimian.xyz/mail/?to=${to}&subject=${subject}&body=${body}&from=exRate`));
}

var sms = (to, s0, s1) => {
	request(encodeURI(`https://api.yimian.xyz/sms/?to=${to}&s0=${s0}&s1=${s1}&t=` + Date.parse(new Date)/1000));
}
