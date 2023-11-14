/**
 *       OBJETO HOCKEYELEMENT
 * HockeyElement es un objeto que cuenta con las 
 * características base que necesitamos para el 
 * resto de objetos en la aplicación
 * @param {number} _x 
 * @param {number} _y 
 * @param {number} _altura 
 * @param {number} _anchura 
 */
function HockeyElement(_x, _y, _altura, _anchura){

    this.x = _x;
    this.y = _y;
    this.altura = _altura;
    this.anchura = _anchura;

    this.radio = Math.round(Math.sqrt(Math.pow(this.anchura / 2, 2) + Math.pow(this.altura / 2, 2)));

    this.rx = this.x + this.anchura / 2;
    this.ry = this.y + this.altura / 2;

    this.velocidad = 5;

}