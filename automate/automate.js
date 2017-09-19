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

describe('#you have following resources with their status', function(){
	it('you have the above resources with there status', function(done){
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
		describe('#checking the LightBulb resorce',function(){
			//console.log(facades)
			it('test of LightBulb compleate',function(done){

<<<<<<< HEAD
				var setvalue1 = 'on'
				dev$.selectByID(rs).set('power', setvalue1).then(function(setResp) {
=======
				var setvalue = 'on'
				dev$.selectByID(rs).set('power', setvalue).then(function(setResp) {
>>>>>>> f5a30cd77f655f7cb7cede34260930ca759a398c
					if(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error === null) {
						//Successfuly set the power to 'on'
						dev$.selectByID(rs).get('power').then(function(getResp) {
							if(getResp && getResp[rs] && getResp[rs].response && typeof getResp[rs].response.result !== 'undefined') {
<<<<<<< HEAD
								if(getResp[rs].response.result == setvalue1) {
									console.log(getResp)
									//Previous set successfully set the power value to 'on'
									done();
								}
							} else {
								console.log('something is undefined')
								//Failed to get response
								done()
							}
						}, function(err) {
							console.log('Error!')
							//Failed to get response
							done()
						});
					} else {
						console.log('some issue while powering on')
						//Failed to set the power to 'on'
						done()
					}
				}, function(err) {
					console.log('Error!')
					//Failed to set the power to 'on'
					done()
=======
								if(getResp[rs].response.result == setvalue) {
									//Previous set successfully set the power value to 'on'
								}
							} else {
								//Failed to get response
							}
						}, function(err) {
							//Failed to get response
						});
					} else {
						//Failed to set the power to 'on'
					}
				}, function(err) {
					//Failed to set the power to 'on'
>>>>>>> f5a30cd77f655f7cb7cede34260930ca759a398c
				});

				

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
		describe('#checking the HasBattery resorce',function(){
			it('test of Battery compleate',function(done){
				dev$.selectByID(rs).get('battery').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}
	else if(facades == 'Facades/Button'){
		describe('#checking the Button resorce',function(){
			it('test of button compleate',function(done){
				dev$.selectByID(rs).get('pressed').then(function(c){
					console.log(c)
					done();
				})
			})						
		})
	}
	else if(facades == 'Facades/HasContact'){
		describe('#checking the ContactSensor resorce',function(done){
			it('test of ContactSensor compleate',function(){
				dev$.selectByID(rs).get('contact').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}	
	else if(facades == 'Facades/HasLock'){
		describe('#checking the DoorLock resorce',function(){
			it('test of DoorLock compleate',function(done){
				dev$.selectByID(rs).set('lock', 'lock').then(function(resolve, reject){
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
				})
			})						
		})
	}
	else if(facades == 'Facades/Flipflop'){
		describe('#checking the Flipflop resorce',function(){
			it('test of flipflop compleate',function(done){
				dev$.selectByID(rs).set('flipflop', 'on').then(function(resolve, reject){
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
								console.log('promish not resolved')
								done()
							}
						})
					}
					else{
						console.log('promise did not resolve')
						done()
					}	
				})
			})						
		})
	}
	else if(facades == 'Facades/Humidity'){
		describe('#checking the HumiditySensor resorce',function(){
			it('test of HumiditySensor compleate',function(done){
				dev$.selectByID(rs).get('humidity').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}
	else if(facades == 'Facades/HasLuminance'){
		describe('#checking the Luminance resorce',function(){
			it('test of Luminance compleate',function(done){
				dev$.selectByID(rs).get('luminance').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}	
	else if(facades == 'Facades/HasMotion'){
		describe('#checking the MotionSensor resorce',function(){
			it('test of MotionSensor compleate',function(done){
				dev$.selectByID(rs).get('motion').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}
	else if(facades == 'Facades/Regulator'){
		describe('#checking the Regulator resorce',function(){
			it('test of Regulator compleate',function(done){
				dev$.selectByID(rs).get('regulator').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}	
	else if(facades == 'Facades/HasSmokeAlarm'){
		describe('#checking the SmokeAlarm resorce',function(){
			it('test of SmokeAlarm compleate',function(done){
				dev$.selectByID(rs).get('smoke').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}		
	else if(facades == 'Facades/HasTemperature'){
		describe('#checking the Temperature resorce',function(){
			it('test of Temperature compleate',function(done){
				dev$.selectByID(rs).get('temperature').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}	
	else if(facades == 'Facades/ThermostatMode'){
		describe('#checking the ThermostatMode resorce',function(){
			it('test of ThermostatMode compleate',function(done){
				dev$.selectByID(rs).set('thermostatMode', 'heat').then(function(resolve, reject){
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
				})
			})						
		})
	}
	else if(facades == 'Facades/HasVibration'){
		describe('#checking the Vibration resorce',function(){
			it('test of Vibration compleate',function(done){
				dev$.selectByID(rs).get('vibration').then(function(c){
					console.log(c)
					done()
				})
			})						
		})
	}
	else if(facades == 'Facades/HasWaterLeakDetector'){
		describe('#checking the WaterLeakDetector resorce',function(){
			it('test of WaterLeakDetector compleate',function(){
				dev$.selectByID(rs).get('waterleak').then(function(c){
					console.log(c)
					done()
				})
			})					
		})
	}	
	else{
		describe('#no such facade',function(){
			it('statement when there is know such facades',function(done){
				console.log('there is no such facades')
				done()
			})
		})
	}
													
		})	
	}	
})