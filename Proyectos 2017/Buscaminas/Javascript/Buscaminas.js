document.oncontextmenu = function(){return false;}
/*
	• Detector por sonido
*/

// Configuración predeterminada
var v_buscaminas_anchura		= 10;
var v_buscaminas_altura			= 10;

var v_buscaminas_dificultad		= 10;

// Números: 0-8(minas alrededor), -1 (mina)
var v_buscaminas_tablero_datos;
// Areas: 10 hacia arriba
var v_buscaminas_tablero_areas;

var v_buscaminas_minas_total		= 0;
var v_buscaminas_minas_aseguradas	= 0;

var v_buscaminas_banderas			= 0;

var v_buscaminas_estado				= "jugar";	// jugar, ganador, perdedor
var v_buscaminas_sonido_activado	= "si";

$(document).ready(function(){
	f_buscaminas_configuracion_inicial();
	
	f_buscaminas();
	
	//Menú ► Aceptar
	$("#menu_aceptar button").mousedown(f_buscaminas_menu_aceptar);
});

function f_buscaminas_menu_aceptar(){
	// Obtener los datos del menú
	// Actualizar los datos del buscaminas
	v_buscaminas_sonido_activado	= $("#menu_sonido .boton").attr("activado");
	v_buscaminas_anchura			= parseInt($("#menu_anchura .dato").text());
	v_buscaminas_altura				= parseInt($("#menu_altura .dato").text());
	v_buscaminas_dificultad			= parseInt($("#menu_dificultad .dato").text());
	
	// Cerrar el menú
	f_menu_abrirCerrar();
	
	// Crear el nuevo buscaminas
	f_buscaminas();
}

// Crea un nuevo juego de Buscaminas con los parametros actuales
function f_buscaminas(){
	f_buscaminas_datos_crear();
	
	f_buscaminas_datos_añadir();
	// Crear tablas
	f_buscaminas_mostrar_tabla();
	
	f_buscaminas_eventos();
	
	// Añadir datos
	// Jugar
}

function f_buscaminas_eventos(){
	$("#buscaminas td").mousedown(function(e){
		// Click Derecho
		if(e.which == 3){
			f_buscaminas_eventos_clickDerecho($(this));
		
		// Click Izquierdo
		} else if(e.which == 1) {
			f_buscaminas_eventos_clickIzquierdo($(this));
		}
	});
}

// Click Izquierdo a una casilla
function f_buscaminas_eventos_clickIzquierdo(p_objeto){
	// Información para los tableros
	var img_x	= parseInt(p_objeto.attr("x"));
	var img_y	= parseInt(p_objeto.attr("y"));
	var datoTablero	= v_buscaminas_tablero_datos[img_y -1][img_x -1];
	var datoArea	= v_buscaminas_tablero_areas[img_y -1][img_x -1];
	
	// Información html
	var img_tag	= p_objeto.find("img");
	var img_src	= img_tag.attr("src");
	
	
	// Click ► No bandera
	if( img_src == imagenes["normal"] ){
		// Click ► Bomba
		if( datoTablero == -1 ){
			f_buscaminas_perdedor(p_objeto);
		
		// Click ► Número
		} else if( datoTablero != 0 ){
			// Revelar solo el número
			p_objeto.find("img").attr("src", imagenes[datoTablero.toString()])
		
		// Si no es bomba o número es una area vacía
		// Por lo que se debe revelar las casillas por area
		} else {
			// Recorre el tablero
			for( var y=0 ; y<v_buscaminas_altura ; y++ ){
				for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
					
					// El area coincide con el mismo la que se la pulsado (click)
					if( v_buscaminas_tablero_areas[y][x] == datoArea ){
						
						// Obtiene el <td> según la x y la y
						var objetoActual = $("[y="+ (y +1) +"][x="+ (x +1) +"]");
						
						// Si en ese <td> tiene el dato 0 es que no hay nada (no hay números)
						if( v_buscaminas_tablero_datos[y][x] == 0 ){
							objetoActual.find("img").attr("src", imagenes["nada"]);
						
						// Si pasa por aquí es que hay algún número.
						// Nota: Como las imagenes son números puedo usar la variable del tablero de los datos.
						} else {
							objetoActual.find("img").attr("src", imagenes[v_buscaminas_tablero_datos[y][x].toString()]);
						}
					}
				}
			}
		}
	}
}

