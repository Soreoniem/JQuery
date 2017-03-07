var activar = false;
var leftActual	= 0;
var margen		= 0;
$(document).ready(function(){
	$(".imgFlecha")
		// Botón abajo
		.mousedown(function(event){
			// Permito arrastrar
			activar = true;
			// event.pageX de la la posición X respecto a la ventana
			// almaceno la posición de la flecha (cuanto se ha desplazado)
			// Originalmente posee 0px
			leftActual = parseInt($(this).css("left"));
			
			// Obtengo el margen actual
			// margen = margen izquierdo - margen que se ha desplazado la flecha
			// He de descontar el margen que se ha desplazado la flecha
			margen	= parseInt(event.pageX) - leftActual;
		
		// Bloqueo la función de arrastre
		}).mouseup(function(){
			activar = false;
		
		}).mousemove(function(event){
			// Mueve la flecha si se lo permito (mousedown)
			if( activar ){
				// NOTA: El mousemove no es preciso por lo que es posible que salte de 3px en 3px si vas rápido
				
				// Margen de la flecha superior o igual a 0 (puede entrar -3 si vás rápido)
				if(parseInt($(this).css("left")) >= 0){
					// Cambio el margen (left)
					// left = posición ratón - margen
					$(this).css("left", (event.pageX - margen) +"px" );
					
					// También cambio la anchura de las líneas
					// NOTA: Con "right: 0px;" solo debo reducir el ancho (ancho - margen - posición de la flecha)
					$(".lineas").css("width", "Calc(100% - "+ (event.pageX - margen) +"px)" );
		// Tope de la izquierda
					// Inferior a 0:
						// Flechas: 0px (left)
						// Lineas: 100%	(width)
					if( parseInt($(this).css("left") ) < 0){
						$(".lineas").css("width", "100%" );
						$(this).css("left", "0px");
					}
				}
				
		// Tope de la derecha
				// Si el margen recorrido es mayor o igual a la anchura de la caja
				if( parseInt($(this).css("left")) >= parseInt($("#caja").width()) ){
					
					// Evito que se salga
					$(this).css("left", parseInt($("#caja").width()) +"px");
					$(".lineas").css("width", "Calc(100% - "+ parseInt($("#caja").width()) +"px)" );
					
					// Cambio la página
					window.location="http://www.google.es/";
					con("¡Cambio Web!");
					
				}
			}
		});
});


function con(imp){
	console.log(imp);
}