/**
 *      OBJETO RECORDS
 */
class Records{

    static KEYARRAYRECORDS = "records";

    static listRecords = [];

    static reloadRecordsFromLocalStorage(){
        let list = JSON.parse(localStorage.getItem(this.KEYARRAYRECORDS));
        if(list !== null) {this.convertirEnListRecords(list);}
    }

    static convertirEnListRecords(list){
        for(let iterador = 0; iterador<list.length; iterador++){
            this.listRecords.push(
                new Record(
                    list[iterador].nombre,
                    new TiempoJugado(
                        list[iterador].tiempoJugado.minutos,
                        list[iterador].tiempoJugado.segundos
                    ),
                    new Dificultad(
                        list[iterador].dificultad.valor,
                        list[iterador].dificultad.nombre
                        )
                    )
                );
        }
    }

    static ordenarPorDificultadYTiempo(record, siguienteRecord) {
        let dificultadActual = record.dificultad.valor;
        let dificultadOtro = siguienteRecord.dificultad.valor;

        if (dificultadActual !== dificultadOtro) {

            return dificultadOtro - dificultadActual;
        
        } else {

            let diferenciaEnSegundos = siguienteRecord.tiempoJugado.minutos - record.tiempoJugado.minutos;
            if(diferenciaEnSegundos !== 0){
                return record.tiempoJugado.minutos - siguienteRecord.tiempoJugado.minutos;
            }

            return record.tiempoJugado.segundos - siguienteRecord.tiempoJugado.segundos;

        }
    }

    static saveRecordInList(record){

        //  Guardamos el record en la lista
        this.listRecords.push(record);

		this.listRecords.sort(this.ordenarPorDificultadYTiempo);

        //  Guardamos los records en localStorage con el nuevo record guardado
        localStorage.setItem(this.KEYARRAYRECORDS, JSON.stringify(this.listRecords));
    }

}