// Click Derecho a una casilla
function f_buscaminas_eventos_clickDerecho(p_objeto){
	// Información para los tableros
	var img_x	= parseInt(p_objeto.attr("x"));
	var img_y	= parseInt(p_objeto.attr("y"));
	var datoTablero	= v_buscaminas_tablero_datos[img_y -1][img_x -1];
	
	// Información html
	var img_tag	= p_objeto.find("img");
	var img_src	= img_tag.attr("src");
	
	//*	[_• PRUEBAS (1/2) •_] LOOL: Quitar al terminar el juego
	console.clear();
	console.log(
		"_Antes_"
		+"\n"+ v_buscaminas_banderas +" Banderas."
		+"\n"+ v_buscaminas_minas_aseguradas +" Minas seguras."
		+"\n"+ v_buscaminas_minas_total +" Minas total."
	);
	// */
	
	// Click Derecho ► Normal
	if( img_src == imagenes["normal"] ){
		// Quedan banderas
		if( v_buscaminas_banderas > 0 ){
			
			// Cambia la imagen
			p_objeto.find("img").attr("src", imagenes["bandera"]);
			
			// reduce la cantidad de banderas
			v_buscaminas_banderas--;
			
			// Si hay una bomba se marca como segura (minas aseguradas +1)
			if( datoTablero == -1 ){
				// Si hay una mina la asegura
				v_buscaminas_minas_aseguradas++;
				
				if( v_buscaminas_minas_aseguradas == v_buscaminas_minas_total ){
					f_buscaminas_ganador();
				}
			}
		}
		// Si no hay banderas no hace nada
	
	// Click Derecho ► Bandera
	} else if( img_src == imagenes["bandera"] ) {
		// Cambia la imagen
		p_objeto.find("img").attr("src", imagenes["normal"])
		
		// Recoge la bandera
		v_buscaminas_banderas++;
		
		// Si hay una mina
		if( datoTablero == -1 ){
			v_buscaminas_minas_aseguradas--;
		}
	}
	
	//*	[_• PRUEBAS (2/2) •_]
	console.log(
		"_Después_"
		+"\n"+ v_buscaminas_banderas +" Banderas."
		+"\n"+ v_buscaminas_minas_aseguradas +" Minas seguras."
		+"\n"+ v_buscaminas_minas_total +" Minas total."
	);
	// */
}
function f_buscaminas_perdedor(p_objeto){
	v_buscaminas_estado = "perdedor";
	// Cambiar la cara
	$("#buscaminas caption img").attr("src", imagenes["perdedor"]);
	$("#buscaminas tbody td").each(function(){
		var e_objeto = $(this);
		
		// Información para los tableros
		var img_x	= parseInt(e_objeto.attr("x"));
		var img_y	= parseInt(e_objeto.attr("y"));
		var datoTablero	= v_buscaminas_tablero_datos[img_y -1][img_x -1];
		
		if( datoTablero == -1 ){
			e_objeto.find("img").attr("src", imagenes["mina"]);
		
		} else if( datoTablero == 0 ) {
			e_objeto.find("img").attr("src", imagenes["nada"]);
		} else {
			e_objeto.find("img").attr("src", imagenes[datoTablero.toString()]);
		}
	});
	
	p_objeto.find("img").attr("src", imagenes["minaClick"]);
}
function f_buscaminas_ganador(){
	v_buscaminas_estado = "ganador";
	// Cambiar la cara
	$("#buscaminas caption img").attr("src", imagenes["ganador"]);
	$("#buscaminas tbody td").each(function(){
		var e_objeto = $(this);
		
		// Información para los tableros
		var img_x	= parseInt(e_objeto.attr("x"));
		var img_y	= parseInt(e_objeto.attr("y"));
		var datoTablero	= v_buscaminas_tablero_datos[img_y -1][img_x -1];
		
		if( datoTablero == -1 ){
			e_objeto.find("img").attr("src", imagenes["minaOK"]);
		
		} else if( datoTablero == 0 ) {
			e_objeto.find("img").attr("src", imagenes["nada"]);
		} else {
			e_objeto.find("img").attr("src", imagenes[datoTablero.toString()]);
		}
	});
}

