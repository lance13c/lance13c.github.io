/**
 * Created by Lance on 11/22/2015.
 */

// Creates stage and sets background color
var stage = new PIXI.Stage(0xFFFFFF);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(document.body.clientWidth, document.body.clientHeight);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimeFrame( animate );

function animate() {

    requestAnimFrame( animate );

    // render the stage
    renderer.render(stage);
}