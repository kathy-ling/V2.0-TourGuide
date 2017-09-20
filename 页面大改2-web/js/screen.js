$(function(){
	$( "#radio" ).buttonset();
	$( "#sex" ).buttonset();
	$( "#language" ).buttonset();
	$( "#age" ).buttonset();
	
	//星级
	$("#starLevel").raty({
		number:7,
        starOn : 'img/star-on.png',  
        starOff : 'img/star-off.png',
		readOnly:false,
		size:36,
		score:2,
		hints:['50','100','150','200','250','300','350'],
	});
});