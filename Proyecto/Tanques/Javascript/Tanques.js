//╔═════╣ Variables ╠═════╗
//▼                       ▼
// Estilo	► Tanque
var estilo_tanque_anchura	= 50;
var estilo_tanque_cañon_altura	= estilo_tanque_anchura /5;
var estilo_tanque_cañon_top	= (estilo_tanque_anchura /2) - (estilo_tanque_cañon_altura /2);

var tiempoObservarTeclas;

// Poner las x y las y en variables
var v_tanque_posicion_x;
var v_tanque_posicion_y;

$(document).ready(function(){
	f_comprobar_cookie_almacenada();
	
	tiempoObservarTeclas = setInterval(tiempoObservarTeclas, 1);
	f_tanque_nuevo();
	f_tanque_actualizar_posicion();
	f_tanque_controles();
	
	$(window).mousemove(f_puntero_apuntar);
});
function f_comprobar_cookie_almacenada(){
	var vf_galleta = getCookie("idTanque");
	
	if(vf_galleta == "sinCookie"){
		f_obtener_idTanque();
	} else {
		console.log("idTanque: "+ vf_galleta);
	}
}

function f_obtener_idTanque(){
	var f =				new Date();
	var f_años =		f.getFullYear();
	var f_meses =		f.getMonth() + 1;
	var f_dias =		f.getDate();
	var f_horas =		f.getHours();
	var f_minutos =		f.getMinutes();
	var f_segundos =	f.getSeconds();
	setCookie("idTanque", "_"+ (aleatorio(0, (f_dia + f_mes + f_año))) +"_"+ f_segundos +":"+ f_minutos +"_"+ f_dia +"/"+ f_mes +"/"+ f_año);
}

function f_tanque_actualizar_posicion(){
	v_tanque_posicion_x = (parseInt($(".tanque").css("left"))) + (estilo_tanque_anchura /2);
	v_tanque_posicion_y	= (parseInt($(".tanque").css("top"))) + (estilo_tanque_anchura /2);
}

function f_puntero_apuntar(e){
	// _Ratón_
	$("#x_raton").text(e.pageX);
	$("#y_raton").text(e.pageY);
	
	// _Tanque_
	$("#grados_tanque_cañon").text($(".tanque .cañon").attr("grados"));
	
	f_tanque_apuntar(e.pageX, e.pageY);
}
function f_tanque_apuntar(p_punteroX, p_punteroY){
	// Mostrar
	$("#x_tanque").text( v_tanque_posicion_x );
	$("#y_tanque").text( v_tanque_posicion_y );
	
	// URL calculo: geoan.com/vectores/angulo.html
	// Paso 1
	//var vf_grados = p_punteroX * vf_tanque_posicion_x + p_punteroY * vf_tanque_posicion_y
	
	//$("#grados_tanque_cañon").text(vf_grados);
	
}


function f_tanque_nuevo(){
	// Calcula el tamaño de la ventana
	var anchura_ventana = $(window).innerWidth();
	var altura_ventana =	$(window).innerHeight();
	
	var estilo_tanque = "style=\""
		+"top: "+ (aleatorio((altura_ventana * 0.1), (altura_ventana * 0.9)) - (estilo_tanque_anchura /2)) +"px;"
		+"left: "+ (aleatorio((anchura_ventana * 0.1), (anchura_ventana * 0.9)) - (estilo_tanque_anchura /2)) +"px;"
		+"width: "+ estilo_tanque_anchura +"px;"
		+"height: "+ estilo_tanque_anchura +"px;"
		+"\"";
	
	var estilo_cañon = "style=\""
		+"width: "+				estilo_tanque_anchura +"px;"
		+"height: "+			estilo_tanque_cañon_altura +"px;"
		+"top: "+				estilo_tanque_cañon_top +"px;"
		+"left: "+				estilo_tanque_cañon_top +"px;"
		+"transform-origin: "+	(estilo_tanque_cañon_altura /2) +"px 50%;"
		+"\"";
	
	$("body").append(
		"<div class=\"tanque\" "+ estilo_tanque +">"
			+"<div class=\"cañon\" "+ estilo_cañon +" grados=\"0\">"
			+"</div>"
		+"</div>"
	);
}
var keys = {
	87: false,	//W
	68: false,	// D
	83: false,	// S
	65: false	// A
};

//╔═════╣ Controles ╠═════╗
//▼                       ▼
function tiempoObservarTeclas(){
	// [W]
	(keys[87]) ? tanque.css("top", parseInt(tanque.css("top")) -1) && f_tanque_apuntar() : "";
	
	// [S]
	(keys[83]) ? tanque.css("top", parseInt(tanque.css("top")) +1) && f_tanque_apuntar() : "";
	
	// [A]
	(keys[65]) ? tanque.css("left", parseInt(tanque.css("left")) -1) && f_tanque_apuntar() : "";
	
	// [A]
	(keys[68]) ? tanque.css("left", parseInt(tanque.css("left")) +1) && f_tanque_apuntar() : "";
}
function f_tanque_controles(){
	tanque = $(".tanque");
	$(this).keydown(function(e){
		if(e.keyCode in keys){
			keys[e.keyCode]	= true;
			
		}
	}).keyup(function(e){
		if(e.keyCode in keys){
			keys[e.keyCode] = false;
		}
	});
}