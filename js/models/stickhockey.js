function StickHockey(x_, y_){

    this.skinCoords = [524,111];
    this.anchura = 72;
    this.altura = 71;
    this.velocidad = 5;

    this.x = x_;
    this.y = y_;
    this.dx = this.anchura / 2;
    this.dy = this.altura / 2;

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