function f_buscaminas_mostrar_tabla(){
	var tabla =
		"<table>"+
			"<caption><img src=\""+ imagenes["inicial"] +"\"/></caption>"+
			"<tbody>"
	;
	
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		tabla = tabla + "<tr>";
			for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
				tabla = tabla +"<td y=\""+ (y +1) +"\" x=\""+ (x +1) +"\"><img src=\""+ imagenes["normal"] +"\"/></td>";
			}
		tabla = tabla + "</tr>";
	}
	
	var tabla = tabla +
			"</tbody>"+
		"</table>"
	;
	
	$("#buscaminas").html(tabla);
}

// Añade la información a los tableros
function f_buscaminas_datos_añadir(){
	// Tabla: Bombas (-1)
	f_buscaminas_datos_añadir_bombas(v_buscaminas_tablero_datos);
	
	// Tabla: Números (0-8)
	f_buscaminas_datos_añadir_numeros(v_buscaminas_tablero_datos);
	
	// Tabla: Areas (mayor o igual a 10)
	f_buscaminas_datos_añadir_areas();
}

// Añade las areas a la tabla (necesita la tabla creada etc.)
function f_buscaminas_datos_añadir_areas(){
	// Reiniciar las areas 0
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			v_buscaminas_tablero_areas[y][x] = 0;
		}
	}
	
	var areas	= 9;
	var infoAlrededor_datos;
	var infoAlrededor_areas;
	// Siguiente: Llenar las areas
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			infoAlrededor_datos	= f_buscaminas_obtener_tablero_info_alrededor(v_buscaminas_tablero_datos, y, x);
			infoAlrededor_areas	= f_buscaminas_obtener_tablero_info_alrededor(v_buscaminas_tablero_areas, y, x);
			
			// Identificar hay una zona vacía
			if( infoAlrededor_datos[5] == 0 ){
				// No se le ha asignado area
				if( infoAlrededor_areas[5] == 0 ){
					// Es una nueva area
					areas++;
					// Asignar una nueva area y asignar el area alrededor de si mismo
					// (afectará a las casillas vacías y con números pero no a las minas)
					for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
						if( infoAlrededor_datos[i] != null ){
							f_buscaminas_insertar_tablero_dato_enCoordenada(v_buscaminas_tablero_areas, y, x, i, areas);
						}
					}
				
				// Tiene un area asignada
				} else {
					// Por defecto no une las areas que estén pegadas
					var unirAreas = "no";
					// Hay que unir las areas si hay más de una alrededor (casilla Central == la actual == infoAlrededor_areas[5])
					// Evitar:
					//	0:		Lugar sin area
					//	i != 5:	Por precaución ignorar la casilla Central
					// null:	Array fuera de rango de datos
					for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
						if( infoAlrededor_areas[i] != 0 && infoAlrededor_areas[i] != infoAlrededor_areas[5] && infoAlrededor_areas[i] != null ){
							unirAreas = infoAlrededor_areas[i];
						}
					}
					
					// Si es diferente de "no" es que hay que unir las areas (areas contigüas)
					if( unirAreas != "no" ){
						// Recorrer toda la matriz de las areas
						for( var i=0 ; i<v_buscaminas_altura ; i++ ){
							for( var j=0 ; j<v_buscaminas_anchura ; j++ ){
								// Si encuentras la nueva area cambiala por la casilla actual (casilla Central)
								if( v_buscaminas_tablero_areas[i][j] == unirAreas ){
									v_buscaminas_tablero_areas[i][j] = infoAlrededor_areas[5];
								}
							}
						}
					
					// No hay que unir areas (asignación normal)
					} else {
						// recorrer las areas e insertar alrededor la información.
						// Excepto si son null que están fuera de la matriz de datos
						for( var i=1 ; i<infoAlrededor_areas.length ; i++ ){
							if( infoAlrededor_datos[i] != null ){
								f_buscaminas_insertar_tablero_dato_enCoordenada(v_buscaminas_tablero_areas, y, x, i, infoAlrededor_areas[5]);
							}
						}
					}
				}
			}
		}
	}
}

