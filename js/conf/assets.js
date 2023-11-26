/**
 *      OBJETO ASSETS
 */
class Assets{

    static HOCKEYASSETSFILEPATH = "src/assets/sprite/hockey_assets.png";
    static BACKGROUNDFILEPATH = "src/assets/backgroundCanvas.png";

    static getAsset(filePath){
        let asset = new Image();
        asset.src=filePath;
        return asset;
    }

}