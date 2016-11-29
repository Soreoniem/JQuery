/*
	Descripción de la práctica
	• Crea 2 párrafos en html
	• Captura el evento click solo del 1r párrafo
*/
$(document).ready(function(){
	$("p:first").click(function(){
		alert("Click en el 1r párrafo");
	});
});