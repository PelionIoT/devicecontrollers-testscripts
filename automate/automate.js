/*
 * mocha test for onboard devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */

var assert = require('assert')
var colors = require('colors');
var expect = require('chai').expect;
var select = dev$.select('id=*').listResources()
var resources = dev$.listResourceTypes()
var setstate = require('./stateproperty.js')

describe('#you have following onboard devices'.underline.yellow, function(){
	it('list onboard devices', function(done){
		dev$.select('id=*').listResources().then(function(resp){
			console.log(resp)
			done()
		})
	})
})
select.then(function(a){
len = Object.keys(a).length
//console.log(len)
	for(var i = 0; i < len; i++){
		const rs = Object.keys(a)[i]
		const typ = a[rs].type
		var regis = a[rs].registered
		var reach = a[rs].reachable
			resources.then(function(b) { 
			for(var j = 0; j < 19; j++){
			const facades = b[typ]['0.0.1'].interfaces[j]
			var regis = a[rs].registered
			var reach = a[rs].reachable
			
			//console.log(facades)
			
	//console.log(facades)
	if(facades == 'Facades/Switchable'){
		//console,log(regis)
		describe('#test for LightBulb'.underline.yellow,function(){
			this.timeout(60000)
			it(`LightBulb for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('power','on',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						expect(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error).to.deep.equal(null);
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('power','off', rs).then(function() {
							done();
							//resolve
						}, function(err) {
							expect(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error).to.deep.equal(null);
							console.log('Error!')
							//reject
						});
					});
				} 
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}   
			})
		})
	}
	else if(facades == 'Facades/HasBattery'){
		//console.log(regis)
		describe('#test of battery'.underline.yellow,function(){
			this.timeout(60000)
			it(`battery for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('battery').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/Button'){
		describe('#test of Button'.underline.yellow,function(){
			this.timeout(60000)
			it(`Button for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('pressed').then(function(c){
						console.log(c)
						done();
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/HasContact'){
		describe('#test of ContactSensor'.underline.yellow,function(done){
			this.timeout(60000)
			it(`ContactSensor for Id ${rs} tested`,function(){
				if(regis && reach === true){
					dev$.selectByID(rs).get('contact').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}	
	else if(facades == 'Facades/HasLock'){
		describe('#test of DoorLock'.underline.yellow, function(){
			it(`DoorLock for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					this.timeout(60000)
					setstate('lock','lock',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('lock','unlock',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					});	
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}				
			})
		})
	}
	else if(facades == 'Facades/Flipflop'){
		describe('#test of Flipflop'.underline.yellow, function(){
			this.timeout(60000)
			it(`flipflop for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('flipflop','on',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('flipflop','off',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					});		
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}			
			})
		})
	}
	else if(facades == 'Facades/Humidity'){
		describe('#test of HumiditySensor'.underline.yellow,function(){
			this.timeout(60000)
			it(`HumiditySensor for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('humidity').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/HasLuminance'){
		describe('#test of Luminance'.underline.yellow,function(){
			this.timeout(60000)
			it(`Luminance for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('luminance').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}	
	else if(facades == 'Facades/HasMotion'){
		describe('#test of MotionSensor'.underline.yellow,function(){
			this.timeout(60000)
			it(`MotionSensor for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('motion').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/Regulator'){
		describe('#test of regulator'.underline.yellow,function(){
			this.timeout(60000)
			it(`Regulator for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					console.log(`problem in the ${rs}`)
					dev$.selectByID(rs).get('regulator').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}	
	else if(facades == 'Facades/HasSmokeAlarm'){
		describe('#test of SmokeAlarm'.underline.yellow,function(){
			this.timeout(60000)
			it(`SmokeAlarm for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('smoke').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}		
	else if(facades == 'Facades/HasTemperature'){
		describe('#test of Temperature'.underline.yellow,function(){
			this.timeout(60000)
			it(`temperature for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('temperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}	
	else if(facades == 'Facades/ThermostatMode'){
		describe('#test of thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`thermostat for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('thermostatMode', 'heat',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('thermostatMode', 'cool',rs).then(function() {
								//done();
									//resolve
							}, function(err) {
								console.log('Error!')
								//reject
						}).then(function() {
							setstate('thermostatMode', 'auto',rs).then(function() {
								//done();
									//resolve
							}, function(err) {
								console.log('Error!')
								//reject
						}).then(function() {
							setstate('thermostatMode', 'off',rs).then(function() {
								done();
									//resolve
							}, function(err) {
								console.log('Error!')
								//reject
						})
							
					})		
					})		
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}

			})						
		})
	}
	else if(facades == 'Facades/HasVibration'){
		describe('#test of VibrationSensor'.underline.yellow,function(){
			this.timeout(60000)
			it(`VibrationSensor for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('vibration').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/HasWaterLeakDetector'){
		describe('#test of WaterLeakDetector'.underline.yellow,function(done){
			this.timeout(60000)
			it(`waterleak for Id ${rs} tested`,function(){
				if(regis && reach === true){
					dev$.selectByID(rs).get('waterleak').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/OccupiedCoolTemperatureLevel'){
		describe('#test of OccupiedCoolTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`OccupiedCoolTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('occupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/OccupiedHeatTemperatureLevel'){
		describe('#test of occupiedHeatTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`OccupiedHeatTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('occupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/OccupiedAutoTemperatureLevel'){
		describe('#test of occupiedAutoTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`OccupiedAutoTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('occupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedCoolTemperatureLevel'){
		describe('#test of unoccupiedCoolTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`unoccupiedCoolTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('unoccupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedHeatTemperatureLevel'){
		describe('#test of unoccupiedHeatTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`unoccupiedHeatTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('unoccupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedAutoTemperatureLevel'){
		describe('#test of unoccupiedAutoTemperatureLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`unoccupiedAutoTemperatureLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('unoccupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/ThermostatReturnTemperature'){
		describe('#test of returnTemperature for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`returnTemperature for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('returnTemperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/ThermostatSupplyTemperature'){
		describe('#test of supplyTemperature for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`ThermostatSupplyTemperature for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('supplyTemperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/ThermostatDeadband'){
		describe('#test of deadband for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`deadband for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('deadband').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/ThermostatW1Status'){
		describe('#test of w1Status for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`w1Status for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('w1Status','open',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('w1Status','close',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatW2Status'){
		describe('#test of w2Status for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`w2Status for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('w2Status','open',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('w2Status','close',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatY1Status'){
		describe('#test of y1Status for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`y1Status for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('y1Status','open',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('y1Status','close',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatY2Status'){
		describe('#test of y2Status for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`y2Status for  Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('y2Status','open',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('y2Status','close',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatGStatus'){
		describe('#test of gStatus for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`gStatus for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('gStatus','open',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('gStatus','close',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/KeypadLockLevel'){
		describe('#test of keypadLockLevel for thermostat'.underline.yellow,function(){
			this.timeout(60000)
			it(`keypadLockLevel for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					dev$.selectByID(rs).get('keypadLockLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})					
		})
	}
	else if(facades == 'Facades/TemperatureDisplayMode'){
		describe('#test of temperatureDisplayMode for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`temperatureDisplayMode for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('temperatureDisplayMode','celsius',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('temperatureDisplayMode','fahrenheit',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/OccupancyMode'){
		describe('#test of occupancyMode for thermostat'.underline.yellow, function(){
			this.timeout(60000)
			it(`occupancyMode for Id ${rs} tested`,function(done){
				if(regis && reach === true){
					setstate('occupancyMode','occupied',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('occupancyMode','unoccupied',rs).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${rs}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
}
													
		})	
	}	
})