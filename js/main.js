window.onload = function() {

	let idAnimacionHockey;
	let idAnimacionAbrirCerrarBoca;
	let idAnimacionTimer;

	let dificulty;

	let ctx;
	let canvas;
	let tablaRecords;

	let inputNickName;
	let botonStartGame;

	let radioButtonEassy;
	let radioButtonMedium;
	let radioButtonYashin;

	let sonidoPuck;
	let sonidoGol;
	let sonidoVictoria;
	let sonidoDerrota;

	let timer;
	let puckComeCocos;

	let stickLocal;
	let marcadorLocal;
	let porteriaLocal;

	let stickVisitante;
	let marcadorVisitante;
	let porteriaVisitante;


	//	DIFICULTADES

	class Dificultades{

		static listaDificultades = [
			new Dificultad(1,"EASSY"),
			new Dificultad(2,"MEDIUM"),
			new Dificultad(3,"YASHIN")
		];

		static obtenerDificultadSeleccionada = function(){
			if(radioButtonEassy.checked){
				return this.listaDificultades[0];
			}
	
			if(radioButtonMedium.checked){
				return this.listaDificultades[1];
			}
	
			if(radioButtonYashin.checked){
				return this.listaDificultades[2];
			}

			return null;
		}
	}


	//	TIMER

	/**
	 * Este objeto representa el 
	 * tipo que pasa en la partida
	 */
	function Timer(){

		this.segundos = 0;
		this.minutos = 0;

		this.actualizarTiempo = function(){
			this.segundos++;
            if (this.segundos === 60) {
                this.minutos++;
                this.segundos = 0;
            }
		}

		this.obtenerTiempo = function(){
			return new TiempoJugado(this.minutos,this.segundos);
		}

		this.show = function(){

			let unidades = [];

			//	MINUTOS

			let minutosString = this.minutos.toString();
			unidades = minutosString.split('');
			if(unidades.length === 1){unidades.unshift(0);}
			unidades.forEach(function(value){
				return parseInt(value);
			});

			//	PRIMER NÚMERO MINUTOS
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[unidades[0]].SKINCOORDS[0],
						this.NUMEROS[unidades[0]].SKINCOORDS[1],
						this.NUMEROS[unidades[0]].anchura,
						this.NUMEROS[unidades[0]].altura,
						18,
						16,
						this.NUMEROS[unidades[0]].anchura,
						this.NUMEROS[unidades[0]].altura
					);

			//	SEGUNDO NÚMERO MINUTOS
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[unidades[1]].SKINCOORDS[0],
						this.NUMEROS[unidades[1]].SKINCOORDS[1],
						this.NUMEROS[unidades[1]].anchura,
						this.NUMEROS[unidades[1]].altura,
						39,
						16,
						this.NUMEROS[unidades[1]].anchura,
						this.NUMEROS[unidades[1]].altura
					);

			//	DOS PUNTOS
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.DOSPUNTOS.SKINCOORDS[0],
						this.DOSPUNTOS.SKINCOORDS[1],
						this.DOSPUNTOS.anchura,
						this.DOSPUNTOS.altura,
						this.DOSPUNTOS.x,
						this.DOSPUNTOS.y,
						this.DOSPUNTOS.anchura,
						this.DOSPUNTOS.altura
					);

			//	SEGUNDOS
			
			unidades = [];
			let segundosString = this.segundos.toString();
			unidades = segundosString.split('');
			if(unidades.length == 1){unidades.unshift(0);}
			unidades.forEach(function(value){
				return parseInt(value);
			});

			//	PRIMER NÚMERO SEGUNDOS
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[unidades[0]].SKINCOORDS[0],
						this.NUMEROS[unidades[0]].SKINCOORDS[1],
						this.NUMEROS[unidades[0]].anchura,
						this.NUMEROS[unidades[0]].altura,
						66,
						16,
						this.NUMEROS[unidades[0]].anchura,
						this.NUMEROS[unidades[0]].altura
					);

			//	SEGUNDO NÚMERO SEGUNDOS
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[unidades[1]].SKINCOORDS[0],
						this.NUMEROS[unidades[1]].SKINCOORDS[1],
						this.NUMEROS[unidades[1]].anchura,
						this.NUMEROS[unidades[1]].altura,
						87,
						16,
						this.NUMEROS[unidades[1]].anchura,
						this.NUMEROS[unidades[1]].altura
					);
		}

	}
	Timer.prototype.DOSPUNTOS = {
		SKINCOORDS : [339,50],
		altura :24,
		anchura:4,
		x:60,
		y:20
	};
	Timer.prototype.NUMEROS = [
		{
			SKINCOORDS : [305,43],
			altura: 31,
			anchura: 19
		},
		{
	
			SKINCOORDS : [16,43],
			altura: 31,
			anchura: 5
		},
		{
			SKINCOORDS : [36,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [70,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [103,43],
			altura: 31,
			anchura: 19 
		},
		{
			SKINCOORDS : [138,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [170,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [204,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [238,43],
			altura: 31,
			anchura: 19
		},
		{
			SKINCOORDS : [271,43],
			altura: 31,
			anchura: 19
		}
	];


	//	PUCK

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
		this.haEntradoUnaParteEnLaPorteriaLocal = false;
		this.haEntradoUnaParteEnLaPorteriaVisitante = false;


		this.abrirCierraBoca = function(){
			this.posicionAnimacionComecocos = (this.posicionAnimacionComecocos + 1) % 2;
		}

		this.mantenerPuckEnElCanvas = function(){
			if(this.direccion != 0){
				if(Math.floor(this.y) < LIMITEARRIBA) {

					if(this.haEntradoUnaParteEnLaPorteriaVisitante){
						if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
							this.direccion = Math.PI - this.direccion;
							puckComeCocos.reproducirAudio();
						}

					}else if(Math.floor(this.x) <= Porteria.prototype.INICIOPORTERIA && Math.floor(this.x) >= 118 
							|| 
							Math.floor(this.coordsLadoDerecho()) >= Porteria.prototype.FINPORTERIA && Math.floor(this.coordsLadoDerecho() <= 262)){

						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();

					}else if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
					}

				}
				if(Math.floor(this.x) < LIMITELADOIZQUIERDO || Math.floor(this.coordsLadoDerecho()) > LIMITELADODERECHO){
					this.direccion = Math.PI - this.direccion;
					puckComeCocos.reproducirAudio();
				}
				if(Math.floor(this.coordsParteAbajo()) > LIMITEABAJO){

					if(this.haEntradoUnaParteEnLaPorteriaLocal){
						if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
							this.direccion = Math.PI - this.direccion;
							puckComeCocos.reproducirAudio();
						}
					}else if(Math.floor(this.x) <= Porteria.prototype.INICIOPORTERIA && Math.floor(this.x) >= 118 
							|| 
							Math.floor(this.coordsLadoDerecho()) >= Porteria.prototype.FINPORTERIA && Math.floor(this.coordsLadoDerecho() <= 262)){

						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();

					}else if(Math.floor(this.x) < Porteria.prototype.INICIOPORTERIA || Math.floor(this.coordsLadoDerecho()) > Porteria.prototype.FINPORTERIA){
						this.direccion = -this.direccion;
						puckComeCocos.reproducirAudio();
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

		this.reproducirAudio = function(){

			sonidoPuck.play();
			sonidoPuck.currentTime = 0;

		}

	}
	PuckComeCocos.prototype = new HockeyElement;
	PuckComeCocos.prototype.ANIMACIONESCOMECOCOS = [[203,243],[235,243]];
	PuckComeCocos.prototype.VELOCIDAD = 4;


	//	STICKHOCKEY

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

		this.mantenerStickLocalEnElCanvas = function(){
			if(this.direccion != 0){
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

		this.desplazamientoX = 0;
		this.desplazamientoY = 0;

		this.mantenerStickVisitanteEnElCanvas = function(){
			if(this.direccion != 0){
				if(this.y < LIMITEARRIBA){
					this.y = LIMITEARRIBA;
				}
				if(this.x < LIMITELADOIZQUIERDO){
					this.x = LIMITELADOIZQUIERDO;
				}
				if(this.coordsParteAbajo() > LIMITEMEDIOCAMPO){
					this.y = 227;
				}
				if(this.coordsLadoDerecho() > LIMITELADODERECHO){
					this.x = 295;
				}
			}
		}

		this.mover = function(){

			if(puckComeCocos.coordsParteAbajo() < LIMITEMEDIOCAMPO){

			}else{

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
	StickVisitante.prototype = StickHockey;


	//	MARCADORES

	/**
	 * Este objeto representa el 
	 * marcador del equipo local
	 * @param {number} _x 
	 * @param {number} _y 
	 */
	function MarcadorLocal(_x, _y){

		this.base = Marcador;
		this.base(_x,_y);

		this.anotarGolDelLocal = function(){
			this.goles += 1;
		}

		this.haGanadoElEquipoLocal = function(){
			if(this.goles === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}

		this.show = function(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[this.goles].SKINCOORDS[0],
						this.NUMEROS[this.goles].SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}
	}
	MarcadorLocal.prototype = new Marcador;

	/**
	 * Este objeto representa el 
	 * marcador del equipo visitante
	 * @param {number} _x 
	 * @param {number} _y 
	 */
	function MarcadorVisitante(_x, _y){

		this.base = Marcador;
		this.base(_x,_y);

		this.anotarGolDelVisitante = function(){
			this.goles += 1;
		}

		this.haGanadoElEquipoVisitante = function(){
			if(this.goles === CANTIDADGOLESPARAGANAR){
				return true;
			}
			return false;
		}

		this.show = function(){
			ctx.drawImage
					(
						HOCKEYASSETS,
						this.NUMEROS[this.goles].SKINCOORDS[0],
						this.NUMEROS[this.goles].SKINCOORDS[1],
						this.anchura,
						this.altura,
						this.x,
						this.y,
						this.anchura,
						this.altura
					);
		}
	}
	MarcadorVisitante.prototype = new Marcador;



	function gameLoop() {
		
		//	borramos el canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//	cargamos el fondo
		ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

		puckComeCocos.mantenerPuckEnElCanvas();
		puckComeCocos.mover();

		stickLocal.mantenerStickLocalEnElCanvas();
		stickLocal.mover();

		stickVisitante.mantenerStickVisitanteEnElCanvas();
		stickVisitante.mover();

		//	Comprobamos si el puck ha colisionado con el stick user
		if(puckComeCocos.detectarColisionEntrePuckStick(stickLocal)){
			puckComeCocos.modificarDireccionDelPuck(stickLocal);
			puckComeCocos.reproducirAudio();

		}

		//	Comprobamos si el puck ha colisionado con el stick IA
		if(puckComeCocos.detectarColisionEntrePuckStick(stickVisitante)){
			puckComeCocos.modificarDireccionDelPuck(stickVisitante);
			puckComeCocos.reproducirAudio();
		}

		//	Comprobamos si el disco ha entrado en la portería local
		if(porteriaLocal.elDiscoHaEntrado(puckComeCocos)){
			marcadorVisitante.anotarGolDelVisitante();
			sonidoGol.play();
			if(marcadorVisitante.haGanadoElEquipoVisitante()){
				iaHaGanado();
			}else{
				volverALasPosicionesIniciales();
			}
		}

		//	Comprobamos si el disco ha entrado en la portería visitante
		if(porteriaVisitante.elDiscoHaEntrado(puckComeCocos)){
			marcadorLocal.anotarGolDelLocal();
			sonidoGol.play();
			if(marcadorLocal.haGanadoElEquipoLocal()){
				usuarioHaGanado();
			}else{
				volverALasPosicionesIniciales();
			}
		}

		timer.show();
		marcadorLocal.show();
		marcadorVisitante.show();
		puckComeCocos.show();
		stickLocal.show();
		stickVisitante.show();
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

		//	Lanzamos la animación timer
		idAnimacionTimer = setInterval(function(){
			timer.actualizarTiempo()
		},1000);

		//	Obetner dificultad
		dificulty = Dificultades.obtenerDificultadSeleccionada();
	}
	/**
	 * Este método se encarga de cerrar 
	 * parar el funcionamiento del juego
	 */
	function finishGame(){
		
		clearInterval(idAnimacionAbrirCerrarBoca);
		clearInterval(idAnimacionHockey);
		clearInterval(idAnimacionTimer);

	}
	/**
	 * Este método se encarga de volver devolver a los
	 * objetos a sus posiciones inciales para volver a
	 * jugar el siguiente punto
	 */
	function volverALasPosicionesIniciales(){
		puckComeCocos.volverALaPosicionInicial();
		puckComeCocos.direccion = 0;
		puckComeCocos.haEntradoUnaParteEnLaPorteriaLocal = false;
		puckComeCocos.haEntradoUnaParteEnLaPorteriaVisitante = false;
		stickLocal.volverALaPosicionInicial();
		stickVisitante.volverALaPosicionInicial();
	}
	/**
	 * Este método realiza la funcionalidad
	 * cuando gana el usuario la partida
	 */
	function usuarioHaGanado(){
		finishGame();
		sonidoVictoria.play();
		let record = new Record(inputNickName.value,timer.obtenerTiempo(),dificulty);
		Records.saveRecordInList(record);
		actualizarListaDeRecords();
	}
	/**
	 * Este método se encarga de la funcionalidad
	 * cuando la ia gana la partida.
	 */
	function iaHaGanado(){
		finishGame();
		sonidoDerrota.play();
	}


	/**
	 * Este método se encarga de 
	 * recargar la tabla de records
	 */
	function actualizarListaDeRecords(){
        while (tablaRecords.firstChild) {
            tablaRecords.removeChild(tablaRecords.firstChild);
        }

		let liElements = [];
        for(let iterador = 0; iterador<Records.listRecords.length; iterador++){
            let liElement = document.createElement("li");
			let pElement = document.createElement("p");
            pElement.textContent = `${iterador+1}. ${Records.listRecords[iterador].toStringRecord()}`;
			if(iterador == 0){
				pElement.setAttribute("class","primerPuesto");
			}else if(iterador == 1){
				pElement.setAttribute("class","segundoPuesto");
			}else if(iterador == 2){
				pElement.setAttribute("class","tercerPuesto");
			}
			liElement.appendChild(pElement);
            liElements.push(liElement);
        }

		liElements.forEach(function(liElement){
			tablaRecords.appendChild(liElement);
		});
    }



	/**
	 * Este método se encarga de configurar los elementos de 
	 * la aplicación necesarios para que comienze el juego
	 */
	function prepararComponentesDeLaAplicacion(){

		//	Creamos los elementos del canvas

		//	Disco
		puckComeCocos = new PuckComeCocos(176,288);

		//	Sticks
		stickLocal = new StickLocal(155,500);
		stickVisitante = new StickVisitante(155,40);

		//	Porterias
		porteriaLocal = new PorteriaLocal();
		porteriaVisitante = new PorteriaVisitante();

		//	Marcadores
		marcadorLocal = new MarcadorLocal(338,317);
		marcadorVisitante = new MarcadorVisitante(338,250);

		//	Timer
		timer = new Timer();

	}
	/**
	 * Este método se encarga de enlazar los elementos de la página a los ficheros javascript
	 */
	function cargarComponentesDeLaPagina(){
		//	Cargar botones de las dificultades

		radioButtonEassy = document.getElementById("radioButtonEassy");

		radioButtonMedium = document.getElementById("radioButtonMedium");

		radioButtonYashin = document.getElementById("radioButtonYashin");

		//	Cargar elemento de la tabla de records

		tablaRecords = document.getElementById("tablaRecords");

		actualizarListaDeRecords();

		//	Preparemos los componentes de la aplicación
		//	Preparación del evento que lanza el programa

		botonStartGame = document.getElementById("buttonStartGame");

		inputNickName = document.getElementsByClassName("inputNickName")[0];

		botonStartGame.addEventListener("click", () =>{

			if(inputNickName.value != ""){

				if(Dificultades.obtenerDificultadSeleccionada() != null){
					prepararComponentesDeLaAplicacion();
					startGame();
				}else{
					alert("Seleccione la dificultad de su partida");
				}
			}else{
				alert("Intruzca un nombre para su usuario");
			}

		});

		sonidoPuck = document.getElementById("sonidoPuck");
		sonidoGol = document.getElementById("sonidoGol");
		sonidoVictoria = document.getElementById("sonidoVictoria");
		sonidoDerrota = document.getElementById("sonidoDerrota");
		
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

	//	Preparación del canvas

	canvas = document.getElementById("miCanvas");

	ctx = canvas.getContext("2d");

	//	Colocamos el fondo
	ctx.drawImage(BACKGROUND,0,0,380,599,0,0,380,599);

	//	Establecemos los eventos necesarios para detectar 
	//	cuando pulsamos y levantamos el dedo de una tecla

	document.addEventListener("keydown", activarTeclaPulsada, false);
	document.addEventListener("keyup", desactivarTeclaPulsada, false);

	cargarComponentesDeLaPagina();

	canvas.focus();
}