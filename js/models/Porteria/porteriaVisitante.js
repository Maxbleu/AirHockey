/**
 *      OBJEETO PORTERIAVISITANTE
 */
class PorteriaVisitante extends Porteria{

    LINEADEGOL = 7;

    constructor(){
        super();
    }

    elDiscoHaEntrado(puck){
        if(puck.x > this.INICIOPORTERIA && puck.coordsLadoDerecho() < this.FINPORTERIA){
            if(puck.coordsParteAbajo() < this.LINEADEGOL){
                console.log("GOL Del Local!!!!");
                return true;
            }
        }
        return false;
    }
}