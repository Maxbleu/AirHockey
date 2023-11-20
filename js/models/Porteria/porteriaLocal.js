/**
 *      OBJETO PORTERIALOCAL
 */
class PorteriaLocal extends Porteria{

    LINEADEGOL = 590;

    constructor(){
        super();
    }

    elDiscoHaEntrado(puck){
        if(puck.x > this.INICIOPORTERIA && puck.coordsLadoDerecho() < this.FINPORTERIA){
            if(puck.y > this.LINEADEGOL){
                console.log("GOL Del Visitante!!!!");
                return true;
            }
        }
        return false;
    }
}