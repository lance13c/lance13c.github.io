/**
 * Created by Lance on 9/5/2016.
 */


(() => {
	
	// Constants
	const navHeight = 63; //px
	
	// Changes the body to full height & width
	function resize() {
		$("body").css('height', $(window).height());
		$("body").css('width', $(window).width());
		$(".cs-content").css('height', $(window).height() - navHeight);
	}
	resize();
	
	// Triggers resize on every screen size change
	$(window).on("resize onorientationchange", (e) => {
		resize();
	});
	
	// Init Side Nav
	$(".cs-mobile-menu").sideNav({
		edge: 'right'
	});
	
	// Mobile Back Button
	$(".cs-mobile-back").on('click touchend', () => {
		history.back();
	});
	
})();


