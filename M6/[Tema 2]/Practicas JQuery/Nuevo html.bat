@echo off
title ® Creando pr ctica ¯
mode con lines=6
mode con cols=37
cls
echo.&echo.
echo É Nombre de la pr ctica
set /P pra= ÈÍÍÍ¯ 

mkdir "%pra%"
cd "%pra%"
mkdir CSS Imgs Javascript JQuery
cd ..

rem HTML
	copy "[Crear practica]\Nombre.html" "%pra%\%pra%.html" >nul
	
	setlocal DisableDelayedExpansion
	 
	set BUILDIR=".\%pra%"
	set INTEXTFILE="%pra%.html"

	set OUTTEXTFILE=otroHTML.html
	set SEARCHTEXT=Nombre
	set VER=%pra%
	set OUTPUTLINE=
	set reemplazando="html"
	goto reemplazar
pause

:continuarCSS
rem CSS
	copy "[Crear practica]\CSS\Nombre.css" "%pra%\CSS\%pra%.css" >nul
	copy "[Crear practica]\CSS\colores.css" "%pra%\CSS\colores.css" >nul

rem Imgs
	copy "[Crear practica]\Imgs\cargando.gif" "%pra%\Imgs\cargando.gif" >nul

rem Javascript y Jquery
	copy "[Crear practica]\Javascript\Nombre.js" "%pra%\Javascript\%pra%.js" >nul
	copy "[Crear practica]\JQuery\JQuery.js" "%pra%\JQuery\JQuery.js" >nul
	copy "[Crear practica]\Javascript\Javascript - Metodos de ayuda.js" "%pra%\Javascript\Javascript - Metodos de ayuda.js" >nul

rem Finalizar	
	goto finalizar

rem (por si lo necesito más de una vez, pero en este caso no)
:reemplazar
	for /f "tokens=1,* delims=¶" %%A in ( '"type %BUILDIR%\%INTEXTFILE%"') do (
		SET string=%%A
		setLocal EnableDelayedExpansion
		SET modified=!string:%SEARCHTEXT%=%VER%!
	    echo.!modified! >> %BUILDIR%\%OUTTEXTFILE%
		endlocal
	)
	 
	del %BUILDIR%\%INTEXTFILE%
	rename %BUILDIR%\%OUTTEXTFILE% %INTEXTFILE%
	
	if %reemplazando% == "html" (
		goto continuarCSS
	) else (
		goto finalizar
	)

:finalizar
	exit