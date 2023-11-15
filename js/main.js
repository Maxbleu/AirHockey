window.onload = function() {
	
	let arriba = false;
	let abajo = false;
	let izquierda = false;
	let derecha = false;

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
	 *      OBJETO MARCADOR
	 * @param {number} _x 
	 * @param {number} _y
	 */
	function Marcador(_x, _y){

		this.base = ObjetoBase;
		this.base(_x, _y, 46, 71);

		this.golesLocal = 0;
		this.golesVisitante = 0;

		this.coordsNumeros = [
			{
				x: 305,
				y: 43,
				altura: 31,
				anchura: 19
			},
			{
				x: 16,
				y: 43,
				altura: 31,
				anchura: 5
			},
			{
				x: 36,
				y: 43,
				altura: 31,
				anchura: 19
			},
			{
				x: 70,
				y: 43,
				altura: 31,
				anchura: 19
			}
		];

		this.dosPuntos = {
			x: 340,
			y: 51,
			altura: 24,
			anchura: 4
		};


		this.anotarGolDelLocal = function(){
			this.golesLocal += 1;
		}

		this.anotarGolDelVisitante = function(){
			this.golesVisitante += 1;
		}

		this.show = function(){
			//ctx.drawImage(this.asset,this.,this.,this.anchura,this.altura,this.x,this.y,this.anchura,this.altura);
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
	Marcador.prototype = ObjetoBase;
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

		this.animacionesComecocosCoords = [[203,243],[235,243]];


		this.abrirCierraBoca = function(){
			this.posicionAnimacionComecocos = (this.posicionAnimacionComecocos + 1) % 2;
		}

		this.mantenerPuckEnElCanvas = function(){
			if(this.direccion != 0){
				if(this.y < LIMITEARRIBA) {
					this.direccion = -this.direccion;
				}
				if(this.x < LIMITELADOIZQUIERDO){
					this.direccion = Math.PI - this.direccion;
				}
				if(this.coordsLadoDerecho() > LIMITELADODERECHO) {
					this.direccion = Math.PI - this.direccion;
				}
				if(this.coordsParteAbajo() > LIMITEABAJO){
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
			this.direccion = Math.atan2(this.ry() - stick.ry(), this.rx() - stick.rx());
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

		this.skinCoords = [100,111];

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


	function gameLoop() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

		marcador.show();

		stickLocal.mover();
		stickLocal.mantenerStickEnElCanvas();

		stickVisitante.mover();
		//stickVisitante.mantenerPuckEnElCanvas();

		//	Comprobamos si el puck ha colisionado con el stick user
		if(puckComeCocos.detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.modificarDireccionDelPuck(stickLocal);
		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(puckComeCocos.detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.modificarDireccionDelPuck(stickVisitante);
		}

		puckComeCocos.mantenerPuckEnElCanvas();
		puckComeCocos.mover();

		puckComeCocos.show();
		stickLocal.show();
		stickVisitante.show();

		//	Comprobamos si el disco ha entrado en la portería local
		if(porteriaLocal.comprobarSiPuckEstaEnPorteria(puckComeCocos)){
			marcador.anotarGolDelLocal();
			if(marcador.haGanadoElEquipoLocal()){
				finishGame();
			}
		}

		//	Comprobamos si el disco ha entrado en la portería visitante
		if(porteriaVisitante.comprobarSiPuckEstaEnPorteria(puckComeCocos)){
			marcador.anotarGolDelVisitante();
			if(marcador.haGanadoElEquipoVisitante()){
				finishGame();
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
		stickLocal = new StickHockey(155,500);
		stickLocal.mover = function(){
			if(izquierda){this.x -= this.velocidad;}
			if(arriba){this.y -= this.velocidad;}
			if(derecha){this.x += this.velocidad;}
			if(abajo){this.y += this.velocidad;}
		}

		stickVisitante = new StickHockey(155,40);
		stickVisitante.mover = function(){
			//	Movimientos de la IA
		}

		//	Porterias
		porteriaLocal = new Porteria(LINEADEGOLPORTERIALOCAL);
		porteriaVisitante = new Porteria(LINEADEGOLPORTERIAVISITANTE);

		//	Marcador
		marcador = new Marcador(27,242);
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