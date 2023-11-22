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
}
StickHockey.prototype = new HockeyElement;
StickHockey.prototype.SKINCOORDS = [100,111];
StickHockey.prototype.VELOCIDAD = 3;