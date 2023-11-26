
//  AQUÍ CARGAREMOS TODOS LOS ELEMENTOS NECESARIOS 
//  PARA EL CORRECTO FUNCIONAMIENTO DE LA APLCACIÓN

//  RECORDS
//localStorage.removeItem("records");
Records.reloadRecordsFromLocalStorage();

//  ASSETS

const HOCKEYASSETS = Assets.getAsset(Assets.HOCKEYASSETSFILEPATH);
const BACKGROUND = Assets.getAsset(Assets.BACKGROUNDFILEPATH);