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
			dev$.selectByID('VirtualDeviceDriver').call('listResources').then(function(resp) { 
				var len = resp.VirtualDeviceDriver.response.result.length
				dev$.selectByID('VirtualDeviceDriver').call('listResources').then(function(resp) { 
					for(var i = 0; i < len; i++){
						const rs = resp.VirtualDeviceDriver.response.result[i]
						dev$.select('id=*').listResources().then(function(a){
							const typ = a[rs].type
							dev$.listResourceTypes().then(function(b) { 
								const facades = b[typ]['0.0.1'].interfaces[0] 
								if(facades == 'Facades/Switchable'){
									dev$.selectByID(rs).set('power', 'on')
									dev$.selectByID(rs).get('power').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('power', 'off')
									dev$.selectByID(rs).get('power').then(function(c){
										console.log(c)
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
									dev$.selectByID(rs).set('lock', 'lock')
									dev$.selectByID(rs).get('lock').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('lock', 'unlock')
									dev$.selectByID(rs).get('lock').then(function(c){
										console.log(c)
									})
								}
								else if(facades == 'Facades/Flipflop'){
									dev$.selectByID(rs).set('flipflop', 'on')
									dev$.selectByID(rs).get('flipflop').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('flipflop', 'off')
									dev$.selectByID(rs).get('flipflop').then(function(c){
										console.log(c)
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
									dev$.selectByID(rs).set('thermostatMode', 'heat')
									dev$.selectByID(rs).get('thermostatMode').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('thermostatMode', 'cool')
									dev$.selectByID(rs).get('thermostatMode').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('thermostatMode', 'off')
									dev$.selectByID(rs).get('thermostatMode').then(function(c){
										console.log(c)
									})
									dev$.selectByID(rs).set('thermostatMode', 'auto')
									dev$.selectByID(rs).get('thermostatMode').then(function(c){
										console.log(c)
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