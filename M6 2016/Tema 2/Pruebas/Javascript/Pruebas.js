/*
	• html 2 divs centrados (rojo y azul)
	► pasar ratón encima rojo:
		aparecer menú 3 elementos en la parte superior
	
	► Doble click → rojo:
		· aparecer dentro un div azul
	
*/
$(document).ready(function(){
	$("#lista").hide();
	$("#divAzul2").hide();
	
	$("#divRojo")
		.mouseover(function(){
			$("#lista").show(450);
		})
		.dblclick(function(){
			$("#divAzul2").show(450);
		});
	
});