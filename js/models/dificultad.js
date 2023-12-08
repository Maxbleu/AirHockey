/**
 *      OBJETO DIFICULTAD
 * @param {number} _valor 
 * @param {string} _nombre 
 */
function Dificultad(_valor, _nombre){
    this.valor = _valor;
    this.nombre = _nombre;
}
Dificultad.prototype.obtenerVelocidadIA = function(){

    let velocidad;

    switch(this.valor){

        case 1:
            velocidad = 1;
            break;

        case 2:
            velocidad = 2;
            break;

        case 3:
            velocidad = 3;
            break;
    }

    return velocidad;
}