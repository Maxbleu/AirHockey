window.onload = function() {

	let idAnimacionHockey;
	let idAnimacionAbrirCerrarBoca;

	let ctx;
	let canvas;

	let puckComeCocos;
	let stickVisitante;
	let stickLocal;
	let marcador;
	let porteriaLocal;
	let porteriaVisitante;




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

		this.mantenerStickEnElCanvas = function(){
			if(this.x < LIMITELADOIZQUIERDO){
				this.x = LIMITELADOIZQUIERDO;
			}
			if(this.y < LIMITEMEDIOCAMPO){
				this.y = LIMITEMEDIOCAMPO;
			}
			if(this.coordsLadoDerecho() > LIMITELADODERECHO){
				this.x = 295;
			}
			if(this.coordsParteAbajo() > LIMITEABAJO){
				this.y = 516;
			}
		}
	}
	StickHockey.prototype = new HockeyElement;
	StickHockey.prototype.SKINCOORDS = [100,111];
	StickHockey.prototype.VELOCIDAD = 3;
	/**
	 * 		OBJETO STICKLOCAL
	 * @param {number} _x 
	 * @param {number} _y 
	 */
	function StickLocal(_x, _y){

		this.base = StickHockey;
		this.base(_x, _y);

		this.arriba = false;
		this.abajo = false;
		this.izquierda = false;
		this.derecha = false;

		this.mover = function(){
			if(this.izquierda){
				this.x -= StickHockey.prototype.VELOCIDAD;
			}
			if(this.arriba){
				this.y -= StickHockey.prototype.VELOCIDAD;
			}
			if(this.derecha){
				this.x += StickHockey.prototype.VELOCIDAD;
			}
			if(this.abajo){
				this.y += StickHockey.prototype.VELOCIDAD;
			}
		}

		this.show = function(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.prototype.SKINCOORDS[0],
						this.prototype.SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}
	}
	StickLocal.prototype = StickHockey;
	/**
	 * 		OBJETO STICKVISITANTE
	 * @param {number} _x 
	 * @param {number} _y 
	 */
	function StickVisitante(_x, _y){

		this.base = StickHockey;
		this.base(_x, _y);

		this.mover = function(){
			
		}

		this.show = function(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.prototype.SKINCOORDS[0],
						this.prototype.SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}
	}
	StickVisitante.prototype = StickHockey;
	/**
	 *      OBJETO MARCADOR
	 * @param {number} _x 
	 * @param {number} _y
	 */
	function Marcador(){

		this.golesLocal = 0;
		this.golesVisitante = 0;

		this.fondoMarcador = {
			x: 154,
			y: -1,
			SKINCOORDS : [27,242],
			altura: 46,
			anchura: 71
		}

		/*this.coordsNumeros = [
			{
				x: ,
				y: ,
				SKINCOORDS : [305,43],
				altura: 31,
				anchura: 19
			},
			{
				x: ,
				y: ,
				SKINCOORDS : [16,43]
				altura: 31,
				anchura: 5
			},
			{
				x: ,
				y: ,
				SKINCOORDS : [36,43],
				altura: 31,
				anchura: 19
			},
			{
				x: ,
				y: ,
				SKINCOORDS : [70,43],
				altura: 31,
				anchura: 19
			}
		];

		this.dosPuntos = {
			x: ,
			y: ,
			SKINCOORDS: [340,51],
			altura: 24,
			anchura: 4
		};*/


		this.anotarGolDelLocal = function(){
			this.golesLocal += 1;
		}

		this.anotarGolDelVisitante = function(){
			this.golesVisitante += 1;
		}

		this.show = function(){

			//	Mostrar fondo
			/*ctx.drawImage(
				HOCKEYASSETS,
				this.fondoMarcador.SKINCOORDS[0],
				this.fondoMarcador.SKINCOORDS[1],
				this.fondoMarcador.anchura,
				this.fondoMarcador.altura,
				this.fondoMarcador.x,
				this.fondoMarcador.y,
				this.fondoMarcador.anchura,
				this.fondoMarcador.altura
				);*/
				
			//	Goles del local

			//	Mostrar dos puntos

			//	Goles del visitante
		}

		this.haGanadoElEquipoVisitante = function(){
			if(this.golesVisitante === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}

		this.haGanadoElEquipoLocal = function(){
			if(this.golesLocal === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}
	}
	/**
	 * 		OBJETO PUCKCOMECOCOS
	 * Este objeto se encarga de gestionar todas 
	 * las acciones del objeto PuckComeCocos
	 * @param {number} _x 
	 * @param {number} _y
	 */
	function PuckComeCocos(_x, _y){

		this.base = HockeyElement;
		this.base(_x, _y, 30, 30);

		this.direccion = 0;
		this.posicionAnimacionComecocos = 0;


		this.abrirCierraBoca = function(){
			this.posicionAnimacionComecocos = (this.posicionAnimacionComecocos + 1) % 2;
		}

		this.mantenerPuckEnElCanvas = function(){
			if(this.direccion != 0){
				if(Math.floor(this.y) <= LIMITEARRIBA) {

					if(Math.floor(this.x) === Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) === Porteria.prototype.FINPORTERIA){
						this.direccion = Math.PI - this.direccion;
					}

					if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
					}
				}
				if(Math.floor(this.x) < LIMITELADOIZQUIERDO || Math.floor(this.coordsLadoDerecho()) > LIMITELADODERECHO){
					this.direccion = Math.PI - this.direccion;
				}
				if(Math.floor(this.coordsParteAbajo()) > LIMITEABAJO){

					if(Math.floor(this.x) === Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) === Porteria.prototype.FINPORTERIA){
						this.direccion = Math.PI - this.direccion;
					}

					if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
					}
				}
				
			}
		}

		this.mover = function(){
			if(this.direccion != 0){
				this.x += this.VELOCIDAD * Math.cos(this.direccion);
				this.y += this.VELOCIDAD * Math.sin(this.direccion);
			}
		}

		this.detectarColisionEntrePuckStick = function(stick){
			let distanciaX = Math.floor(Math.pow((stick.rx() - this.rx()),2));
			let distanciaY = Math.floor(Math.pow((stick.ry() - this.ry()),2));

			let distanciaEntreElementos = Math.sqrt(distanciaX + distanciaY);
			let sumaRadiosPuckyStick = stick.radio() + puckComeCocos.radio();

			if (distanciaEntreElementos<sumaRadiosPuckyStick) {
				return true;
			}
			return false;
		}

		this.show = function(){
			ctx.drawImage
				(
					HOCKEYASSETS,
					this.ANIMACIONESCOMECOCOS[this.posicionAnimacionComecocos][0],
					this.ANIMACIONESCOMECOCOS[this.posicionAnimacionComecocos][1],
					this.anchura,
					this.altura,
					this.x,
					this.y,
					this.anchura,
					this.altura
				);
		}

		this.modificarDireccionDelPuck = function(stick){
			this.direccion = Math.atan2(this.ry() - stick.ry(), this.rx() - stick.rx());
		}

	}
	PuckComeCocos.prototype = new HockeyElement;
	PuckComeCocos.prototype.ANIMACIONESCOMECOCOS = [[203,243],[235,243]];
	PuckComeCocos.prototype.VELOCIDAD = 4;


	function gameLoop() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

		puckComeCocos.mantenerPuckEnElCanvas();
		puckComeCocos.mover();

		stickLocal.mantenerStickEnElCanvas();
		stickLocal.mover();

		stickVisitante.mover();

		//	Comprobamos si el puck ha colisionado con el stick user
		if(puckComeCocos.detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.modificarDireccionDelPuck(stickLocal);
		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(puckComeCocos.detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.modificarDireccionDelPuck(stickVisitante);
		}

		puckComeCocos.show();
		stickLocal.show();
		stickVisitante.show();
		marcador.show();

		//	Comprobamos si el disco ha entrado en la portería local
		if(porteriaLocal.elDiscoHaEntrado(puckComeCocos)){
			marcador.anotarGolDelVisitante();
			if(marcador.haGanadoElEquipoVisitante()){
				finishGame();
			}else{
				puckComeCocos.volverALaPosicionInicial();
				puckComeCocos.direccion = 0;
				stickLocal.volverALaPosicionInicial();
				stickVisitante.volverALaPosicionInicial();
			}
		}

		//	Comprobamos si el disco ha entrado en la portería visitante
		if(porteriaVisitante.elDiscoHaEntrado(puckComeCocos)){
			marcador.anotarGolDelLocal();
			if(marcador.haGanadoElEquipoLocal()){
				finishGame();
			}else{
				puckComeCocos.volverALaPosicionInicial();
				puckComeCocos.direccion = 0;
				stickLocal.volverALaPosicionInicial();
				stickVisitante.volverALaPosicionInicial();
			}
		}
	}
	/**
	 * Este método se encarga de iniciar el funcionamiento del juego
	 */
	function startGame(){
		//	Lanzamos la animación
		idAnimacionHockey = setInterval(gameLoop, 1000/50);
		
		//	Animación encargada de abrir y cerra la boca
		idAnimacionAbrirCerrarBoca = setInterval(function(){
			puckComeCocos.abrirCierraBoca()
		}, 1000/8);
	}
	/**
	 * Este método se encarga de cerrar 
	 * parar el funcionamiento del juego
	 */
	function finishGame(){
		clearInterval(idAnimacionAbrirCerrarBoca);
		clearInterval(idAnimacionHockey);
	}
	/**
	 * Este método se encarga de configurar los elementos de 
	 * la aplicación necesarios para que comienze el juego
	 */
	function cargarConfiguración(){

		canvas = document.getElementById("miCanvas");

		ctx = canvas.getContext("2d");

		//	Creamos los elementos del canvas

		//	Disco
		puckComeCocos = new PuckComeCocos(176,290);

		//	Sticks
		stickLocal = new StickLocal(155,500);
		stickVisitante = new StickVisitante(155,40);

		//	Porterias
		porteriaLocal = new PorteriaLocal();
		porteriaVisitante = new PorteriaVisitante();

		//	Marcador
		marcador = new Marcador();
	}


	/**
	 * Este método se encarga de activar 
	 * la tecla que ha pulsado el usuario
	 * @param {event} event 
	 */
	function activarTeclaPulsada(event) {
        switch (event.keyCode) {
		
			case MOVIMIENTOS.IZQUIERDA: 
					stickLocal.izquierda = true;
				break;

			case MOVIMIENTOS.ARRIBA:
					stickLocal.arriba = true;
				break;

			case MOVIMIENTOS.DERECHA:
					stickLocal.derecha = true;
				break;
			
			case MOVIMIENTOS.ABAJO:
					stickLocal.abajo = true;
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
					stickLocal.izquierda = false;
				break;

			case MOVIMIENTOS.ARRIBA:
					stickLocal.arriba = false;
				break;

			case MOVIMIENTOS.DERECHA:
					stickLocal.derecha = false;
				break;
			
			case MOVIMIENTOS.ABAJO:
					stickLocal.abajo = false;
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