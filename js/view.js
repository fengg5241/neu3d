$(function() {

	var ifm = document.getElementById("content");
	ifm.height = document.documentElement.clientHeight;
	var url = localStorage.string;;
	ifm.setAttribute("src","https://"+url);

})