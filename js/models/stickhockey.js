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