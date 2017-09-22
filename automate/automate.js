/*
 * mocha test for virtual device driver
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
		//console.log(rs)
		const typ = a[rs].type
		//console.log(typ)
		resources.then(function(b) { 
			const facades = b[typ]['0.0.1'].interfaces[0]
			//console.log(facades)
			
	//console.log(facades)
	if(facades == 'Facades/Switchable'){
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


				
				
				//done();

				// dev$.selectByID(rs).set('power', 'on').then(function(resolve, reject){
				// 	if(resolve){
				// 		dev$.selectByID(rs).get('power').then(function(c){
				// 			console.log(c)
				// 		})
				// 		dev$.selectByID(rs).set('power', 'off').then(function(resolve, reject){
				// 			if(resolve){
				// 				dev$.selectByID(rs).get('power').then(function(c){
				// 					console.log(c)
				// 					done()
				// 				})
				// 			}
				// 			else{
				// 				console.log('promise did not resolve')
				// 				done()
				// 			}
				// 		})
				// 	}
				// 	else{
				// 		console.log('promise did not resolve')
				// 		done()
				// 	}
				// })
			})
		})
			
	}
	else if(facades == 'Facades/HasBattery'){
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
	else if(facades == 'Facades/Button'){
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
	else if(facades == 'Facades/HasContact'){
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
	else if(facades == 'Facades/HasLock'){
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
			
				
				

				/*dev$.selectByID(rs).set('lock', 'lock').then(function(resolve, reject){
					if(resolve){
						dev$.selectByID(rs).get('lock').then(function(c){
							console.log(c)
						})
						dev$.selectByID(rs).set('lock', 'unlock').then(function(resolve, reject){
							if(resolve){
								dev$.selectByID(rs).get('lock').then(function(c){
									console.log(c)
									done()
								})
							}
							else{
								console.log('promise not resolved')
								done()
							}
						})
					}
					else{
						console.log('promise not resolved')
						done()
					}
				}) */
			})
		})
			
	}
	else if(facades == 'Facades/Flipflop'){
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

				//setstate('flipflop','on',rs)
				//setstate('flipflop','off',rs)
				/*dev$.selectByID(rs).set('flipflop', 'on').then(function(resolve, reject){
					if(resolve){
						dev$.selectByID(rs).get('flipflop').then(function(c){
							console.log(c)
						})
						dev$.selectByID(rs).set('flipflop', 'off').then(function(resolve, reject){
							if(resolve){
								dev$.selectByID(rs).get('flipflop').then(function(c){
									console.log(c)
									done()
								})
							}
							else{
								console.log('promise not resolved')
								done()
							}
						})
					}
					else{
						console.log('promise did not resolve')
						done()
					}	
				})*/
			})
		})
			
	}
	else if(facades == 'Facades/Humidity'){
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
	else if(facades == 'Facades/HasLuminance'){
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
	else if(facades == 'Facades/HasMotion'){
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
	else if(facades == 'Facades/Regulator'){
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
	else if(facades == 'Facades/HasSmokeAlarm'){
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
	else if(facades == 'Facades/HasTemperature'){
		describe('#test of TemperatureSensor',function(){
			this.timeout(60000)
			it('TemperatureSensor tested',function(done){
				dev$.selectByID(rs).get('temperature').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}	
	else if(facades == 'Facades/ThermostatMode'){
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
				/*dev$.selectByID(rs).set('thermostatMode', 'heat').then(function(resolve, reject){
					if(resolve){
						dev$.selectByID(rs).get('thermostatMode').then(function(c){
							console.log(c)
						})
						dev$.selectByID(rs).set('thermostatMode', 'cool').then(function(resolve, reject){
							if(resolve){
								dev$.selectByID(rs).get('thermostatMode').then(function(c){
									console.log(c)
								})
								dev$.selectByID(rs).set('thermostatMode', 'off').then(function(resolve, reject){
									if(resolve){
										dev$.selectByID(rs).get('thermostatMode').then(function(c){
											console.log(c)
								        })
										dev$.selectByID(rs).set('thermostatMode', 'auto').then(function(resolve, reject){
											if(resolve){
												dev$.selectByID(rs).get('thermostatMode').then(function(c){
													console.log(c)
													done()
												})
											}
											else{
												console.log('promise not resolved')
												done()
											}
										})	
									}
									else{
										console.log('promise not resolved')
										done()
									}
								})
							}
							else{
								console.log('promise not resolved')
								done()
							}
						})
					}
					else{
						console.log('promise not resolved')
						done()
					}
				})*/

			})						
		})
	}
	else if(facades == 'Facades/HasVibration'){
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
	else if(facades == 'Facades/HasWaterLeakDetector'){
		describe('#test of WaterLeakDetector',function(){
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
		describe('#no such facade',function(){
			this.timeout(60000)
			it('statement when there is know such facades',function(done){
				console.log('there is no such facades')
				done()
			})
		})
	}
													
		})	
	}	
})