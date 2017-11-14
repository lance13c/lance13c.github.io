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