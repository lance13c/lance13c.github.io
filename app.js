/**
 * Created by Lance on 11/22/2015.
 */

// Creates stage and sets background color
var stage = new PIXI.Stage(0xFFFFFF);

const WIDTH = document.body.clientWidth;
const HEIGHT =  document.body.clientHeight;

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);




// Creates a graphic which represents a tile on the grid
// Generates grid calls this function
//  x - width position in pixels
//  y - height position in pixels
//  size - size of grid item in pixels, includes both width and height. Ex: 32
function createTile(x, y, size){
    var graphics = new PIXI.Graphics();
    /*
    graphics.onMouseMove = function (e) {
        console.log(this, e);
        graphics.beginFill(0xff0000);
        graphics.endFill();
    };

    graphics.onMouseOut = function (e) {
        graphics.beginFill(0xff0000);
        graphics.endFill();
    };
    */
    graphics.beginFill(0x00ff00);
    graphics.lineStyle(5, 0x00ff00);
    graphics.drawRect(x, y, size, size);
    graphics.endFill();
    return graphics;

}

// Generates a grid of rectangles
//gridSpecs - an object with attributes
//  itemSize - size of grid item in pixels, includes both width and height. Ex: 32
//  space - size gap between items in pixels. Ex: 10
function generateGrid(gridSpecs) {


    //In Pixels
    var gridItemSize = gridSpecs.itemSize | 32;
    var gridItemSpace = gridSpecs.space | 10;

    //Generate grid
    for(var i = 0; i < HEIGHT; i += (gridItemSize + gridItemSpace)){
        for (var j = 0; j < WIDTH; j += (gridItemSize + gridItemSpace)){
            stage.addChild(createTile(i, j, gridItemSize, gridItemSpace));
        }
    }

    renderer.render(stage);
}


generateGrid({});
