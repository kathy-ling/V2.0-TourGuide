

function addNavigate(n){
	$("body").append("<div id='navigate'><table><td><img id='dhs' src='img/dh-sy.png' onclick='index()'/></td><td><img id='dhp' src='img/dh-pd1.png' onclick='pin()'/></td><td><img id='dhy' src='img/dh-yy1.png' onclick='yuyue()'/></td><td><img id='dhg' src='img/dh-gr1.png' onclick='per()'/></td></table></div>");
	if(n>4||n<2){
		return false;
	}
	else{
		if(n==2){
			document.getElementById('dhp').src='img/dh-pd2.png';

		}
		if(n==3){
			document.getElementById('dhy').src='img/dh-yy2.png';
		}
		if(n==4){
			document.getElementById('dhg').src='img/dh-gr2.png';
		}
	}
}

function per()
{
	if(vistPhone == "undefined" || vistPhone == openId)
	{
		alert("您还未注册，请注册！");
		window.location.href = "register.html?date="+Math.random();
	}else{
		window.location.href="personalHome.html?date="+Math.random();
	}
	
}

function index()
{
	
	window.location.href="index.html?date="+Math.random();
}

function pin()
{
	
	window.location.href="pinIndex.html?date="+Math.random();
}

function yuyue()
{
	window.location.href='orderGuides.html?date='+Math.random();
}
		
			
				
					
				
				
											
				