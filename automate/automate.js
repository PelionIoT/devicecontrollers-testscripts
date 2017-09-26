/*
 * mocha test for onboard devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */

var assert = require('assert')
var expect = require('chai').expect;
var select = dev$.select('id=*').listResources()
var resources = dev$.listResourceTypes()
var setstate = require('./stateproperty.js')

describe('#you have following onboard devices', function(){
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
		var regis = a[rs].registered
		var reach = a[rs].reachable
		//console.log(reach)
		//console.log(rs)
		const typ = a[rs].type
		//console.log(typ)
		resources.then(function(b) { 
			for(var j = 0; j < 19; j++){
			const facades = b[typ]['0.0.1'].interfaces[j]
			
			//console.log(facades)
			
	//console.log(facades)
	if(facades == 'Facades/Switchable'){
		if(regis && reach === true){
			describe('#test for LightBulb',function(){
				this.timeout(60000)
				it('LightBulb tested',function(done){
					setstate('power','on',rs).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('power','off', rs).then(function() {
							done();
							//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					});    
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/HasBattery'){
		if(regis && reach === true){
			describe('#test of battery',function(){
				this.timeout(60000)
				it('battery tested',function(done){
					dev$.selectByID(rs).get('battery').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/Button'){
		if(regis && reach === true){
			describe('#test of Button',function(){
				this.timeout(60000)
				it('Button tested',function(done){
					dev$.selectByID(rs).get('pressed').then(function(c){
						console.log(c)
						done();
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/HasContact'){
		if(regis && reach === true){
			describe('#test of ContactSensor',function(done){
				this.timeout(60000)
				it('ContactSensor tested',function(){
					dev$.selectByID(rs).get('contact').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}	
	else if(facades == 'Facades/HasLock'){
		if(regis && reach === true){
			describe('#test of DoorLock', function(){
				it('DoorLock tested',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/Flipflop'){
		if(regis && reach === true){
			describe('#test of Flipflop', function(){
				this.timeout(60000)
				it('Flipflop tested',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/Humidity'){
		if(regis && reach === true){
			describe('#test of HumiditySensor',function(){
				this.timeout(60000)
				it('HumiditySensor tested',function(done){
					dev$.selectByID(rs).get('humidity').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/HasLuminance'){
		if(regis && reach === true){
			describe('#test of Luminance',function(){
				this.timeout(60000)
				it('luminance tested',function(done){
					dev$.selectByID(rs).get('luminance').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}	
	else if(facades == 'Facades/HasMotion'){
		if(regis && reach === true){
			describe('#test of MotionSensor',function(){
				this.timeout(60000)
				it('MotionSensor tested',function(done){
					dev$.selectByID(rs).get('motion').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/Regulator'){
		if(regis && reach === true){
			describe('#test of regulator',function(){
				this.timeout(60000)
				it('Regulator tested',function(done){
					dev$.selectByID(rs).get('regulator').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}	
	else if(facades == 'Facades/HasSmokeAlarm'){
		if(regis && reach === true){
			describe('#test of SmokeAlarm',function(){
				this.timeout(60000)
				it('SmokeAlarm tested',function(done){
					dev$.selectByID(rs).get('smoke').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}		
	else if(facades == 'Facades/HasTemperature'){
		if(regis && reach === true){
			describe('#test of Temperature',function(){
				this.timeout(60000)
				it('TemperatureSensor tested',function(done){
					dev$.selectByID(rs).get('temperature').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}	
	else if(facades == 'Facades/ThermostatMode'){
		if(regis && reach === true){
			describe('#test of thermostat',function(){
				this.timeout(60000)
				it('thermostat tested',function(done){
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
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/HasVibration'){
		if(regis && reach === true){
			describe('#test of VibrationSensor',function(){
				this.timeout(60000)
				it('VibrationSensor tested',function(done){
					dev$.selectByID(rs).get('vibration').then(function(c){
						console.log(c)
						done()
					})
				})						
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/HasWaterLeakDetector'){
		if(regis && reach === true){
			describe('#test of WaterLeakDetector',function(done){
				this.timeout(60000)
				it('WaterLeakDetector tested',function(){
					dev$.selectByID(rs).get('waterleak').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/OccupiedCoolTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of OccupiedCoolTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('OccupiedCoolTemperatureLevel for thermostat tested',function(done){
					dev$.selectByID(rs).get('occupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/OccupiedHeatTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of occupiedHeatTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('occupiedHeatTemperatureLevel tested for thermostat',function(done){
					dev$.selectByID(rs).get('occupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/OccupiedAutoTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of occupiedAutoTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('occupiedAutoTemperatureLevel tested for thermostat',function(done){
					dev$.selectByID(rs).get('occupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/UnoccupiedCoolTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of unoccupiedCoolTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('unoccupiedCoolTemperatureLevel tested for thermostat',function(done){
					dev$.selectByID(rs).get('unoccupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/UnoccupiedHeatTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of unoccupiedHeatTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('unoccupiedHeatTemperatureLevel tested for thermostat',function(done){
					dev$.selectByID(rs).get('unoccupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/UnoccupiedAutoTemperatureLevel'){
		if(regis && reach === true){
			describe('#test of unoccupiedAutoTemperatureLevel for thermostat',function(){
				this.timeout(60000)
				it('test of unoccupiedAutoTemperatureLevel for thermostat',function(done){
					dev$.selectByID(rs).get('unoccupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatReturnTemperature'){
		if(regis && reach === true){
			describe('#test of returnTemperature for thermostat',function(){
				this.timeout(60000)
				it('test of returnTemperature for thermostat',function(done){
					dev$.selectByID(rs).get('returnTemperature').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatSupplyTemperature'){
		if(regis && reach === true){
			describe('#test of supplyTemperature for thermostat',function(){
				this.timeout(60000)
				it('test of supplyTemperature for thermostat',function(done){
					dev$.selectByID(rs).get('supplyTemperature').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatDeadband'){
		if(regis && reach === true){
			describe('#test of deadband for thermostat',function(){
				this.timeout(60000)
				it('test of deadband for thermostat',function(done){
					dev$.selectByID(rs).get('deadband').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatW1Status'){
		if(regis && reach === true){
			describe('#test of w1Status for thermostat', function(){
				this.timeout(60000)
				it('w1Status tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatW2Status'){
		if(regis && reach === true){
			describe('#test of w2Status for thermostat', function(){
				this.timeout(60000)
				it('w2Status tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatY1Status'){
		if(regis && reach === true){
			describe('#test of y1Status for thermostat', function(){
				this.timeout(60000)
				it('y1Status tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatY2Status'){
		if(regis && reach === true){
		describe('#test of y2Status for thermostat', function(){
				this.timeout(60000)
				it('y2Status tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/ThermostatGStatus'){
		if(regis && reach === true){
			describe('#test of gStatus for thermostat', function(){
				this.timeout(60000)
				it('gStatus tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/KeypadLockLevel'){
		if(regis && reach === true){
			describe('#test of keypadLockLevel for thermostat',function(){
				this.timeout(60000)
				it('test of keypadLockLevel for thermostat',function(done){
					dev$.selectByID(rs).get('keypadLockLevel').then(function(c){
						console.log(c)
						done()
					})
				})					
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/TemperatureDisplayMode'){
		if(regis && reach === true){
			describe('#test of temperatureDisplayMode for thermostat', function(){
				this.timeout(60000)
				it('temperatureDisplayMode tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
	else if(facades == 'Facades/OccupancyMode'){
		if(regis && reach === true){
			describe('#test of occupancyMode for thermostat', function(){
				this.timeout(60000)
				it('occupancyMode tested for thermostat',function(done){
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
				})
			})
		}
		else{
			console.log('device not registered and reachable')
		}
	}
}
													
		})	
	}	
})