/**
 * Created by Lance on 4/23/2017.
 */

(() => {
	
	const solarVRInfo = new SolarVRInfo();
	
	/**
	 * Created by Lance on 4/9/2017.
	 */
	
	const solar_vr_app = new Vue({
		el: '#cs-solar-vr-section',
		data: {
			sModule: 0,
			tiltAngle: 0,
			elevationAngle: 0,
			DEFAULT_POSX: 0,
			DEFAULT_POSY: 3,
			DEFAULT_POSZ: -4
		},
		computed: {
			getRotation: function() {
				return `0 0 ${this.tiltAngle}`;
			},
			lightPosition: function () {
				const distance = 5;
				
				let posX = (distance * Math.sin(this.elevationAngle)) + this.DEFAULT_POSX;
				let posY = (distance * Math.cos(this.elevationAngle)) + this.DEFAULT_POSY;
				let posZ = this.DEFAULT_POSZ;
				
				
				return `${posX} ${posY} ${posZ}`
			},
			solarEfficiency: function () {
				let val = 100 * Math.sin((this.elevationAngle + this.tiltAngle) * Math.PI/180);
				return Math.floor(val);
			}
		},
		delimiters: ['<%', '%>']
	});

	// On click handlers
	let tiltAngleE = $('#cs-solar-vr-tilt-angle');
	let elevationAngleE = $('#cs-solar-vr-elevation-angle');
	
	tiltAngleE.on('input', (e) => {
		Vue.set(solar_vr_app, 'tiltAngle', parseInt(e.target.value));
	});
	
	elevationAngleE.on('input', (e) => {
		Vue.set(solar_vr_app, 'elevationAngle', parseInt(e.target.value));
	});
	
	// AFRAME.registerComponent('a-cs-solar-panel', {
	// 	schema: {
	//
	// 	},
	// 	init: function () {
	// 		this.solarVRInfo = solarVRInfo;
	// 	},
	// 	update: function () {},
	// 	tick: function () {},
	// 	remove: function () {},
	// 	pause: function () {},
	// 	play: function () {}
	// });
	
	// AFRAME.registerComponent('a-cs-solar-display', {
	// 	schema: {
	//
	// 	},
	// 	init: function () {
	// 		this.solarVRInfo = solarVRInfo;
	// 	},
	// 	update: function () {},
	// 	tick: function () {},
	// 	remove: function () {},
	// 	pause: function () {},
	// 	play: function () {}
	// });
})();
