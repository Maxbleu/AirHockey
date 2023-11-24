/**
 *      OBJETO PORTERIALOCAL
 */
function PorteriaLocal(){

    this.base = Porteria;
    this.base();

    this.elDiscoHaEntrado = function(puck){
        if(puck.x > this.INICIOPORTERIA && puck.coordsLadoDerecho() < this.FINPORTERIA){
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
PorteriaLocal.prototype.LINEADEGOL = 590;