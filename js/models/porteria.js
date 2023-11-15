/**
 * 		OBJETO PORTERIA
 * Este objeto se encarga de gestionar todas las 
 * acciones relacionadas con la porteria del juego
 * @param {number} _lineaDeGol 
 */
function Porteria(_lineaDeGol){

	this.lineaDeGol = _lineaDeGol;

	this.inicioPorteria = 123;
	this.finPorteria = 257;

	/**
	 * Esta función se encarga de comprobar 
	 * si el disco ha entrado en la porteria
	 * @param {object} puck 
	 * @returns {boolean}
	 */
	this.comprobarSiPuckEstaEnPorteria = function(puck){
		if(puck.x < this._lineaDeGol){
			if(puck.y > this.INICIOPORTERIA && puck.y < this.FINPORTERIA){
				return true;
			}
		}
		return false;
	}

}