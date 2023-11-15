/**
 *      OBJETO OBJETOBASE
 * Este objeto es utilizado para representar
 * las cualidades básicas que tendrá en común
 * todos los objetos del proyecto 
 * @param {number} _x 
 * @param {number} _y 
 * @param {number} _altura 
 * @param {number} _anchura 
 */
function ObjetoBase(_x, _y, _altura, _anchura){
    this.x = _x;
    this.y = _y;
    this.altura = _altura;
    this.anchura = _anchura;
}