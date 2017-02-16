$(document).ready(function(){
	$(".menuOpcion").css("opacity", "0");
});

$(document).ready(function(){
	$(".menuTituloTitulo")
		.mouseover(function(){
			$(this).parent().find(".menuOpcion").css("opacity", "1");
		});
	$(".menuOpcion").parent().mouseleave(function(){
			$(this).find(".menuOpcion").css("opacity", "0");
	});
	$("#h1").mousedown(function(event){
		$("body").append("<h1>h1<h1>");
	});
});