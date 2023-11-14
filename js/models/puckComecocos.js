
    /**   OBJETO PUCKCOMECOCOS   */

/**
 * Este objeto se encarga de gestionar todas 
 * las acciones del objeto PuckComeCocos
 * @param {number} x_ 
 * @param {number} y_ 
 */
function PuckComeCocos(x_,y_){

    this.animacionesComecocosCoords = [[0,1],[32,1]];
    this.anchura = 29;
    this.altura = 29;
    this.velocidad = 5;
    
    this.direccion = 0;
    this.posicionAnimacionComecocos = 0;

    this.x = x_;
    this.y = y_;
    this.dx = this.anchura / 2;
    this.dy = this.altura / 2;

    this.radio = function(){
        let dxElevadoADos = Math.floor(Math.pow(this.dx,2));
        let dyElevadoADos = Math.floor(Math.pow(this.dy,2));
        return Math.sqrt(dxElevadoADos+dyElevadoADos) / 2;
    }

    this.rx = function(){
        return this.dx + this.x;
    }

    this.ry = function(){
        return this.dy + this.y;
    }

    this.abrirCierraBoca = function(){
		posicionAnimacionComecocos = (posicionAnimacionComecocos + 1) % this.animacionesComecocosCoords.length;
	}

    this.mantenerPuckEnElCanvas = function(){
        
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

    this.mover = function(){
        this.x += this.velocidad * Math.cos(this.direccion);
        this.y += this.velocidad * Math.sin(this.direccion);
    }
}