function f_buscaminas_obtener_tablero_info_alrededor(p_tablero, p_y, p_x){
	/*
		El array se forma a partir de las coordenadas.
		Se imagina que el número 5 es el centro (la casilla del tablero por la que se llama a esta función) (teclado numérico derecho)
		7 8 9
		4[5]6
		1 2 3
		Y el 0 se usa para saber en que lugar se encuentra:
		Norte:	Linea 0
		Sur:	Última línea
		Oeste:	Columna 0
		Este:	Última columna
		NorEste, SurEste, SurOeste, NorOeste:	Esquinas
		Centro: No se encuentra en ningún límite (Ni equinas ni paredes)
		
		Si es null quiere decir que no hay datos en esa dirección
	*/
	var infoAlrededor	= [null, null, null, null, null, null, null, null, null, null];
	var obtenerInfo;
	
	// Detectar si está en un borde
	if( p_x==0
		|| p_y==0
		|| p_x==(v_buscaminas_anchura -1)
		|| p_y==(v_buscaminas_altura -1)
	){
	// ___Esquinas___
		// esquina: NorEste
		if( p_x==(v_buscaminas_anchura -1) && p_y==0 ){
			obtenerInfo			= [2, 1, 4];
			infoAlrededor[0]	= "NorEste";
		
		// esquina: SurEste
		} else if( p_x==(v_buscaminas_anchura -1) && p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 4, 7];
			infoAlrededor[0]	= "SurEste";
		
		// esquina: SurOeste
		} else if( p_x==0 && p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 9, 6];
			infoAlrededor[0]	= "SurOeste";
		
		// esquina: NorOeste
		} else if( p_x==0 && p_y==0 ){
			obtenerInfo			= [6, 3, 2];
			infoAlrededor[0]	= "NorOeste";
		
	// ___Paredes___
		// pared: Norte
		} else if( p_y==0 ){
			obtenerInfo			= [6, 3, 2, 1, 4];
			infoAlrededor[0]	= "Norte";
		
		// pared: Este
		} else if( p_x==(v_buscaminas_anchura -1) ){
			obtenerInfo			= [8, 2, 1, 4, 7];
			infoAlrededor[0]	= "Este";
		
		// pared: Sur
		} else if( p_y==(v_buscaminas_altura -1) ){
			obtenerInfo			= [8, 9, 6, 4, 7];
			infoAlrededor[0]	= "Sur";
		
		// pared: Oeste
		} else if( p_x==0 ){
			obtenerInfo			= [8, 9, 6, 3, 2];
			infoAlrededor[0]	= "Oeste";
		}
	
	// Centro
	} else {
		obtenerInfo			= [8, 9, 6, 3, 2, 1, 4, 7];
		infoAlrededor[0]	= "Centro";
	}
	
	// Se obtienen los datos a partir de la tabla
	for( var i=0 ; i<obtenerInfo.length ; i++ ){
		switch(obtenerInfo[i]) {
			case 8: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x];		break;
			case 9: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x +1];	break;
			case 6: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y]	[p_x +1];	break;
			case 3: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x +1];	break;
			case 2: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x];		break;
			case 1: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y +1]	[p_x -1];	break;
			case 4: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y]	[p_x -1];	break;
			case 7: infoAlrededor[obtenerInfo[i]]	= p_tablero[p_y -1]	[p_x -1];	break;
		}
	}
	
	// Por último
	infoAlrededor[5]	= p_tablero[p_y][p_x];
	
	// Devuelve la tabla.
	// Todo null excepto los valores de alrededor
	// y la posición 0 para indicar el lugar en el que se encuentra.
	return infoAlrededor;
}

