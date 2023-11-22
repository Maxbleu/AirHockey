function Marcador(_x,_y){
    this.base = ObjetoBase;
    this.base(_x,_y,31,19);
}
Marcador.prototype.NUMEROS=
[
    {
        SKINCOORDS : [305,43],
        altura: 31,
        anchura: 19
    },
    {

        SKINCOORDS : [16,43],
        altura: 31,
        anchura: 5
    },
    {
        SKINCOORDS : [36,43],
        altura: 31,
        anchura: 19
    },
    {
        SKINCOORDS : [70,43],
        altura: 31,
        anchura: 19
    }
];
Marcador.prototype = ObjetoBase;