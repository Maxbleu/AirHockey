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
                    list[iterador].tiempo, 
                    list[iterador].dificultad,
                    list[iterador].nameDificultad
                    )
                );
        }
    }

    static saveRecordInList(record){

        //  Guardamos el record en la lista
        this.listRecords.push(record);

		//	Ordenamos los records desde el de mayor dificultad a menos
		this.listRecords.sort(function(record, nextRecord){
			return nextRecord.dificultad - record.dificultad;
		});

        //  Guardamos los records en localStorage con el nuevo record guardado
        localStorage.setItem(this.KEYARRAYRECORDS, JSON.stringify(this.listRecords));
    }

    static showListRecords(tablaRecords){

        while (tablaRecords.firstChild) {
            tablaRecords.removeChild(tablaRecords.firstChild);
        }

        for(let iterador = 1; iterador<=this.listRecords.length; iterador++){
            let liElement = document.createElement("li");
            liElement.textContent = `${iterador}. ${this.listRecords[iterador-1].toStringRecord()}`;
            tablaRecords.append(liElement);
        }

    }

}