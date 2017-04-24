/**
 * Created by Lance on 3/18/2017.
 */
	
	
class HololensTimer {
		constructor() {
			this.time = '00:00';
			this.active = false;
			this.countInterval = undefined;
		}
		
		/**
		 * Returns a time in the format 00:00
		 * @param text - String numbers representing minutes between 0 - 60
		 */
		_getTimeFromMinutes(text) {
			let minutes = parseInt(text);
			if (minutes < 60 && minutes >= 0) {
				return moment(text, "mm").format("mm:ss");
			} else {
				console.log('Get Time from minutes failed');
				return undefined
			}
		}
		
		getTime() {
			return this.time;
		}
	
	/**
	 * Sets time from minutes
	 * @param minutes - String numbers representing minutes between 0 - 60
	 */
		setTime(minutes) {
			this.time = this._getTimeFromMinutes(minutes);
		}
	
	/**
	 * Alerts the user the timer has finished
	 * @private
	 */
	_alert() {
			console.log('Timer Finished')
		}
		
		start() {
			if (this.time != "00:00") {
				this.active = true;
				this.countInterval = setInterval(() => {
					this.time = moment(this.time, "mmss").subtract(1, 'second').format("mm:ss");
					if (this.time == "00:00") {
						this.active = false;
						clearInterval(this.countInterval);
						this._alert();
					}
				}, 1000)
			}
		}
		
		reset() {
			this.active = false;
			this.time = '00:00';
			
			if (this.countInterval) {
				clearInterval(this.countInterval);
			}
		}
	}
/**
 * Created by Lance on 3/15/2017.
 */

(() => {



	// Update…
	let p = d3.select("#cs-hololens-timer-scene");
	
	// Run only if defined
	if (p) {
		p.selectAll("a-box")
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
	}
	
})();
/**
 * Created by Lance on 4/23/2017.
 */

// Info
//http://www.pveducation.org/pvcdrom/properties-sunlight/solar-radiation-tilted-surface

class SolarVRInfo {
	constructor() {}
	
	// updates the smodule and returns the value
	calc(tiltAngle, elevationAngle, maxSValue) {
		let sModule = maxSValue * Math.sin(elevationAngle + tiltAngle);
		return sModule;
	}
}
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
				
				let posX = -1 * (distance * Math.cos(this.elevationAngle * Math.PI/180)) + this.DEFAULT_POSX;
				let posY = (distance * Math.sin(this.elevationAngle * Math.PI/180)) + this.DEFAULT_POSY;
				let posZ = this.DEFAULT_POSZ;
				
				
				return `${posX} ${posY} ${posZ}`
			},
			solarEfficiency: function () {
				let val = 100 * Math.sin((this.elevationAngle + this.tiltAngle) * Math.PI/180);
				return Math.floor(100 * val) / 100; // floors to 2 decimal places
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
