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

    this.dx = this.anchura / 2;
    this.dy = this.altura / 2;

    this.radio = function(){
        let dxElevadoADos = Math.pow(this.dx,2);
        let dyElevadoADos = Math.pow(this.dy,2);
        let resultadoRaizCuadrada = Math.sqrt(dxElevadoADos+dyElevadoADos);
        return resultadoRaizCuadrada / 2;
    }

    this.rx = this.dx + this.x;
    this.ry = this.dy + this.y;

    this.velocidad = 3;

    this.asset = HOCKEYASSETS;

}