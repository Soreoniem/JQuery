$(document).ready(function(){
	f_rellenarNav();
	$("nav>a")
		.mouseenter(f_nav_a_enter)
		.mouseleave(f_nav_a_exit);
});

function f_nav_a_enter(){
	$("nav>a").css("width", "Calc("+ (60 / (climas.length - 1)) +"% - 20px - 6px)");
	$(this).css("width", "Calc(40% - 20px - 6px)");
}

function f_nav_a_exit(){
	$("nav>a").css("width", "Calc(20% - 20px - 6px)");
}

function f_rellenarNav(){
	vf_nav	= $("nav");
	for( i=0 ; i<climas.length ; i++ ){
		vf_nav.append(
			"<a href=\""+ climas[i][1] +"\">"
				+"<img src=\"./Imgs/"+ climas[i][0] +".png\" alt=\""+ f_capitalizar(climas[i][0]) +"\"/>"
				+"<span>"
					+ f_capitalizar(climas[i][0])
					+"<span>"
						+"Intro text..."
					+"</span>"
					+"<span>"
						+"More text to be shown on hover"
					+"</span>"
				+"</span>"
			+"</a>"
		);
	}
}

function f_capitalizar(p_texto){
	return p_texto.charAt(0).toUpperCase() + p_texto.toLowerCase().slice(1);
}