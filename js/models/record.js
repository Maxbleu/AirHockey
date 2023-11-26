/**
 *      OBJETO RECORD
 * Este objeto representa un record el cual almacena 
 * la información tanto del usuario como de su partida
 * @param {string} _nombre 
 * @param {string} _tiempo 
 * @param {string} _dificultad 
 * @param {string} _nameDificultad
 */
function Record(_nombre, _tiempo, _dificultad, _nameDificultad){

    this.nombre = _nombre;
    this.tiempo = _tiempo;
    this.dificultad = _dificultad;
    this.nameDificultad = _nameDificultad;

}
Record.prototype.toStringRecord = function(){
    return `${this.nombre} - ${this.tiempo} - ${this.nameDificultad}`;
}