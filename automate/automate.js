var assert = require('assert')
var expect = require('chai').expect;


describe('WigWag Inc test for automate', function(){
	describe('#you have following resources with their status', function(){
		it('you have the above resources with there status', function(done){
			dev$.select('id=*').listResources().then(function(resp){
				console.log(resp)
				done()
			})
		})
	})				
	describe('#checking all the resources',function(){
		it('this is the automate check for the mocha',function(done){
			dev$.select('id=*').listResources().then(function(a) { 
				len = Object.keys(a).length
				dev$.select('id=*').listResources().then(function(a) {
					for(var i = 0; i < len; i++){
						const rs = Object.keys(a)[i]
						dev$.select('id=*').listResources().then(function(a){
							const typ = a[rs].type
							dev$.listResourceTypes().then(function(b) { 
								const facades = b[typ]['0.0.1'].interfaces[0] 
								if(facades == 'Facades/Switchable'){
									dev$.selectByID(rs).set('power', 'on').then(function(resolve, reject){
										if(resolve){
											dev$.selectByID(rs).get('power').then(function(c){
												console.log(c)
											})
											dev$.selectByID(rs).set('power', 'off').then(function(resolve, reject){
												if(resolve){
													dev$.selectByID(rs).get('power').then(function(c){
														console.log(c)
													})
												}
												else{
													console.log('promise did not resolve')
												}
											})
										}
										else{
											console.log('promise did not resolve')
										}
									})
								}
								else if(facades == 'Facades/HasBattery'){
									dev$.selectByID(rs).get('battery').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/Button'){
									dev$.selectByID(rs).get('pressed').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasContact'){
									dev$.selectByID(rs).get('contact').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasLock'){
									dev$.selectByID(rs).set('lock', 'lock').then(function(resolve, reject){
										if(resolve){
											dev$.selectByID(rs).get('lock').then(function(c){
												console.log(c)
											})
											dev$.selectByID(rs).set('lock', 'unlock').then(function(resolve, reject){
												if(resolve){
													dev$.selectByID(rs).get('lock').then(function(c){
														console.log(c)
													})
												}
												else{
													console.log('promise not resolved')
												}
											})
										}
										else{
											console.log('promise not resolved')
										}
									})
									
									
									
								}
								else if(facades == 'Facades/Flipflop'){
									dev$.selectByID(rs).set('flipflop', 'on').then(function(resolve, reject){
										if(resolve){
											dev$.selectByID(rs).get('flipflop').then(function(c){
												console.log(c)
											})
											dev$.selectByID(rs).set('flipflop', 'off').then(function(resolve, reject){
												if(resolve){
													dev$.selectByID(rs).get('flipflop').then(function(c){
														console.log(c)
													})
												}
												else{
													console.log('promish not resolved')
												}
											})
										}
										else{
											console.log('promise did not resolve')
										}	
									})
	
								}
								else if(facades == 'Facades/Humidity'){
									dev$.selectByID(rs).get('humidity').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasLuminance'){
									dev$.selectByID(rs).get('luminance').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasMotion'){
									dev$.selectByID(rs).get('motion').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/Regulator'){
									dev$.selectByID(rs).get('regulator').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasSmokeAlarm'){
									dev$.selectByID(rs).get('smoke').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasTemperature'){
									dev$.selectByID(rs).get('temperature').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/ThermostatMode'){
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
																	})
																}
																else{
																	console.log('promise not resolved')
																}
															})	
														}
														else{
															console.log('promise not resolved')
														}
													})
												}
												else{

												}
											})
										}
										else{
											console.log('promise not resolved')
										}
									})
								}
								else if(facades == 'Facades/HasVibration'){
									dev$.selectByID(rs).get('vibration').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/HasWaterLeakDetector'){
									dev$.selectByID(rs).get('waterleak').then(function(c){
										console.log(c)
									})
								}
								else{
									console.log('there is no such facade')
								}
							})

						})
						
					}
					done();
				})
			})
		})		
	})
})