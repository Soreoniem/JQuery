// Iniciar
$(document).ready(function(){
	
	// Bucle añadir las imagenes
	f_generarImagenes();
	
	// MouseOver
	$(".divImagen img")
		.mouseover(function(){
			
			// "imagen.jpg" substr(0, length - 4)
			v_img = $(this);
			v_texto	= $(this).next();
			
			v_img.attr("src", v_img.attr("src").replace(".jpg", "_h.jpg"));
			v_texto.css("color", "whitesmoke");
		})
		.mouseleave(function(){
			v_img = $(this);
			v_texto	= $(this).next();
			
			v_img.attr("src", v_img.attr("src").replace("_h.jpg", ".jpg"));
			v_texto.css("color", "rgba(255, 255, 255, 0.5)");
		});
});

// Recorre el array de las imagenes y las añade
function f_generarImagenes(){
	
	// Variable para el body
	var fv_body = $("body");
	
	for( var i=0 ; i<imagenes.length ; i++ ){
		fv_body.append(
			"<div class=\"divImagen\">"
				+"<img src=\"./Imgs/pequeño/"+ imagenes[i] +".jpg\"/>"
				+"<div class=\"texto\">"+ imagenes[i] +"</div>"
			+"</div>"
		);
	}
}