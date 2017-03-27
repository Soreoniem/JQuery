// Por defecto
$(document).ready(function(){
		$("svg").attr("xmlns", "http://www.w3.org/2000/svg");
		
		var scroll_final	= 1000;
		
		// Scroll inicial
		$(	".menuOpcion"
			+",.menu_texto")
			.attr("data-0", "opacity: 0;");
		
		// Inicio personalizado
		// Bienvenido
		$("#circulo_central_texto2")
			.attr("data-"+ (scroll_final * 0.33), "opacity: 0;");
		
		// Scroll
		$("#circulo_central_texto1")
			.attr("data-0", "opacity: 1;");
		
		// Final personalizado
		$(".menuOpcion, .menu_texto")
			.attr("data-"+ scroll_final, "opacity: 1;");
		
		// Bienvenido
		$("#circulo_central_texto2")
			.attr("data-"+ scroll_final, "opacity: 1;");
		
		// Scroll
		$("#circulo_central_texto1")
			.attr("data-"+ (scroll_final * 0.66), "opacity: 0;");
		
		skrollr.init();
		ejecutar();
});
$(document).ready(function(){
	$(window).resize(ejecutar);
});

function calcularAnchoVentana(){
	var tamaño	= $(window).innerWidth();
	
	// If else con return
	// resultado = (x = x) ? "verdadero" : "falso";
	
	tipo = (tamaño >= 1200) ? "grande"
		: (tamaño >= 992) ? "normal"
		: (tamaño >= 768) ? "pequeña" : "movil";
		
	$("body").attr("ventana", tipo);
}

function ejecutar(){
	calcularAnchoVentana();
	var ventana				= $(window);
	var ventana_anchura		= ventana.innerWidth() /2;
	
	var cir_central_radio	= ventana_anchura *0.3;
	var cir_peque_radio		= cir_central_radio /2;
	var cir_peque_borde		= parseInt($("circle").css("stroke-width"));
	
	$("svg")
		.attr("width", (ventana.innerWidth()))
		.attr("height", (ventana.outerHeight()));
		
	// Asigna el radio a cada círculo
	$("#circulo_central")
		.attr("r", cir_central_radio);
	$(".menuOpcion")
		.attr("r", cir_peque_radio);
	
	// Posición: Círculos pequeños
	$("#menu_projectos")
		.attr("cx", "Calc(50% - "+ cir_central_radio +"px)")
		.attr("cy", "Calc(50% - "+ cir_central_radio +"px)");
	
	$("#menu_inicio")
		.attr("cx", "Calc(50% + "+ cir_central_radio +"px)")
		.attr("cy", "Calc(50% - "+ cir_central_radio +"px)");
	
	$("#menu_acerca")
		.attr("cx", "Calc(50% + "+ cir_central_radio +"px)")
		.attr("cy", "Calc(50% + "+ cir_central_radio +"px)");
	
	$("#menu_contactar")
		.attr("cx", "Calc(50% - "+ cir_central_radio +"px)")
		.attr("cy", "Calc(50% + "+ cir_central_radio +"px)");
	
	// Posición: Circulo central ► texto
	var cir_texto_ancho			= (cir_central_radio * 2) * 0.9;
	var cir_texto_margen		= $("#circulo_central").width() * 0.05;
	var cir_texto_margen_top	= (cir_central_radio * 2) * 0.33;
	
	$("#circulo_central_texto1, #circulo_central_texto2")
		.css("width",	cir_texto_ancho)
		.css("height",	cir_texto_ancho)
		.css("left",	"Calc(50% - "+ cir_central_radio +"px - 1px)")
		.css("top",		"Calc(50% - "+ cir_central_radio +"px - 1px)")
		.css("margin-left", cir_texto_margen +"px")
		.css("margin-top", cir_texto_margen_top +"px");
	
	
	// Posición: Circulos pequeños ► Texto
	// Altura y Anchura
	var cir_peque_texto_ancho	= $(".menuOpcion").width() * 0.9;
	var cir_peque_texto_margen	= $(".menuOpcion").width() * 0.05;
	var cir_peque_texto_margen_top	= cir_peque_radio * 0.45;
	
	$(".menu_texto")
		.css("width",		cir_peque_texto_ancho +"px")
		.css("height",		cir_peque_texto_ancho +"px")
		.css("margin-left",	cir_peque_texto_margen +"px")
		.css("margin-top",	cir_peque_texto_margen +"px");
	
	$("#menu_projectos_texto")
		.css("left",	"Calc(50% - "+ cir_central_radio +"px - "+ cir_peque_radio +"px)")
		.css("top",		"Calc(50% - "+ cir_central_radio +"px - "+ cir_peque_texto_margen_top +"px)");
	
	$("#menu_inicio_texto")
		.css("left",	"Calc(50% + "+ cir_central_radio +"px - "+ cir_peque_radio +"px)")
		.css("top",		"Calc(50% - "+ cir_central_radio +"px - "+ cir_peque_texto_margen_top +"px)");
	
	$("#menu_acerca_texto")
		.css("left",	"Calc(50% + "+ cir_central_radio +"px - "+ cir_peque_radio +"px)")
		.css("top",		"Calc(50% + "+ cir_central_radio +"px - "+ cir_peque_texto_margen_top +"px)");
	
	$("#menu_contactar_texto")
		.css("left",	"Calc(50% - "+ cir_central_radio +"px - "+ cir_peque_radio +"px)")
		.css("top",		"Calc(50% + "+ cir_central_radio +"px - "+ cir_peque_texto_margen_top +"px)");
}