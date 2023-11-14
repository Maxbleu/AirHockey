
    /**   OBJETO STICKHOCKEY   */

/**
 * Este objeto se encarga de gestionar todas las 
 * acciones relacionadas con el objeto StickHockey
 * @param {number} x_ 
 * @param {number} y_ 
 */
function StickHockey(x_, y_){

    this.skinCoords = [525,112];
    this.anchura = 71;
    this.altura = 71;
    this.velocidad = 5;

    this.x = x_;
    this.y = y_;
    this.dx = this.anchura / 2;
    this.dy = this.altura / 2;

    this.radio = function(){
        let dxElevadoADos = Math.floor(Math.pow(this.dx,2));
        let dyElevadoADos = Math.floor(Math.pow(this.dy,2));
        return (Math.sqrt(dxElevadoADos+dyElevadoADos) / 2) + 11;
    }

    this.rx = function(){
        return this.dx + this.x;
    }

    this.ry = function(){
        return this.dy + this.y;
    }

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

    
}