/**
 * Created by Lance on 7/29/2017.
 */

(() => {
	let gift2 = $('#gift2');
	let gift2Content = $('#gift2-content');
	
	let gift1 = $('#gift1');
	let gift1Content = $('#gift1-content');
	
	let card1 = $('#card1');
	let card2 = $('#card2');
	
	gift2.on('click touch', (e) => {
		gift2Content.addClass('j-open');
		gift2.addClass('j-hide');
		console.log('happened');
	});
	
	
	gift1.on('click touch', (e) => {
		gift1Content.addClass('j-open');
		gift1.addClass('j-hide');
		console.log('happened');
	});
	
	card1.on('click touch', (e) => {
		card2.addClass('j-open');
		card1.addClass('j-open-up');
		console.log('happened');
	});
})();
