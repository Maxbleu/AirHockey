window.onload = function() {

	const LIMITELADOIZQUIERDO = 13;
	const LIMITELADODERECHO = 295;
	const LIMITEMEDIOCAMPO = 298;
	const LIMITEABAJO = 515;

	const LIMITEARRIBA = 13;

	//const LIMITEPORTERIAPARTEIZQUIERDA = 123;
	//const LIMITEPORTERIAPARTEDERECHA = 257;
	//const LIMITEPORTERIAABAJO = 585;

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
	let idDesplazarPuck;

	let ctx;
	let canvas;

	let posicionAnimacionComecocos = 0;

	let hockeyElements;

	let puckComeCocos;
	let stickIA;
	let stickUser;

	/**
	 * Esta función se encarga de detectar si hay una 
	 * colisión entre unos de los sticks y el disco 
	 * @param {Object} stick 
	 * @returns {boolean}
	 */
	function detectarColisionEntrePuckStick(stick){
		let resultadoDistanciaPuckyStickEnX = Math.pow((stick.x - puckComeCocos.x),2);
		let resultadoDistanciaPuckyStickEnY = Math.pow((stick.y - puckComeCocos.y),2);

		let distanciaEntreElementos = Math.sqrt(resultadoDistanciaPuckyStickEnX + resultadoDistanciaPuckyStickEnY);
		let sumaRadiosPuckyStick = stick.radio() + puckComeCocos.radio();
		if (distanciaEntreElementos<sumaRadiosPuckyStick) {
			return true;
		} 
		return false;
	}

	function desplazarPuck(){
		puckComeCocos.y -= puckComeCocos.velocidad;
	}

	function generarAnimacionHockey() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(StickHockey.prototype.asset,0,0,380,598,0,0,380,598);

		//	realizar movimiento del usuario
		if(izquierda && stickUser.x > LIMITELADOIZQUIERDO){
			stickUser.x -= stickUser.velocidad;
		}
		if(arriba && stickUser.y > LIMITEMEDIOCAMPO){
			stickUser.y -= stickUser.velocidad;
		}
		if(derecha && stickUser.x < LIMITELADODERECHO){
			stickUser.x += stickUser.velocidad;
		}
		if(abajo && stickUser.y < LIMITEABAJO){
			stickUser.y += stickUser.velocidad;
		}
		
		//	Comprobamos si el puck ha colisionado con uno de los sticks
		if(detectarColisionEntrePuckStick(stickUser)){

			//	Lanzamos un setTimeout durante 3 segundos modificaremos la posición
		
		}

		//	Comprobamos si ha el disco está entre los límites del canvas
		if(puckComeCocos.x < LIMITELADOIZQUIERDO){
			puckComeCocos.x += puckComeCocos.velocidad;
		}
		if(puckComeCocos.y < LIMITEARRIBA){
			puckComeCocos.y += puckComeCocos.velocidad;
		}
		if(puckComeCocos.x > LIMITELADODERECHO){
			puckComeCocos.x -= puckComeCocos.velocidad;
		}
		if(puckComeCocos.y > LIMITEABAJO){
			puckComeCocos.y -= puckComeCocos.velocidad;
		}
		

		//	Cargamos los elementos del canvas
		for(let iterador = 0; iterador<hockeyElements.length; iterador++){
			//	Comprobamos cual de los elementos en la lista es el puck
			let assetsCoords;
			if(hockeyElements[iterador].constructor.name === PuckComeCocos.name){

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
	function cargarConfiguración(){
		// Localizamos el canvas
		canvas = document.getElementById("miCanvas");
		
		// Generamos el contexto de trabajo
		ctx = canvas.getContext("2d");

		//	Cargamos el asset del stick de hockey
		StickHockey.prototype.asset = ASSETSHOCKEY;

		//	Cargamos el sprite de comecocos
		PuckComeCocos.prototype.asset = SPRITECOMECOCOS;

		//	Creamos los elementos del canvas

		hockeyElements = [];

		//	Elemento puck
		puckComeCocos = new PuckComeCocos(176,290);

		//	Elementos sticks
		stickUser = new StickHockey(155,500);

		stickIA = new StickHockey(155,40);

		hockeyElements.push(puckComeCocos,stickUser,stickIA);
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
	cargarConfiguración();

	//	Lanzamos el juego
	startGame();
}