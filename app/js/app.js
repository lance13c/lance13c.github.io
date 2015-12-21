/**
 * Created by Lance on 11/22/2015.
 */

(function() {
// Creates stage and sets background color

    var stage = new PIXI.Stage(0xFFFFFF);

    const WIDTH = document.body.clientWidth;
    const HEIGHT = document.body.clientHeight;

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);

    var Tile = {
        // Creates a graphic which represents a tile on the grid
        // Generates grid calls this function
        //  x - width position in pixels
        //  y - height position in pixels
        //  size - size of grid item in pixels, includes both width and height. Ex: 32
        createTile: function (x, y, size) {
            var graphics = new PIXI.Graphics();
            graphics.x = x;
            graphics.y = y;
            graphics.size = size;

            graphics.click = function (e) {
                graphics.clear();
                graphics.beginFill(0xff0000);
                graphics.lineStyle(5, 0x0ff00000);
                graphics.drawRect(x, y, size, size);
                graphics.endFill();
            };

            graphics.beginFill(0x00ff00);
            graphics.lineStyle(5, 0x00ff00);
            graphics.hitArea = new PIXI.Rectangle(x, y, size, size);
            graphics.drawRect(x, y, size, size);
            graphics.interactive = true;
            graphics.endFill();
            return graphics;
        }
    };

    // Generates a grid of rectangles
    //gridSpecs - an object with attributes
    //  itemSize - size of grid item in pixels, includes both width and height. Ex: 32
    //  space - size gap between items in pixels. Ex: 10
    // Returns - 1D array of graphic objects
    function generateGrid(gridSpecs) {


        //In Pixels
        var gridItemSize = gridSpecs.itemSize || 32;
        var gridItemSpace = gridSpecs.space || 10;
        var grid = []; // Array of graphics

        //Generate grid
        for (var i = 0; i < HEIGHT; i += (gridItemSize + gridItemSpace)) {
            for (var j = 0; j < WIDTH; j += (gridItemSize + gridItemSpace)) {
                var graphic = Tile.createTile(j, i, gridItemSize);
                grid.push(graphic);
                stage.addChild(graphic);
            }
        }
        return grid;
    }

    /**
     *
     * @param event - window event
     * @param color - hex color
     * @param phrase - string to display on the screen
     * @param grid - A single array of tiles that represent a 2d array
     * @param changeNumber - Number of blocks that have changed
     */
    function responseEvent(event, color, phrase, grid, changeNumber) {
        var cn = changeNumber || 3;
        window[event] = function () {
            for (var i = 0; i < cn; i++) {
                var graphics = grid[Math.round((Math.random() * grid.length))];
                graphics.clear();
                graphics.beginFill(color);
                graphics.lineStyle(5, color); // Value 5 = the line size
                graphics.drawRect(graphics.x, graphics.y, graphics.size, graphics.size);
                graphics.endFill();
                console.log(phrase);
            }
            Materialize.toast(phrase, 500, 'rounded');
        };
    }

    function init() {
        var grid = generateGrid({itemSize: 20, space: 1});
        var changeNumber = 5; // Number of tiles that will change per event

        window.onload = function () {
            var phrase = "Graphics";
            grid.map(function (graphic) {
                console.log(phrase);
            });
        };

        //Mouse Events
        responseEvent('onclick', 0x0000ff, "Clicking everything I can", grid, changeNumber);
        responseEvent('onkeydown', 0xff00ff, "Key is going down", grid, changeNumber);
        responseEvent('onmouseout', 0xffff00, "I'm moving through the divs", grid, changeNumber);
        responseEvent('onscroll', 0xffff00, "Just keep scrolling just keep scrolling...", grid, changeNumber);
        //Touch Events
        responseEvent('touchmove', 0xf0ffff, "Swiping the screen all day", grid, changeNumber);
        responseEvent('touchstart', 0x0f0fff, "Touch", grid, changeNumber);

        setInterval(update, 20);
    }

    //Re-renders the screen
    function update() {
        renderer.render(stage);
    }

    init();
}());

