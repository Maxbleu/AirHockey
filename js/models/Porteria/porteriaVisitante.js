/**
 *      OBJEETO PORTERIAVISITANTE
 */
function PorteriaVisitante(){

    this.base = Porteria;
    this.base();

    this.LINEADEGOL = 13;

    this.elDiscoHaEntrado = function(puck){
        if(puck.x > Porteria.prototype.INICIOPORTERIA && puck.coordsLadoDerecho() < Porteria.prototype.FINPORTERIA){
            if(puck.coordsParteAbajo() < this.LINEADEGOL){
                return true;
            }else{
                if(puck.y < this.LINEADEGOL){
                    puck.haEntradoUnaParteEnLaPorteriaVisitante = true;
                }
            }
        }
        return false;
    }

}
PorteriaVisitante.prototype = Porteria;