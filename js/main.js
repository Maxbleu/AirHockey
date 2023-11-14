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

	let puckComeCocos;
	let stickVisitante;
	let stickLocal;
	let porteriaLocal;
	let porteriaVisitante;



	/**
	 * 		OBJETO PUCKCOMECOCOS
	 * Este objeto se encarga de gestionar todas 
	 * las acciones del objeto PuckComeCocos
	 * @param {number} _x 
	 * @param {number} _y
	 */
	function PuckComeCocos(_x, _y){

		this.base = HockeyElement;
		this.base(_x, _y, 29, 29);

		this.direccion = 0;
		this.posicionAnimacionComecocos = 0;

		this.animacionesComecocosCoords = [[0,1],[32,1]];


		this.abrirCierraBoca = function(){
			posicionAnimacionComecocos = (posicionAnimacionComecocos + 1) % this.animacionesComecocosCoords.length;
		}


		this.mantenerPuckEnElCanvas = function(){
			if(this.direccion != 0){
				if (this.rx > LIMITELADODERECHO) {
					this.direccion = Math.PI - this.direccion;
				}
		
				if (this.y < LIMITEARRIBA) {
					this.direccion = -this.direccion;
				}
		
				if(this.x < LIMITELADOIZQUIERDO){
					this.direccion = Math.PI - this.direccion;
				}
		
				if(this.ry > LIMITEABAJO){
					this.direccion = -this.direccion;
				}
			}
		}


		this.mover = function(){
			if(this.direccion != 0){
				this.x += this.velocidad * Math.cos(this.direccion);
				this.y += this.velocidad * Math.sin(this.direccion);
			}
		}


		this.detectarColisionEntrePuckStick = function(stick){
			let distanciaX = Math.pow((stick.rx - puckComeCocos.rx),2);
			let distanciaY = Math.pow((stick.ry - puckComeCocos.ry),2);
	
			let distanciaEntreElementos = Math.sqrt(distanciaX + distanciaY);
			let sumaRadiosPuckyStick = (stick.radio+11) + puckComeCocos.radio;
	
			if (distanciaEntreElementos<sumaRadiosPuckyStick) {
				return true;
			}
			return false;
		}


		this.show = function(){
			ctx.drawImage
				(
					this.asset,
					this.animacionesComecocosCoords[this.posicionAnimacionComecocos][0],
					this.animacionesComecocosCoords[this.posicionAnimacionComecocos][1],
					this.anchura,
					this.altura,
					this.x,
					this.y,
					this.anchura,
					this.altura
				);
		}


		this.modificarDireccionDelPuck = function(stick){
			this.direccion = Math.atan2(this.ry - stick.ry, this.rx - stick.rx);
		}


	}
	PuckComeCocos.prototype = new HockeyElement;
	/**
	 *      OBJETO STICKHOCKEY
	 * Este objeto se encarga de gestionar todas las 
	 * acciones relacionadas con el objeto StickHockey
	 * @param {number} _x 
	 * @param {number} _y 
	 */
	function StickHockey(_x, _y){

		this.base = HockeyElement;
		this.base(_x, _y, 71, 71);

		this.skinCoords = [525,112];

		this.yArriba = function(){
			return this.y;
		}

		this.xIzquierda = function(){
			return this.x;
		}

		this.xDerecha = function(){
			return this.x + 55;
		}

		this.yBajo = function(){
			return this.y + 45;
		}

		this.show = function(){
			ctx.drawImage
				(
					this.asset,
					this.skinCoords[0],
					this.skinCoords[1],
					this.anchura,
					this.altura,
					this.x,
					this.y,
					this.anchura,
					this.altura
				);
		}

		this.mantenerStickEnElCanvas = function(){
			if(this.xIzquierda() < LIMITELADOIZQUIERDO){
				this.x = LIMITELADOIZQUIERDO;
			}
			if(this.yArriba() < LIMITEMEDIOCAMPO){
				this.y = LIMITEMEDIOCAMPO
			}
			if(this.xDerecha() > LIMITELADODERECHO){
				this.x = LIMITELADODERECHO
			}
			if(this.yBajo() > LIMITEABAJO){
				this.y = LIMITEABAJO
			}
		}
	}
	StickHockey.prototype = new HockeyElement;



	function gameLoop() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(StickHockey.prototype.asset,0,0,380,598,0,0,380,598);

		puckComeCocos.mover();
		puckComeCocos.mantenerPuckEnElCanvas();

		//	Comprobamos si el puck ha colisionado con el stick user
		if(puckComeCocos.detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.modificarDireccionDelPuck(stickLocal);
		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(puckComeCocos.detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.modificarDireccionDelPuck(stickVisitante);
		}

		puckComeCocos.show();

		stickLocal.mover();
		stickLocal.mantenerStickEnElCanvas();
		stickLocal.show();

		stickVisitante.mover();
		stickVisitante.mantenerPuckEnElCanvas();
		stickVisitante.show();

		//	Comprobamos si el disco ha entrado en la portería local

		//	Comprobamos si el disco ha entrado en la portería visitante
		
	}
	/**
	 * Este método se encarga de configurar los elementos de 
	 * la aplicación necesarios para que comienze el juego
	 */
	function cargarConfiguración(){

		canvas = document.getElementById("miCanvas");

		ctx = canvas.getContext("2d");

		//	Cargamos el asset del stick de hockey
		StickHockey.prototype.asset = ASSETSHOCKEY;

		//	Cargamos el sprite de comecocos
		PuckComeCocos.prototype.asset = SPRITECOMECOCOS;

		//	Creamos los elementos del canvas
		puckComeCocos = new PuckComeCocos(176,290);

		stickLocal = new StickHockey(155,500);
		stickLocal.mover = function(){
			//	TODO: cuando haya pulsada dos teclas por el usuario que la velocidad esa un punto menor la velocidad actual
			if(izquierda){
				this.x -= this.velocidad;
			}
			if(arriba){
				this.y -= this.velocidad;
			}
			if(derecha){
				this.x += this.velocidad;
			}
			if(abajo){
				this.y += this.velocidad;
			}
		}

		stickVisitante = new StickHockey(155,40);
		stickVisitante.mover = function(){
			//	Movimientos de la IA
		}

		porteriaLocal = new Porteria(LINEADEGOLPORTERIALOCAL);

		porteriaVisitante = new Porteria(LINEADEGOLPORTERIAVISITANTE);
	}
	/**
	 * Este método se encarga de iniciar el funcionamiento del juego
	 */
	function startGame(){
		//	Lanzamos la animación
		idAnimacionHockey = setInterval(gameLoop, 1000/50);
		
		//	Animación encargada de abrir y cerra la boca
		idAnimacionAbrirCerrarBoca = setInterval(puckComeCocos.abrirCierraBoca, 1000/8);
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