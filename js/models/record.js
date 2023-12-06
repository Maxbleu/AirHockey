/**
 *      OBJETO RECORD
 * Este objeto representa un record el cual almacena 
 * la información tanto del usuario como de su partida
 * @param {string} _nombre 
 * @param {TiempoJugador} _tiempoJugado 
 * @param {Dificultad} _dificultad 
 */
function Record(_nombre, _tiempoJugado, _dificultad){

    this.nombre = _nombre;
    this.tiempoJugado = _tiempoJugado;
    this.dificultad = _dificultad;

}
Record.prototype.toStringRecord = function(){
    return `${this.nombre} - ${this.tiempoJugado.toString()} - ${this.dificultad.nombre}`;
}