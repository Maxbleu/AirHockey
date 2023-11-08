

//  Este fichero se encarga de cargar las rutas de los assets de la aplicación

const SPRITECOMECOCOSFILEPATH = "sprite/spriteComecocos.png";
const ASSETSHOCKEYFILEPATH = "assets/assetsHockey.png";

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

const SPRITECOMECOCOS = getAsset(SPRITECOMECOCOSFILEPATH);
const ASSETSHOCKEY = getAsset(ASSETSHOCKEYFILEPATH);