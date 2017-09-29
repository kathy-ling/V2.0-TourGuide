
var guidePhone = getPhone();

$(function(){
	
	
	$("#todaypage").hide();
	$("#tomopage").hide();
	$("#dayaftpage").hide();
	
    //页面加载初始化年月
    var mydate = new Date();
    $(".f-year").html( mydate.getFullYear() );
    $(".f-month").html( mydate.getMonth()+1 );
    showDate(mydate.getFullYear(),mydate.getMonth()+1);
                
    //日历上一月
    $(".f-btn-jian ").click(function(){
        var mm = parseInt($(".f-month").html());
        var yy = parseInt($(".f-year").html());
        if( mm == 1){//返回12月
            $(".f-year").html(yy-1);
            $(".f-month").html(12);
            showDate(yy-1,12);
        }else{//上一月
            $(".f-month").html(mm-1);
            showDate(yy,mm-1);
        }
    })
    
    //日历下一月
    $(".f-btn-jia").click(function(){
        var mm = parseInt($(".f-month").html());
        var yy = parseInt($(".f-year").html());
        if( mm == 12){//返回12月
            $(".f-year").html(yy+1);
            $(".f-month").html(1);
            showDate(yy+1,1);
        }else{//上一月
            $(".f-month").html(mm+1);
            showDate(yy,mm+1);
        }
    })
    
    //返回本月
    $(".f-btn-fhby").click(function(){
        $(".f-year").html( mydate.getFullYear() );
        $(".f-month").html( mydate.getMonth()+1 );
        showDate(mydate.getFullYear(),mydate.getMonth()+1);
    })
                
	//读取年月写入日历  重点算法!!!!!!!!!!!
	function showDate(yyyy,mm){
	    var dd = new Date(parseInt(yyyy),parseInt(mm), 0);   //Wed Mar 31 00:00:00 UTC+0800 2010  
	    var daysCount = dd.getDate();            //本月天数  
	    var mystr ="";//写入代码
	    var icon = "";//图标代码
	    var today = new Date().getDate(); //今天几号  21
	    var monthstart = new Date(parseInt(yyyy)+"/"+parseInt(mm)+"/1").getDay()//本月1日周几  
	    var lastMonth; //上一月天数
	    var nextMounth//下一月天数
	    if(  parseInt(mm) ==1 ){
	        lastMonth = new Date(parseInt(yyyy)-1,parseInt(12), 0).getDate();
	    }else{
	        lastMonth = new Date(parseInt(yyyy),parseInt(mm)-1, 0).getDate();
	    }
	    if( parseInt(mm) ==12 ){
	        nextMounth = new Date(parseInt(yyyy)+1,parseInt(1), 0).getDate();
	    }else{
	        nextMounth = new Date(parseInt(yyyy),parseInt(mm)+1, 0).getDate();
	    }
	    //计算上月空格数
	    for(j=monthstart;j>0;j--){
	        mystr += "<div class='f-td f-null f-lastMonth' style='color:#ccc;'>"+(lastMonth-j+1)+"</div>";
	    }
	    
	    //本月单元格
	    for(i=0;i<daysCount;i++){
	         //这里为一个单元格，添加内容在此
	        mystr += "<div class='f-td '><span class='f-day'>"+(i+1)+"</span>"
	                +"</div>"; 
	    }
	    
	    //计算下月空格数
	    for(k=0; k<42-(daysCount+monthstart);k++ ){//表格保持等高6行42个单元格
	        mystr += "<div class='f-td f-null f-nextMounth' style='color:#ccc;'>"+(k+1)+"</div>";
	    }
                                                             
        //写入日历
        $(".f-rili-table .f-tbody").html(mystr);
        //给今日加class
        if( mydate.getFullYear() == yyyy){
            if( (mydate.getMonth()+1 ) == mm){
                var today = mydate.getDate();
                var lastNum = $(".f-lastMonth").length;
                $(".f-rili-table .f-td").eq(today+lastNum-1).addClass("f-today f-number ctoday");
                $(".f-rili-table .f-td").eq(today+lastNum).addClass("f-today f-number ctomo");
                $(".f-rili-table .f-td").eq(today+lastNum+1).addClass("f-today f-number cdat");
            }
        }
        
		$(".ctoday").off("click");
					
		$(".ctoday").on("click",function(){
			$(".f-rili-table .f-number").removeClass("f-on");
			$(this).addClass("f-on");
			todaycheck()
		});
		
		$(".ctomo").off("click");
		$(".ctomo").on("click",function(){
			$(".f-rili-table .f-number").removeClass("f-on");
			$(this).addClass("f-on");
			tomocheck()
		});
		
		$(".cdat").off("click");
		$(".cdat").on("click",function(){
			$(".f-rili-table .f-number").removeClass("f-on");
			$(this).addClass("f-on");
			datcheck()
		});                    
   }
});


