/*
	Descripción de la práctica
	• 
*/
document.oncontextmenu = function(){return false;}

	var ancho			= parseInt(10);		// anchura del buscaminas
	var alto			= parseInt(10);		// altura del buscaminas
	var dificultad = 15;
	var musica			= true;
	
	var tableroDatos;
	var tableroImg;
	var totalMinas		= 0;
	var banderasSinUsar	= 0;
	var minasPorAsegurar = 0;
	var ganador			= false;
	var perdedor		= false;


function Buscaminas(nAncho, nAlto, nDificultad)
{
	ancho = nAncho;
	alto = nAlto;
	dificultad = nDificultad
	tableroDatos	= crearTablero();
	tableroImg		= crearTablero();
	
	añadirBombas(tableroDatos);
	añadirNumeros(tableroDatos);
	añadirImagenes(tableroImg);
	
	imprimirTablero(tableroImg);
}
function NuevoJuego(nuevoAncho, nuevoAlto, nuevaDificultad)
{
	if(nuevoAncho < 2)
	{ nuevoAncho = 2; }
	
	if(nuevoAlto < 2)
	{ nuevoAlto = 2; }
	
	if(nuevaDificultad < 1)
	{ nuevaDificultad = 1; }
	
	else if(nuevaDificultad > 100)
	{ nuevaDificultad = 100; }
	
	document.write("<head>");
		document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\".\\CSS\\Buscaminas.css\"/>");
		
		document.write("<script type=\"text/javascript\" src=\".\\Javascript\\JQuery.js\"></script>");
		document.write("<script type=\"text/javascript\" src=\".\\Javascript\\Buscaminas.js\"></script>");
		
		document.write("<link rel=\"stylesheet\" href=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">");
		document.write("<script src=\"http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js\"></script>");
	document.write("</head>");
	document.write("<body>");
	// añade los documentos.
	
	
	document.write("<div class=\"container\">");
		fondo();
		Menú();
		Buscaminas(nuevoAncho, nuevoAlto, nuevaDificultad);
	document.write("</div>");
	document.write("<audio id=\"musicaExplosion\" src=\"./Sonidos/explosión.mp3\" preload=\"auto\"></audio>");
	document.write("<audio id=\"musicaFondo1\" src=\"./Sonidos/musica1.mp3\" preload=\"auto\"></audio>");
	document.write("<audio id=\"musicaFondo2\" src=\"./Sonidos/musica2.mp3\" preload=\"auto\"></audio>");
	document.write("<audio id=\"musicaFondo3\" src=\"./Sonidos/musica3.mp3\" preload=\"auto\"></audio>");
	document.write("<audio id=\"musicaPerdedor\" src=\"./Sonidos/perdedor.mp3\" preload=\"auto\"></audio>");
	document.write("<audio id=\"musicaGanador\" src=\"./Sonidos/ganador.mp3\" preload=\"auto\"></audio>");
	document.write("</body>");
	// problema con Mozilla y Edge
	// Funciona perfecto para chrome
	document.close();
	
}
function fondo()
{
	document.write("<div id=\"fondo\">");
	document.write("<img src=\".\\Imgs\\Fondo.jpg\" class=\"ajustar\"/>");
	document.write("</div>");
}

