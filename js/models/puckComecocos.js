
    /**   OBJETO PUCKCOMECOCOS   */

/**
 * Este objeto se encarga de gestionar todas 
 * las acciones del objeto PuckComeCocos
 * @param {number} _x 
 * @param {number} _y
 * @param {number} _anchura
 * @param {number} _altura
 */
function PuckComeCocos(_x, _y){

    this.base = HockeyElement;
    this.base(_x, _y, _altura, _anchura);

    this.direccion = 0;
    this.posicionAnimacionComecocos = 0;

    this.animacionesComecocosCoords = [[0,1],[32,1]];


    this.abrirCierraBoca = function(){
		posicionAnimacionComecocos = (posicionAnimacionComecocos + 1) % this.animacionesComecocosCoords.length;
	}

    this.mantenerPuckEnElCanvas = function(){
        
        if(this.direccion != 0){
            if (this.rx() > LIMITELADODERECHO) {
                this.direccion = Math.PI - this.direccion;
            }
    
            if (this.y < LIMITEARRIBA) {
                this.direccion = -this.direccion;
            }
    
            if(this.x < LIMITELADOIZQUIERDO){
                this.direccion = Math.PI - this.direccion;
            }
    
            if(this.ry() > LIMITEABAJO){
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

    this.estaColisionandoConUnStick = function(){
        let distanciaX = Math.pow((stick.rx() - puckComeCocos.rx()),2);
		let distanciaY = Math.pow((stick.ry() - puckComeCocos.ry()),2);

		let distanciaEntreElementos = Math.sqrt(distanciaX + distanciaY);
		let sumaRadiosPuckyStick = stick.radio() + puckComeCocos.radio();

		if (distanciaEntreElementos<sumaRadiosPuckyStick) {
			return true;
		}
		return false;
    }
}

PuckComeCocos.prototype = new HockeyElement;