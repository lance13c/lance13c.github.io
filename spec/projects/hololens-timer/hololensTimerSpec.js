/**
 * Created by Lance on 3/18/2017.
 */
describe('HoloLensTimer', () => {
	
	beforeEach(() => {
		this.hololensTimer = new HololensTimer();
	});
	
	describe('_getTimeFromMinutes', () => {
		it('should return undefined for value more or equal to 60', () => {
			const value = this.hololensTimer._getTimeFromMinutes('60');
			expect(value).toEqual(undefined);
		});
		
		it('should return mm:ss string for minutes between 0 & 60', () => {
			const value = this.hololensTimer._getTimeFromMinutes('59');
			expect(value).toEqual('59:00');
		});
		
		it('should return undefined for minutes less than to 60', () => {
			const value = this.hololensTimer._getTimeFromMinutes('-1');
			expect(value).toEqual(undefined);
		});
	});
	
	describe('getTime & setTime', () => {
		it('should return a default string of 00:00', () => {
			const value = this.hololensTimer.getTime();
			expect(value).toEqual('00:00');
		});
		
		it('should return the newly set time as mm:ss', () => {
			this.hololensTimer.setTime('10');
			const value = this.hololensTimer.getTime();
			expect(value).toEqual('10:00');
		});
		
		it('should return the newly set time as mm:ss', () => {
			this.hololensTimer.setTime('-1');
			const value = this.hololensTimer.getTime();
			expect(value).toEqual(undefined);
		});
		
		it('should return the newly set time as mm:ss', () => {
			this.hololensTimer.setTime('60');
			const value = this.hololensTimer.getTime();
			expect(value).toEqual(undefined);
		});
	});
	
	describe('start', () => {
		it('should return the same 00:00 with previous time setting', () => {
			this.hololensTimer.start();
			const value = this.hololensTimer.getTime();
			expect(value).toEqual('00:00');
		});
		
		it('should return the same 00:00 with previous time setting', () => {
			this.hololensTimer.start();
			const value = this.hololensTimer.getTime();
			expect(value).toEqual('00:00');
		});
		
	});
	
});