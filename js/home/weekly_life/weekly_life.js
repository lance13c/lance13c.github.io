/**
 * Created by Lance on 3/16/2017.
 */

(() => {
	
	// Update…
	var p = d3.select("#cs-weekly-life")
		.data(csData.new_knowledge)
		.append("path")
		.attr("d", arc)
		

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
	
	p.exit().remove();
})();

