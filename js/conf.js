

//  Este fichero se encarga de cargar las rutas de los assets de la aplicación

const HOCKEYASSETSFILEPATH = "src/assets/sprite/hockey_assets.png";
const BACKGROUNDFILEPATH = "src/assets/backgroundCanvas.png";

/**
 * Esta función se encarga de obtener un asset 
 * de la aplicación con la ruta que recibe la función
 * @param {string} filePath 
 * @returns {HTMLImageElement}
 */
function getAsset(filePath){
    let asset = new Image();
    asset.src=filePath;
    return asset;
}

const HOCKEYASSETS = getAsset(HOCKEYASSETSFILEPATH);
const BACKGROUND = getAsset(BACKGROUNDFILEPATH);