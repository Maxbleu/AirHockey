/**
 *      OBJEETO PORTERIAVISITANTE
 */
function PorteriaVisitante(){

    this.base = Porteria;
    this.base();

    this.elDiscoHaEntrado = function(puck){
        if(puck.x > this.INICIOPORTERIA && puck.coordsLadoDerecho() < this.FINPORTERIA){
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
PorteriaVisitante.prototype.LINEADEGOL = 7;