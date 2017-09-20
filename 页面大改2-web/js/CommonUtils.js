
//获取当前日期时间“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//获取当前日期时间“MM-dd HH:MM”：06-12 12:30
function getNowDateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes();
    return currentdatetime;
}

//function getTimeDiff(time1, time2){
//	var d1 = new Date(time1);
//	var d2 = new Date(time2);
//int t = parseInt(d2 - d1);//两个时间相差的毫秒数
//alert(t);
////console.log(parseInt(d2 - d1) / 1000);//两个时间相差的秒数
////console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的分钟数
////console.log(parseInt(d2 - d1) / 1000 / 60);//两个时间相差的小时数
//}
