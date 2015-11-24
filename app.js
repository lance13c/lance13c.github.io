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

    function init() {
        var grid = generateGrid({itemSize: 20, space: 1});
        var changeNumber = 5; // Number of tiles that will change per event

        window.onload = function () {
            var phrase = "Graphics";
            grid.map(function (graphic) {
                console.log(phrase);
            });
        };

        window.onclick = function () {
            var phrase = "Clicking everything I can";
            for (var i = 0; i < changeNumber; i++) {
                var graphics = grid[Math.round((Math.random() * grid.length))];
                graphics.clear();
                graphics.beginFill(0x0000ff);
                graphics.lineStyle(5, 0x0000ff);
                graphics.drawRect(graphics.x, graphics.y, graphics.size, graphics.size);
                graphics.endFill();
                console.log(phrase);
            }
        };

        window.onkeydown = function () {
            var phrase = "Key is going down";
            for (var i = 0; i < changeNumber; i++) {
                var graphics = grid[Math.round((Math.random() * grid.length))];
                graphics.clear();
                graphics.beginFill(0xff00ff);
                graphics.lineStyle(5, 0xff00ff);
                graphics.drawRect(graphics.x, graphics.y, graphics.size, graphics.size);
                graphics.endFill();
                console.log(phrase);
            }
        };

        //Mouse out will give the ability to see mouse movement through divs
        window.onmouseout = function () {
            var phrase = "I'm moving through the divs";
            for (var i = 0; i < changeNumber; i++) {
                var graphics = grid[Math.round((Math.random() * grid.length))];
                graphics.clear();
                graphics.beginFill(0xffff00);
                graphics.lineStyle(5, 0xffff00);
                graphics.drawRect(graphics.x, graphics.y, graphics.size, graphics.size);
                graphics.endFill();
                console.log(phrase);
            }
        };

        window.onscroll = function () {
            var phrase = "Just keep scrolling just keep scrolling...";
            for (var i = 0; i < changeNumber; i++) {
                var graphics = grid[Math.round((Math.random() * grid.length))];
                graphics.clear();
                graphics.beginFill(0xffff00);
                graphics.lineStyle(5, 0xffff00);
                graphics.drawRect(graphics.x, graphics.y, graphics.size, graphics.size);
                graphics.endFill();
                console.log(phrase);
            }
        };

        setInterval(update, 20);
    }

    function update() {

        renderer.render(stage);
    }

    init();
}());