function Menú()
{
	document.write("<div id=\"configuraciónTitulo\">");
		document.write("<button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">⚙</button>");
		document.write("<span class=\"titulo\">Buscaminas</span>");
	document.write("</div>");
	
	document.write("<div class=\"modal fade\" id=\"myModal\" role=\"dialog\">");
		document.write("<div class=\"modal-dialog modal-sm\">");
			document.write("<div class=\"modal-content\">");
				
				document.write("<div class=\"contenedorMenu\">");
					document.write("<div class=\"modal-header\">");
						document.write("<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>");
						document.write("<h4 class=\"modal-title\">Nueva partida</h4>");
					document.write("</div>");
					
					document.write("<div class=\"modal-body\">");
						document.write("Tamaño: <input id=\"tamañoX\" type=\"number\" name=\"quantity\" value=\"10\" min=\"2\">");
						document.write(" x <input id=\"tamañoY\" type=\"number\" name=\"quantity\" value=\"10\" min=\"2\">");
						document.write("<br/>Dificultad (%): <input id=\"dificultad\" type=\"number\" name=\"quantity\" value=\"15\" min=\"1\" max=\"100\">");
						document.write("<br/><button onclick=\"Musica()\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"><span id=\"musicaIcono\">🔈</span></button>");
					document.write("</div>");
					
					document.write("<div class=\"modal-footer\">");
						document.write("<button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" onclick=\"NuevoJuego(");
																															document.write("document.getElementById('tamañoX').value,");
																															document.write("document.getElementById('tamañoY').value,");
																															document.write("document.getElementById('dificultad').value");
																														document.write(")");
						document.write("\">Aceptar</button>");
						document.write("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>");
					document.write("</div>");
				document.write("</div>");
			document.write("</div>");
		document.write("</div>");
	document.write("</div>");
}
	
	// CALCULAR X e Y del id
		//Math.ceil(2.3) = 3;
		//Math.floor(2.6) = 2;
	// en las funciones debo poner cada vez el ancho y el alto
	// por si el tablero no es cuadrado
	
	
	
	
	//imprimirTablero(tableroDatos, ancho, alto);
function hasGanado()
{
	var yx;
	for(var y=0 ; y<alto ; y++ )
	{
		for( var x=0 ; x<ancho ; x++ )
		{
			yx = y +"-"+ x;
			if( $("#"+ yx +"").find('img').attr("src") == ".\\Imgs\\clickMe.png" )
			{
				revelarSinMina(parseInt(y), parseInt(x));			//Centro
			}
			else if( $("#"+ yx +"").find('img').attr("src") == ".\\Imgs\\bandera.png" )
			{
				$("#"+ yx +"").find('img').attr("src", ".\\Imgs\\minaOK.png");
			}
		}
	}
}
function hasPerdido()
{
	var yx;
	for(var y=0 ; y<alto ; y++ )
	{
		for( var x=0 ; x<ancho ; x++ )
		{
			yx = y +"-"+ x;
			
			if($("#"+ yx +"").find('img').attr("src") == ".\\Imgs\\clickMe.png"
				&& tableroDatos[y][x] == -1)
			{ $("#"+ yx +"").find('img').attr("src", ".\\Imgs\\mina.png"); }
			else
			{
				revelarSinMina(parseInt(y), parseInt(x));			//Centro
			}
		}
	}
}

function añadirImagenes(nTablero)
{
	for( var y=0 ; y<alto ; y++ )
	{
		for( var x=0 ; x<ancho ; x++ )
		{
			nTablero[y][x] = "<img src=\".\\Imgs\\clickMe.png\"/>";
		}
	}
}

// creando el tablero (debe ser vacío) = pasar matriz vacía
function crearTablero()
{
	var nTablero = new Array(ancho);
	var y;
	
	// filas
	for( y=0 ; y<alto ; y++ )
	{	
		nTablero[y] = new Array(alto);
	}
	
	return nTablero;
}

function añadirBombas(nTablero)
{
	for( var y=0 ; y<alto ; y++ )
	{
		for( var x=0 ; x<ancho ; x++ )
		{
			nTablero[y][x] = añadirBomba();
		}
	}
}

function añadirBomba()
{
/*
	5% → muy fácil
	8% → fácil
*/
	// aleatorio de 1 a 100 = ((0→99) +1)
	var aleatorio = parseInt(Math.round(Math.random() * (100 - 1) + 1));
	
	if( 1<=aleatorio && aleatorio<=dificultad )
	{
		return (-1);
	}
	else
	{
		return 0;
	}
}

function añadirNumeros(nTablero)
{
//Maxima x = ancho
//Maxima y = alto
// Minima x e y = 0
//1. Identificar bomba.
//2. Añadir +1 en cada dirección de la bomba
//2.1 No añadir si hay bomba en esa dirección
	for( var y=0 ; y<alto ; y++ )
	{
		for( var x=0 ; x<ancho ; x++ )
		{
			if(nTablero[y][x] == (-1))
			{
				totalMinas++;
				
				// bordes
				if( x == 0 || y == 0 || x == (ancho -1) || y == (alto -1))
				{
				// ___Esquinas___
					// esquina NorOeste
					if(x == 0 && y == 0)
					{
						if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
						if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
						if(nTablero[y +1]	[x +1]	!= (-1)){ nTablero[y +1][x +1]++; }	// SurEste
					}
					// esquina NorEste
					else if(x == (ancho -1) && y == 0)
					{
						if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
						if(nTablero[y +1]	[x -1]	!= (-1)){ nTablero[y +1][x -1]++; }	// SurOeste
						if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
					}
					// esquina SurOeste
					else if(x == 0 && y == (alto -1))
					{
						if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
						if(nTablero[y -1]	[x +1]	!= (-1)){ nTablero[y -1][x +1]++; }	// NorEste
						if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
					}
					// esquina SurEste
					else if(x == (ancho -1) && y == (alto -1))
					{
						if(nTablero[y -1]	[x -1]	!= (-1)){ nTablero[y -1][x -1]++; }	// NorOeste
						if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
						if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
					}
				// ___Paredes___ (no esquinas)
					// pared Norte
					else if(y == 0)
					{
						if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
						if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
						if(nTablero[y +1]	[x -1]	!= (-1)){ nTablero[y +1][x -1]++; }	// SurOeste
						if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
						if(nTablero[y +1]	[x +1]	!= (-1)){ nTablero[y +1][x +1]++; }	// SurEste
					}
					// pared Oeste
					else if(x == 0)
					{
						if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
						if(nTablero[y -1]	[x +1]	!= (-1)){ nTablero[y -1][x +1]++; }	// NorEste
						if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
						if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
						if(nTablero[y +1]	[x +1]	!= (-1)){ nTablero[y +1][x +1]++; }	// SurEste
					}
					// pared Este
					else if(x == (ancho -1))
					{
						if(nTablero[y -1]	[x -1]	!= (-1)){ nTablero[y -1][x -1]++; }	// NorOeste
						if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
						if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
						if(nTablero[y +1]	[x -1]	!= (-1)){ nTablero[y +1][x -1]++; }	// SurOeste
						if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
					}
					// pared Sur
					else if(y == (alto -1))
					{
						if(nTablero[y -1]	[x -1]	!= (-1)){ nTablero[y -1][x -1]++; }	// NorOeste
						if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
						if(nTablero[y -1]	[x +1]	!= (-1)){ nTablero[y -1][x +1]++; }	// NorEste
						if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
						if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
					}
				}
				else
				{// resto
					if(nTablero[y -1]	[x -1]	!= (-1)){ nTablero[y -1][x -1]++; }	// NorOeste
					if(nTablero[y -1]	[x]		!= (-1)){ nTablero[y -1][x]++; }	// Norte
					if(nTablero[y -1]	[x +1]	!= (-1)){ nTablero[y -1][x +1]++; }	// NorEste
					if(nTablero[y]		[x -1]	!= (-1)){ nTablero[y]	[x -1]++; }	// Oeste
					if(nTablero[y]		[x +1]	!= (-1)){ nTablero[y]	[x +1]++; }	// Este
					if(nTablero[y +1]	[x -1]	!= (-1)){ nTablero[y +1][x -1]++; }	// SurOeste
					if(nTablero[y +1]	[x]		!= (-1)){ nTablero[y +1][x]++; }	// Sur
					if(nTablero[y +1]	[x +1]	!= (-1)){ nTablero[y +1][x +1]++; }	// SurEste
				}
				
			}
		}
	}
	banderasSinUsar = totalMinas;
	minasPorAsegurar = totalMinas;
}

function imprimirTablero(nTablero)
{
	document.write("<table>");
		// sin <caption>
		// sin <thead>
		
		document.write("<caption><img src=\".\\Imgs\\caraIniciar.png\"/></caption>");
		document.write("<tbody>");

			for( var y=0 ; y<alto ; y++ )
			{
				document.write("<tr>");
					for( var x=0 ; x<ancho ; x++ )
					{
						document.write("<td id=\""+ y +"-"+ x +"\">"+ nTablero[y][x] +"</td>");
					}
				document.write("</tr>");
			}
			
		document.write("</tbody>");
	document.write("</table>");
}




									/*
		  ╔════════════╗
		  ║   JQuery   ║
	┌──╦┐ ╠────────────╣ ┌╦──────┐
	│  ╚══╝            ╚══╝      │
	│ A partir de aquí es JQuery │
	└────────────────────────────┘	*/
// tiempo:
function caraSorpresa()
{
	if($("caption").children('img').attr("src") != ".\\Imgs\\caraPerdedor.png"
		&& $("caption").children('img').attr("src") != ".\\Imgs\\caraGanador.png")
	{
		$("caption").children('img').attr("src", ".\\Imgs\\caraIniciar.png");
	}
}
// si gana su cara cambia a la de ganador
function caraGanador()
{
	$("caption").children('img').attr("src", ".\\Imgs\\caraGanador.png");
	document.getElementById('musicaGanador').play();
}
function caraPerdedor()
{
	// apagar musica
	musica = true;
	Musica();
	
	document.getElementById('musicaExplosion').play();
	$("caption").children('img').attr("src", ".\\Imgs\\caraPerdedor.png");
	document.getElementById('musicaPerdedor').play();
	musica = true;
}
function caraHay()
{
	if($("caption").children('img').attr("src") != ".\\Imgs\\caraPerdedor.png"
		&& $("caption").children('img').attr("src") != ".\\Imgs\\caraGanador.png")
	{
		$("caption").children('img').attr("src", ".\\Imgs\\caraIniciar.png");
		
	}
}
function Musica()
{
	if(musica == true)
	{
		document.getElementById('musicaFondo1').pause();
		document.getElementById('musicaFondo2').pause();
		document.getElementById('musicaFondo3').pause();
		document.getElementById('musicaPerdedor').pause();
		$("#musicaIcono").text("🔊");
		musica = false;
	}
	else if(musica == false)
	{
		document.getElementById('musicaFondo1').play();
		document.getElementById('musicaFondo2').play();
		document.getElementById('musicaFondo3').play();
		$("#musicaIcono").text("🔈");
		musica = true;
	}
}
$(document).ready(function(){
	document.getElementById('musicaFondo1').play();
	document.getElementById('musicaFondo2').play();
	document.getElementById('musicaFondo3').play();
	// donde click
		$("td").click(clickBomba);
		
		$("caption").children('img').click(clickHombre);
		
		$("td").mousedown(function(boton) //Right click
		{
			if(boton.which == 3 && ganador == false && perdedor == false) //1: izquierda, 2: central, 3: derecha
			{	
				if( $(this).children('img').attr('src') == ".\\Imgs\\clickMe.png")
				{
					// comprueba el número de banderas que le queda.
					if(banderasSinUsar > 0)
					{
						banderasSinUsar--;
						$(this).children('img').attr('src', ".\\Imgs\\bandera.png");
						
						var identificador = $(this).attr("id");
						//primer caracter del id
						
						//identificar x e y
						var y = identificador.substr(0, 1);
						var x;
						var cambioYX = false;
						
						for( var posiciónID=1 ; posiciónID<identificador.substr().length ; posiciónID++ )
						{	if(cambioYX == false)
							{	if(identificador.substr(posiciónID, 1) == "-")
								{
									cambioYX = true;
									posiciónID++;
									x = identificador.substr(posiciónID, 1);
								}
								
								else
								{ y = y + identificador.substr(posiciónID, 1); }
							}
							
							else
							{ x = x + identificador.substr(posiciónID, 1); }
						}
						//final identificar x e y
						
						if(tableroDatos[y][x] == -1)
						{
							minasPorAsegurar--;
							if(minasPorAsegurar == 0)
							{
								$("caption").children('img').attr("src", ".\\Imgs\\caraOoh.png");
								setTimeout("caraGanador()", 750);
								ganador = true;
								hasGanado();
							}
						}
					}
					else
					{ alert("Ya no te quedan banderas"); }
				}
				else if( $(this).children('img').attr('src') == ".\\Imgs\\bandera.png")
				{
					// identifica si hay una mina al poner la bandera en la casilla.
					var identificador = $(this).attr("id");
					//primer caracter del id
					//identificar x e y
					var y = identificador.substr(0, 1);
					var x;
					var cambioYX = false;
					
					for( var posiciónID=1 ; posiciónID<identificador.substr().length ; posiciónID++ )
					{	if(cambioYX == false)
						{	if(identificador.substr(posiciónID, 1) == "-")
							{
								cambioYX = true;
								posiciónID++;
								x = identificador.substr(posiciónID, 1);
							}
							
							else
							{ y = y + identificador.substr(posiciónID, 1); }
						}
						
						else
						{ x = x + identificador.substr(posiciónID, 1); }
					}
					$(this).children('img').attr('src', ".\\Imgs\\clickMe.png");
					banderasSinUsar++;
					if(tableroDatos[y][x] == -1)
					{
						minasPorAsegurar++;
					}
				}
			}
		})
});
function clickHombre()
{
	if($("caption").children('img').attr("src") == ".\\Imgs\\caraIniciar.png")
	{
		$("caption").children('img').attr("src", ".\\Imgs\\caraHay.png");
		setTimeout("caraHay()", 250);
	}
}
function clickBomba()
{
	if(ganador == false && perdedor == false)
	{
		if(minasPorAsegurar == 0 && banderasSinUsar == 0)
		{
			$("caption").children('img').attr("src", ".\\Imgs\\caraOoh.png");
			setTimeout("caraGanador()", 750);
			ganador = true;
			hasGanado();
		}
		else
		{
			// Muestra una expresión de sorpresa si su cara es normal
			if($("caption").children('img').attr("src") == ".\\Imgs\\caraIniciar.png")
			{
				$("caption").children('img').attr("src", ".\\Imgs\\caraOoh.png");
				setTimeout("caraSorpresa()", 1000);
			}
			var identificador = $(this).attr("id");
			//primer caracter del id
			//identificar x e y
			var y = identificador.substr(0, 1);
			var x;
			var cambioYX = false;
			
			for( var posiciónID=1 ; posiciónID<identificador.substr().length ; posiciónID++ )
			{	if(cambioYX == false)
				{	if(identificador.substr(posiciónID, 1) == "-")
					{
						cambioYX = true;
						posiciónID++;
						x = identificador.substr(posiciónID, 1);
					}
					
					else
					{ y = y + identificador.substr(posiciónID, 1); }
				}
				
				else
				{ x = x + identificador.substr(posiciónID, 1); }
			}
			
			if($(this).children('img').attr("src") != ".\\Imgs\\bandera.png")
			{
				if(tableroDatos[y][x] == -1)
				{
					$("caption").children('img').attr("src", ".\\Imgs\\caraOoh.png");
					setTimeout("caraPerdedor()", 250);
					$(this).children('img').attr("src", ".\\Imgs\\minaClick.png");
					
					perdedor = true;
					hasPerdido();
					
				}
				else if(tableroDatos[y][x]>0)
				{
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
				}
				// ___Esquinas___
					// esquina NorOeste
				else if(x == 0 && y == 0)
				{
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
					revelarSinMina((parseInt(y) +1), (parseInt(x) +1));	//SurEste
				}
					// esquina NorEste
				else if(x == (ancho -1) && y == 0)
				{
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina((parseInt(y) +1), (parseInt(x) -1));	//SurOeste
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
				}
					// esquina SurOeste
				else if(x == 0 && y == (alto -1))
				{
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina((parseInt(y) -1), (parseInt(x) +1));	//NorEste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
				}
					// esquina SurEste
				else if(x == (ancho -1) && y == (alto -1))
				{
					revelarSinMina((parseInt(y) -1), (parseInt(x) -1));	//NorOeste
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
				}
				// ___Paredes___ (no esquinas)
					// pared Norte
				else if(y == 0)
				{
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
					revelarSinMina((parseInt(y) +1), (parseInt(x) -1));	//SurOeste
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
					revelarSinMina((parseInt(y) +1), (parseInt(x) +1));	//SurEste
				}
					// pared Oeste
				else if(x == 0)
				{
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina((parseInt(y) -1), (parseInt(x) +1));	//NorEste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
					revelarSinMina((parseInt(y) +1), (parseInt(x) +1));	//SurEste
				}
					// pared Este
				else if(x == (ancho -1))
				{
					revelarSinMina((parseInt(y) -1), (parseInt(x) -1));	//NorOeste
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina((parseInt(y) +1), (parseInt(x) -1));	//SurOeste
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
				}
					// pared Sur
				else if(y == (alto -1))
				{
					revelarSinMina((parseInt(y) -1), (parseInt(x) -1));	//NorOeste
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina((parseInt(y) -1), (parseInt(x) +1));	//NorEste
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
				}
				else
				{
					revelarSinMina((parseInt(y) -1), (parseInt(x) -1));	//NorOeste
					revelarSinMina((parseInt(y) -1), parseInt(x));		//Norte
					revelarSinMina((parseInt(y) -1), (parseInt(x) +1));	//NorEste
					revelarSinMina(parseInt(y), (parseInt(x) -1));		//Oeste
					revelarSinMina(parseInt(y), parseInt(x));			//Centro
					revelarSinMina(parseInt(y), (parseInt(x) +1));		//Este
					revelarSinMina((parseInt(y) +1), (parseInt(x) -1));	//SurOeste
					revelarSinMina((parseInt(y) +1), parseInt(x));		//Sur
					revelarSinMina((parseInt(y) +1), (parseInt(x) +1));	//SurEste
				}
			}
		}
	}
}
function revelarSinMina(idY, idX)
{
	var numID = idY +"-"+ idX;
	
	if($("#"+ numID +"").find('img').attr("src") != ".\\Imgs\\bandera.png")
	{
		//identificar x e y
		if(tableroDatos[idY][idX] == 0)
		{
			$("#"+ numID +"").find('img').attr("src", ".\\Imgs\\nada.png");
		}
		
		else if(tableroDatos[idY][idX] == 1)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\1.png"); }
		
		else if(tableroDatos[idY][idX] == 2)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\2.png"); }
		
		else if(tableroDatos[idY][idX] == 3)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\3.png"); }
		
		else if(tableroDatos[idY][idX] == 4)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\4.png"); }
		
		else if(tableroDatos[idY][idX] == 5)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\5.png"); }
		
		else if(tableroDatos[idY][idX] == 6)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\6.png"); }
		
		else if(tableroDatos[idY][idX] == 7)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\7.png"); }
		
		else if(tableroDatos[idY][idX] == 8)
		{ $("#"+ numID +"").find('img').attr("src", ".\\Imgs\\8.png"); }
	}
}

//%(this).attr("id"); /10 %10