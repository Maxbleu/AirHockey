/**
 *      OBJETO TIEMPOJUGADO
 * @param {number} _minutos 
 * @param {number} _segundos 
 */
function TiempoJugado(_minutos, _segundos){

    this.minutos = _minutos;
    this.segundos = _segundos;

}
TiempoJugado.prototype.toString = function(){
    if(this.segundos<=9){this.segundos = "0" + this.segundos;}
    return `${this.minutos}:${this.segundos}`;
}