/**
 * Created by Lance on 3/16/2017.
 */

(() => {
	
	// Update…
	var p = d3.select("#cs-new-knowledge-a-scene")
		.selectAll("a-box")
		.data(csData.new_knowledge);

// Enter…
	p.enter().append("a-box")
		.attr("color" ,"#09f")
		.attr("position", (d, i) => {return `0 ${(i*-0.6)+3.9} 0`})
		.attr("depth", "0.1")
		.attr("height", "0.5")
		.attr("width", "2.5")
		.attr("metalness", "0.1")
		.attr("roughness", "0.5")
		.attr("cursor", "")
		.append("a-text")
		.attr('value', (d) => {return `${d.blurb}`})
		.attr("position", (d, i) => {return `-1.2 0 0.05`})
		.attr('color', '#000')
		.attr('width', 5)
		.attr('height', 5);

// Exit…
	p.exit().remove();
})();

// (() => {
// 	// Element to append to
// 	let newKnowledgeElement = document.getElementById('cs-new-knowledge');
// 	const HEIGHT = newKnowledgeElement.clientHeight;
// 	const WIDTH = newKnowledgeElement.clientWidth;
//
// 	let scene = new THREE.Scene();
// 	let camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
//
// 	let renderer = new THREE.WebGLRenderer();
//
// 	// Set Color
// 	renderer.setClearColor(0xEEEEEE);
//
// 	renderer.setSize( WIDTH, HEIGHT);
// 	newKnowledgeElement.appendChild( renderer.domElement );
//
//
// 	// Box
// 	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// 	var cube = new THREE.Mesh( geometry, material );
// 	scene.add( cube );
//
// 	// Wire Frame
// 	var geo = new THREE.EdgesGeometry( geometry );
// 	var mat = new THREE.MeshBasicMaterial({
// 		color: 0x00ff00,
// 		linewidth: 2
// 	});
//
// 	var wireframe = new THREE.LineSegments( geo, mat );
// 	scene.add( wireframe );
//
// 	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// 	scene.add( directionalLight );
//
// 	camera.position.z = 5;
// 	camera.position.y = 2;
// 	camera.position.x = -0.5;
// 	camera.lookAt( new THREE.Vector3(0,0,0));
//
// 	function render() {
// 		requestAnimationFrame( render );
// 		//cube.rotation.x += 0.1;
// 		//cube.rotation.y += 0.1;
// 		renderer.render( scene, camera );
// 	}
// 	render();
// })();
