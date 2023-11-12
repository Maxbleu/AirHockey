function PuckComeCocos(x_,y_){

    this.animacionesComecocosCoords = [[0,1],[32,1]];
    this.anchura = 29;
    this.altura = 29;
    this.velocidad = 5;
    this.direccion = 0;

    this.x = x_;
    this.y = y_;
    this.dx = this.anchura / 2;
    this.dy = this.altura / 2;
    this.difX = 0;
    this.difY = 0;

    this.radio = function(){
        let dxElevadoADos = Math.floor(Math.pow(this.dx,2));
        let dyElevadoADos = Math.floor(Math.pow(this.dy,2));
        return Math.sqrt(dxElevadoADos+dyElevadoADos) / 2;
    }

    /*this.rx = function(){
        return this.dx + this.x;
    }

    this.ry = function(){
        return this.dy + this.y;
    }*/
}