function todaycheck(){
	var date = getNowDate();
	var url = HOST + "/isNotWork.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			phone:guidePhone,day:date  
		},
		error: function() {
			alert('获取讲解员工作安排失败！');
		},
		success: function(data) {
			if(data == true){
				alert('您已设置今日不接单！');
				$("#todaypage").hide();
			}else{
				$("#todaypage").show();
			}
		}
	});	
	
	$("#tomopage").hide();
	$("#dayaftpage").hide();
}

function tomocheck(){
	var date = addDate(getNowDate(), 1);
	var url = HOST + "/isNotWork.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			phone:guidePhone,day:date  
		},
		error: function() {
			alert('获取讲解员工作安排失败！');
		},
		success: function(data) {
//			alert(JSON.stringify(data));
			if(data == true){
				alert('您已设置今日不接单！');
				$("#tomopage").hide();
			}else{
				$("#tomopage").show();
			}
		}
	});	
	
	$("#todaypage").hide();	
	$("#dayaftpage").hide();
}

function datcheck(){
	var date = addDate(getNowDate(), 2);
	var url = HOST + "/isNotWork.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			phone:guidePhone,day:date  
		},
		error: function() {
			alert('获取讲解员工作安排失败！');
		},
		success: function(data) {
//			alert(JSON.stringify(data));
			if(data == true){
				alert('您已设置今日不接单！');
				$("#dayaftpage").hide();
			}else{
				$("#dayaftpage").show();
			}
		}
	});	
	$("#todaypage").hide();
	$("#tomopage").hide();	
}


//date,工作的日期
function setGuideWorkday(date, phone){
	var url = HOST + "/setGuideWorkday.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			phone:phone,days:date  
		},
		error: function() {
			alert('该讲解员取消接单失败');
		},
		success: function(data) {
//			alert(JSON.stringify(data));
			if(data == true){
				alert('确认接单设置成功！');
			}
		}
	});
}

//date,不工作的日期
function setGuideNotWorkday(date, phone){
	var url = HOST + "/setGuideNotWorkday.do"
	$.ajax({
		type: "post",
		url: url,
		data: {
			phone:phone,days:date  
		},
		error: function() {
			alert('该讲解员取消接单失败');
		},
		success: function(data) {
//			alert(JSON.stringify(data));
			if(data == true){
				alert('取消接单设置成功！');
			}
		}
	});
}

function todayConfirm(){
	var day = getNowDate();
	setGuideWorkday(day, guidePhone);
}

function tomorrowConfirm(){
	var day = addDate(getNowDate(), 1);
	setGuideWorkday(day, guidePhone);
}

function dayAfterCancle(){
	var day = addDate(getNowDate(), 2);	
	setGuideWorkday(day, guidePhone);
}


function todayCancle(){
	var day = getNowDate();
	setGuideNotWorkday(day, guidePhone);
}

function tomorrowCancle(){
	var day = addDate(getNowDate(), 1);
	setGuideNotWorkday(day, guidePhone);
}

function dayAfterCancle(){
	var day = addDate(getNowDate(), 2);	
	setGuideNotWorkday(day, guidePhone);
}




//获取当前日期“yyyy-MM-dd”
function getNowDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + '-' + month + '-' + strDate;
    return currentdate;
}

// 日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}