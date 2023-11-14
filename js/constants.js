
    /**     CONSTANTES     */

const LIMITELADOIZQUIERDO = 13;
const LIMITELADODERECHO = 350;
const LIMITEMEDIOCAMPO = 298;
const LIMITEABAJO = 557;
const LIMITEARRIBA = 13;

const LINEADEGOLPORTERIALOCAL = 590;
const LINEADEGOLPORTERIAVISITANTE = 7;

const MOVIMIENTOS = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

const DIFICULTAD = {
    EASSY : 1,
    MEDIUM : 2,
    HARD : 3
};

const CANVAS = document.getElementById("miCanvas");
const CTX = canvas.getContext("2d");