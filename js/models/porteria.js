/**
 * 		OBJETO PORTERIA
 * Este objeto se encarga de gestionar todas las 
 * acciones relacionadas con la porteria del juego
 * @param {number} lineaDeGol 
 */
function Porteria(lineaDeGol_){

	this.lineaDeGol = lineaDeGol_;

	/**
	 * Esta función se encarga de comprobar 
	 * si el disco ha entrado en la porteria
	 * @param {object} puck 
	 * @returns {boolean}
	 */
	this.comprobarSiPuckEstaEnPorteria = function(puck){
		if(puck.x < this.lineaDeGol_){
			if(puck.y > this.INICIOPORTERIA && puck.y < this.FINPORTERIA){
				return true;
			}
		}
		return false;
	}

}

Porteria.prototype.INICIOPORTERIA = 123;
Porteria.prototype.FINPORTERIA = 257;