window.onload = function() {
	
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
	let sticks;

	let puckComeCocos;
	let stickVisitante;
	let stickLocal;
	let porteriaLocal;
	let porteriaVisitante;


	/**
	 * Esta función se encarga de detectar si hay una 
	 * colisión entre unos de los sticks y el disco 
	 * @param {Object} stick 
	 * @returns {boolean}
	 */
	function detectarColisionEntrePuckStick(stick){
		let distanciaX = Math.pow((stick.rx() - puckComeCocos.rx()),2);
		let distanciaY = Math.pow((stick.ry() - puckComeCocos.ry()),2);

		let distanciaEntreElementos = Math.sqrt(distanciaX + distanciaY);
		let sumaRadiosPuckyStick = stick.radio() + puckComeCocos.radio();

		if (distanciaEntreElementos<sumaRadiosPuckyStick) {
			return true;
		}
		return false;
	}


	function generarAnimacionHockey() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(StickHockey.prototype.asset,0,0,380,598,0,0,380,598);

		//	realizar movimiento del usuario
		if(izquierda && stickLocal.xIzquierda() > LIMITELADOIZQUIERDO){
			stickLocal.x -= stickLocal.velocidad;
		}
		if(arriba && stickLocal.yArriba() > LIMITEMEDIOCAMPO){
			stickLocal.y -= stickLocal.velocidad;
		}
		if(derecha && stickLocal.xDerecha() < LIMITELADODERECHO){
			stickLocal.x += stickLocal.velocidad;
		}
		if(abajo && stickLocal.yBajo() < LIMITEABAJO){
			stickLocal.y += stickLocal.velocidad;
		}

		
		//	Comprobamos si el puck ha colisionado con el stick user
		if(detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.direccion = Math.atan2(puckComeCocos.ry() - stickLocal.ry(), puckComeCocos.rx() - stickLocal.rx());
		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.direccion = Math.atan2(puckComeCocos.ry() - stickVisitante.ry(), puckComeCocos.rx() - stickVisitante.rx());
		}

		//	Mover el puck
		if(puckComeCocos.direccion !== 0){
			//	Comprobamos si ha el disco está entre los límites del canvas
			if (puckComeCocos.rx() > LIMITELADODERECHO) {
				puckComeCocos.direccion = Math.PI - puckComeCocos.direccion;
			}

			//	TODO: permitir que el puck pueda pasar entre las coordenadas x 123 - 257 e y 7
			if (puckComeCocos.y < LIMITEARRIBA) {
				puckComeCocos.direccion = -puckComeCocos.direccion;
			}
			if(puckComeCocos.x < LIMITELADOIZQUIERDO){
				puckComeCocos.direccion = Math.PI - puckComeCocos.direccion;
			}

			//	TODO: permitir que el puck pueda pasar entre las coordenadas x 123 - 257 e y 590
			if(puckComeCocos.ry() > LIMITEABAJO){
				puckComeCocos.direccion = -puckComeCocos.direccion;
			}

			puckComeCocos.x += puckComeCocos.velocidad * Math.cos(puckComeCocos.direccion);
			puckComeCocos.y += puckComeCocos.velocidad * Math.sin(puckComeCocos.direccion);
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
			);
		}

		//	Comprobamos si el disco ha entrado en la portería local

		//	Comprobamos si el disco ha entrado en la portería visitante
		
	}


	/**
	 * Este método se encarga de modificar a donde apuntamos 
	 * dentro del array de animaciones del comecocos
	 */
	function abrirCierraBoca(){
		posicionAnimacionComecocos = (posicionAnimacionComecocos + 1) % 2;
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

		sticks = [];

		//	Elemento puck
		puckComeCocos = new PuckComeCocos(176,290);

		//	Elementos sticks
		stickLocal = new StickHockey(155,500);

		stickVisitante = new StickHockey(155,40);

		hockeyElements.push(puckComeCocos,stickLocal,stickVisitante);
		sticks.push(stickVisitante,stickLocal);

		//	Cargamos las porterias

		porteriaLocal = new Porteria(LINEADEGOLPORTERIALOCAL);

		porteriaVisitante = new Porteria(LINEADEGOLPORTERIAVISITANTE);
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


	
	//	MAIN

	//	Establecemos los eventos necesarios para detectar 
	//	cuando pulsamos y levantamos el dedo de una tecla

	document.addEventListener("keydown", activarTeclaPulsada, false);
	document.addEventListener("keyup", desactivarTeclaPulsada, false);
	
	//	Configuramos la aplicación
	cargarConfiguración();

	//	Lanzamos el juego
	startGame();

	canvas.focus();
}