// 1. Identificar la bomba
// 2. Aumentar el número en cada dirección (8 direcciones)
// 2.1. No aumentar si hay una bomba (bomba: -1)
function f_buscaminas_datos_añadir_numeros(p_tablero){
	// Reiniciar la variable
	v_buscaminas_minas_total = 0;
	// Tablero
	var infoAlrededor;
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			infoAlrededor	= f_buscaminas_obtener_tablero_info_alrededor(p_tablero, y, x);
			
			// 1. Identificar la bomba
			if( infoAlrededor[5] == (-1) ){
				// Aumentar número total de bombas
				v_buscaminas_minas_total++;
				
				// Observa los alrededores
				for( var i=1 ; i<infoAlrededor.length ; i++ ){
					
					// Aumentar el número si es diferente de: Bomba o null(pared)
					if(infoAlrededor[i] != (-1)
						&& infoAlrededor[i] != null){
						
						// Segun la posición:
						// 7 8 9
						// 4[5]6
						// 1 2 3
						// Aumentar en esa dirección (5 es el centro)
						// Como el 5 es -1 que es una bomba, nunca entrará por aquí
						f_buscaminas_insertar_tablero_dato_enCoordenada(p_tablero, y, x, i, "++");
					}
				}
			}
		}
	}
	
	// No se ha introducido ninguna mina
	// Pondré mínimo 1
	if( v_buscaminas_minas_total == 0 ){
		p_tablero[aleatorio(0, v_buscaminas_altura -1)][aleatorio(0, v_buscaminas_anchura -1)] = -1;
		v_buscaminas_minas_total++;
	}
	v_buscaminas_banderas	= v_buscaminas_minas_total;
	
	// Añade banderas adicionales de 1 bandera a 3% extra de banderas de forma aleatoria
	// Evita que puedas saber el número e banderas poniendo todas y luego quitarlas
	v_buscaminas_banderas	= v_buscaminas_banderas + aleatorio(1, (10*10) *0.03);
}

