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

}
StickHockey.prototype = new HockeyElement;
StickHockey.prototype.SKINCOORDS = [100,111];
StickHockey.prototype.VELOCIDAD = 3;