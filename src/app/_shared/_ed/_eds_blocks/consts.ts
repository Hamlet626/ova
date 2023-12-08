export const edTileMaxWidth=300;
export const edTileMinWidth=250;

export const calcEDTileWidth=(availableWidth:number,spacing=24):number=>{
    const n=((availableWidth+spacing)/edTileMinWidth>>0);
    return Math.min((availableWidth+spacing)/n,edTileMaxWidth)-spacing;
}