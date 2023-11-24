/**
 *      OBJETO PORTERIALOCAL
 */
function PorteriaLocal(){

    this.base = Porteria;
    this.base();

    this.LINEADEGOL = 586;

    this.elDiscoHaEntrado = function(puck){
        if(puck.x > Porteria.prototype.INICIOPORTERIA && puck.coordsLadoDerecho() < Porteria.prototype.FINPORTERIA){
            if(puck.y > this.LINEADEGOL){
                return true;
            }else{
                if(puck.coordsParteAbajo() > this.LINEADEGOL){
                    puck.haEntradoUnaParteEnLaPorteriaLocal = true;
                }
            }
        }
        return false;
    }

}
PorteriaLocal.prototype = Porteria;