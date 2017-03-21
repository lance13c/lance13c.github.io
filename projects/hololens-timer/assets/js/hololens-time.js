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