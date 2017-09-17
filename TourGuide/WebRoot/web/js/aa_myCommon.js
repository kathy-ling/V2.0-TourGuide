//比较两个时间的大小
function timeCompare(endTime, beginTime){
	
	var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
	if(a < 0){
		alert("您选择的时间在当前时间之前，请重新选择!");
		return false;
	}else{
		return true;	
	}
}

//"yyyy-mm-dd hh:mm",获取当前的时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minute = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + minute;

    return currentdate;
}