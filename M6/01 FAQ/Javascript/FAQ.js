/* Practica
	✔ Al iniciar
		= Respuestas ocultas
	
	✔ Click pregunta
		= Aparecer y desaparecer
	
	• + Si está oculto
	• - Si está visible
*/
$(document).ready(function(){
	$(".answer").hide();
	
	$("h2").mousedown(function(){
		
		// h2 en una variable
		var v_h2 = $(this);
		
		// Si tiene o no la clase (elimina / añade)
		(v_h2.hasClass("close"))
			? v_h2.removeClass("close")
			: v_h2.addClass("close") ;
		
		// Cambia la visibilidad
		$(this).next().toggle(450);
	});
});