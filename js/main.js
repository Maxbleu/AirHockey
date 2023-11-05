window.onload = function() {

	const LIMITELADOIZQUIERDO = 13;
	const LIMITELADODERECHO = 295;
	const LIMITEARRIBA = 298;
	const LIMITEABAJO = 515;

	const LIMITEPORTERIAPARTEIZQUIERDA = 123;
	const LIMITEPORTERIAPARTEDERECHA = 257;
	const LIMITEPORTERIAABAJO = 585;

	const MOVIMIENTOS = {
		IZQUIERDA : 37,
		ARRIBA : 38,
		DERECHA : 39,
		ABAJO : 40
	};

	let arriba = false;
	let abajo = false;
	let izquierda = false;
	let derecha = false;

	let idAnimacionHockey;
	let idAnimacionAbrirCerrarBoca;

	let ctx;
	let canvas;

	let posicionAnimacionComecocos = 0;

	let hockeyElements = [];

	let puckComeCocos;
	let stickIA;
	let stickUser;


	function PuckComeCocos(x_,y_){

		this.x = x_;
		this.y = y_;

		this.animacionesComecocosCoords = [[0,1],[32,1]];
		this.anchura = 29;
		this.altura = 29;

	}


	function StickHockey(x_, y_){

		this.x = x_;
		this.y = y_;

		this.skinCoords = [524,111];
		this.anchura = 72;
		this.altura = 71;
		this.velocidad = 5;

	}


	/**
	 * Este método se encarga de comprobar si el usuario 
	 */
	function realizarMovimientoDelUsuario(){
		if(izquierda && stickUser.x > LIMITELADOIZQUIERDO){
			stickUser.x -= stickUser.velocidad;
		}
		if(arriba && stickUser.y > LIMITEARRIBA){
			stickUser.y -= stickUser.velocidad;
		}
		if(derecha && stickUser.x < LIMITELADODERECHO){
			stickUser.x += stickUser.velocidad;
		}
		if(abajo && stickUser.y < LIMITEABAJO){
			stickUser.y += stickUser.velocidad;
		}
	}


	function generarAnimacionHockey() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(StickHockey.prototype.asset,0,0,380,598,0,0,380,598);

		//	realizar movimiento del usuario
		realizarMovimientoDelUsuario();

		//	Cargamos los elementos del canvas
		for(let iterador = 0; iterador<hockeyElements.length; iterador++){
			
			//	Comprobamos cual de los elementos en la lista es el puck
			let assetsCoords;
			if(hockeyElements[iterador].constructor.name === "PuckComeCocos"){

				//	Obtenemos las coordenadas de la animación en el sprite
				assetsCoords = hockeyElements[iterador].animacionesComecocosCoords[posicionAnimacionComecocos];
			}else{

				//	Obtenemos las coordernadas del stick de hockey en el asset
				assetsCoords = hockeyElements[iterador].skinCoords;
			}

			//	Pintamos el elemento en el canvas
			ctx.drawImage
			(
				hockeyElements[iterador].asset,
				assetsCoords[0],
				assetsCoords[1],
				hockeyElements[iterador].anchura,
				hockeyElements[iterador].altura,
				hockeyElements[iterador].x,
				hockeyElements[iterador].y,
				hockeyElements[iterador].anchura,
				hockeyElements[iterador].altura
			)
		}
	}


	/**
	 * Este método se encarga de modificar a donde apuntamos 
	 * dentro del array de animaciones del comecocos
	 */
	function abrirCierraBoca(){
		posicionAnimacionComecocos = (posicionAnimacionComecocos + 1) % 2;
	}


	/**
	 * Este método se encarga de activar 
	 * la tecla que ha pulsado el usuario
	 * @param {event} event 
	 */
	function activarTeclaPulsada(event) {
        switch (event.keyCode) {
		
			case MOVIMIENTOS.IZQUIERDA: 
					izquierda = true;
				break;

			case MOVIMIENTOS.ARRIBA:
					arriba = true;
				break;

			case MOVIMIENTOS.DERECHA:
					derecha = true;
				break;
			
			case MOVIMIENTOS.ABAJO:
					abajo = true;
				break;
		}
	}

	/**
	 * Este método se encarga de desactivar
	 * la tecla que ha pulsado el usuario
	 * @param {event} event 
	 */
	function desactivarTeclaPulsada(event){
		switch (event.keyCode) {
		
			case MOVIMIENTOS.IZQUIERDA: 
					izquierda = false;
				break;

			case MOVIMIENTOS.ARRIBA:
					arriba = false;
				break;

			case MOVIMIENTOS.DERECHA:
					derecha = false;
				break;
			
			case MOVIMIENTOS.ABAJO:
					abajo = false;
				break;
		}
	}


	/**
	 * Este método se encarga de configurar los elementos de 
	 * la aplicación necesarios para que comienze el juego
	 */
	function init(){
		// Localizamos el canvas
		canvas = document.getElementById("miCanvas");
		
		// Generamos el contexto de trabajo
		ctx = canvas.getContext("2d");

		//	Cargamos el asset del stick de hockey
		let assetsHockey = new Image();
		assetsHockey.src="assets/assetsHockey.png";
		StickHockey.prototype.asset = assetsHockey;

		//	Cargamos el sprite de comecocos
		let spriteComecocos = new Image();
		spriteComecocos.src="sprite/spriteComecocos.png";
		PuckComeCocos.prototype.asset = spriteComecocos;

		//	Creamos los elementos del canvas

		//	Elemento puck
		puckComeCocos = new PuckComeCocos(176,290);

		//	Elementos sticks
		stickUser = new StickHockey(155,500);

		stickIA = new StickHockey(155,40);

		hockeyElements.push(puckComeCocos,stickUser,stickIA);

		//	Iniciamos el juego
		startGame();
	}


	/**
	 * Este método se encarga de iniciar el funcionamiento del juego
	 */
	function startGame(){
		//	Lanzamos la animación
		idAnimacionHockey = setInterval(generarAnimacionHockey, 1000/50);
		
		//	Animación encargada de abrir y cerra la boca
		idAnimacionAbrirCerrarBoca = setInterval(abrirCierraBoca, 1000/8);
	}







	
	//	MAIN

	//	Establecemos los eventos necesarios para detectar 
	//	cuando pulsamos y levantamos el dedo de una tecla

	document.addEventListener("keydown", activarTeclaPulsada, false);
	document.addEventListener("keyup", desactivarTeclaPulsada, false);
	
	//	Configuramos la aplicación

	init();
}