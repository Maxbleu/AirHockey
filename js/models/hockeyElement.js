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

    this.velocidad = 3;

    this.asset = HOCKEYASSETS;

    this.radio = function(){
        let dxElevadoADos = Math.pow(this.dx(),2);
        let dyElevadoADos = Math.pow(this.dy(),2);
        let resultadoRaizCuadrada = Math.sqrt(dxElevadoADos+dyElevadoADos);
        return (resultadoRaizCuadrada / 2) + 6;
    }

    this.rx = function(){
        let rx = this.dx() + this.x;
        return rx;
    }

    this.ry = function(){
        let ry = this.dy() + this.y;
        return ry;
    }

    this.dx = function(){
        return this.anchura / 2;
    }

    this.dy = function(){
        return this.altura / 2;
    }

}