// La coordenada la pueden pasar por número o por frase
/* __ Parametros __
	p_tablero:		Matriz a insertar el dato
	p_y:			Coordenada Y (coordenada que sube o baja filas)
	p_x:			Coordenada X (coordenada que cambia de columna)
	p_coordenada:	Explicado abajo (_ Coordenadas _)
	p_insertar:		1. Dato a insertar
					2. Si es "++" aumentará 1
*/
/* __ Coordenadas __
	NOTA: 5 == Centro
	Número:
		7 8 9
		4 5 6
		1 2 3
	
	Frase:
		NorOeste	Norte	NorEste
		Oeste		Centro	Este
		SurOeste	Sur		SurEste
*/
function f_buscaminas_insertar_tablero_dato_enCoordenada(p_tablero, p_y, p_x, p_coordenada, p_insertar){
	
	// Si el insertar es "++" quiere decir que solo quiere aumentar en esa dirección
	if(p_insertar == "++"){// LOOOOOOOOOOOOOOOL
		switch(p_coordenada){
			case "NorOeste":	case 7: p_tablero[p_y -1]	[p_x -1]++;	break;
			case "Norte":		case 8: p_tablero[p_y -1]	[p_x]++;	break;
			case "NorEste":		case 9: p_tablero[p_y -1]	[p_x +1]++;	break;
			case "Oeste":		case 4: p_tablero[p_y]		[p_x -1]++;	break;
			case "Centro":		case 5: p_tablero[p_y]		[p_x]++;	break;
			case "Este":		case 6: p_tablero[p_y]		[p_x +1]++;	break;
			case "SurOeste":	case 1: p_tablero[p_y +1]	[p_x -1]++;	break;
			case "Sur":			case 2: p_tablero[p_y +1]	[p_x]++;	break;
			case "SurEste":		case 3: p_tablero[p_y +1]	[p_x +1]++;	break;
		}
	
	// De lo contrario insertaré el dato pasado
	} else {
		switch(p_coordenada){
			case "NorOeste":	case 7: p_tablero[p_y -1]	[p_x -1]	= p_insertar; break;
			case "Norte":		case 8: p_tablero[p_y -1]	[p_x]		= p_insertar; break;
			case "NorEste":		case 9: p_tablero[p_y -1]	[p_x +1]	= p_insertar; break;
			case "Oeste":		case 4: p_tablero[p_y]		[p_x -1]	= p_insertar; break;
			case "Centro":		case 5: p_tablero[p_y]		[p_x]		= p_insertar; break;
			case "Este":		case 6: p_tablero[p_y]		[p_x +1]	= p_insertar; break;
			case "SurOeste":	case 1: p_tablero[p_y +1]	[p_x -1]	= p_insertar; break;
			case "Sur":			case 2: p_tablero[p_y +1]	[p_x]		= p_insertar; break;
			case "SurEste":		case 3: p_tablero[p_y +1]	[p_x +1]	= p_insertar; break;
		}
	}
}

// Según el tablero pasado le añade las bombas
function f_buscaminas_datos_añadir_bombas(p_tablero){
	// Recorre todo el tablero añadiendo o no una bomba por celda.
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		for( var x=0 ; x<v_buscaminas_anchura ; x++ ){
			p_tablero[y][x]	= f_buscaminas_bomba_añadir();
		}
	}
}

function f_buscaminas_bomba_añadir(){
	// 5% → muy fácil
	// 8% → fácil
	var alea = aleatorio(1, 100);
	
	if( 1<=alea && alea<=v_buscaminas_dificultad ){
		return (-1);
	} else {
		return 0;
	}
}

// Prepara los datos del buscaminas antes de añadir los datos
// Es necesari preparar el tablero con la nueva configuración
function f_buscaminas_datos_crear(){
	// crear tablas de datos e imagenes
	v_buscaminas_tablero_datos		= f_buscaminas_obtener_tablero_vacio();
	v_buscaminas_tablero_imagenes	= f_buscaminas_obtener_tablero_vacio();
	v_buscaminas_tablero_areas		= f_buscaminas_obtener_tablero_vacio();
}

// Crea la plantilla de los tableros
function f_buscaminas_obtener_tablero_vacio(){
	
	// creamos la altura del tablero (filas)
	var tablero = new Array(v_buscaminas_altura);
	
	// y ahora las filas
	for( var y=0 ; y<v_buscaminas_altura ; y++ ){
		tablero[y]	= new Array(v_buscaminas_anchura);
	}
	
	// Devolvemos el tablero creado vacío
	return tablero;
}

function f_buscaminas_configuracion_inicial(){
	f_buscaminas_configuracion_inicial_menu();
	f_buscaminas_configuracion_inicial_estructura();
	
}

// Crea la estructura inicial del Buscaminas
function f_buscaminas_configuracion_inicial_estructura(){
	$("body").append(
		"<h1>Buscaminas</h1>"+
		"<div id=\"buscaminas\"></div>"
	);
}

// Actualizar datos iniciales del menú
function f_buscaminas_configuracion_inicial_menu(){
	$("#menu_anchura .dato").text(v_buscaminas_anchura);
	$("#menu_altura .dato").text(v_buscaminas_altura);
	$("#menu_dificultad .dato").text(v_buscaminas_dificultad);
}