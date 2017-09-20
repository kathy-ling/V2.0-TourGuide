

function addNavigate(n){
	$("body").append("<div id='navigate'><table><td><img id='dhs' src='img/dh-sy.png'/></td><td><img id='dhp' src='img/dh-pd1.png'/></td><td><img id='dhy' src='img/dh-yy1.png'/></td><td><img id='dhg' src='img/dh-gr1.png'/></td></table></div>");
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

		
			
				
					
				
				
											
				