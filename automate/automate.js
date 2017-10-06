/*
 * mocha test for onboard devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report 
 */

var assert = require('assert')
var colors = require('colors');
var expect = require('chai').expect;
var select = dev$.select('id=*').listResources()
var resources = dev$.listResourceTypes()
var setstate = require('./stateproperty.js')
var getstate = require('./get_device.js')

describe('#you have following onboard devices'.yellow, function(){
	it('list onboard devices compleate', function(done){
		select.then(function(Resp){
			console.log(Object.keys(Resp))
			done()
		})
	})
})
select.then(function(a){
len = Object.keys(a).length
//console.log(len)
	for(var i = 0; i < len; i++){
		const Resources = Object.keys(a)[i]
		const resourcesTyp = a[Resources].type
		var regis = a[Resources].registered
		var reach = a[Resources].reachable
			resources.then(function(b) { 
			for(var j = 0; j < 19; j++){
			const facades = b[resourcesTyp]['0.0.1'].interfaces[j]
			var regis = a[Resources].registered
			var reach = a[Resources].reachable
			
			//console.log(facades)
			
	//console.log(facades)
	if(facades == 'Facades/Switchable'){
		//console,log(regis)
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('power','on',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						expect(setResp && setResp[Resources] && setResp[Resources].receivedResponse && setResp[Resources].response.error).to.deep.equal(null);
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('power','off', Resources,facades).then(function() {
							console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
							done();
							//resolve
						}, function(err) {
							expect(setResp && setResp[Resources] && setResp[Resources].receivedResponse && setResp[Resources].response.error).to.deep.equal(null);
							console.log('Error!')
							//reject
						});
					});
				} 
				else{
					console.log(`problem in the ${Resources}`.underline.red)
					//this.skip()
					//expect(regis && reach).to.deep.equal(true);
					done();
				}   
			})
		})
	}
	else if(facades == 'Facades/HasBattery'){
		//console.log(regis)
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('battery',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})						
		})
	}
	else if(facades == 'Facades/Button'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('pressed',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				//if(regis && reach === true){
				//	dev$.selectByID(Resources).get('pressed').then(function(c){
				//		console.log(c)
				//		done();
				//	})
				//}
				//else{
				//	console.log(`${Resources} is not registered and reachable`.underline.green)
				//	expect(regis && reach).to.deep.equal(true);
				//	done();
				//}
			})						
		})
	}
	else if(facades == 'Facades/HasContact'){
		describe(`#testing ${Resources}...`.yellow,function(done){
			this.timeout(60000)
			it(`${Resources} test complete`,function(){
				if(regis && reach === true){
					getstate('contact',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('contact').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}	
	else if(facades == 'Facades/HasLock'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('lock','lock',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('lock','unlock',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					});	
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}				
			})
		})
	}
	else if(facades == 'Facades/Flipflop'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('flipflop','on',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('flipflop','off',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					});		
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}			
			})
		})
	}
	else if(facades == 'Facades/Humidity'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('humidity',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('humidity').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}
	else if(facades == 'Facades/HasLuminance'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('luminance',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('luminance').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}	
	else if(facades == 'Facades/HasMotion'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('motion',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('motion').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}
	else if(facades == 'Facades/Regulator'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('regulator',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					console.log(`problem in the ${Resources}`)
					dev$.selectByID(Resources).get('regulator').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}	
	else if(facades == 'Facades/HasSmokeAlarm'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('smoke',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('smoke').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}		
	else if(facades == 'Facades/HasTemperature'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('temperature',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('temperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}	
	else if(facades == 'Facades/ThermostatMode'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('thermostatMode', 'heat',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('thermostatMode', 'cool',Resources,facades).then(function() {
								//done();
									//resolve
							}, function(err) {
								console.log('Error!')
								//reject
						}).then(function() {
							setstate('thermostatMode', 'auto',Resources,facades).then(function() {
								//done();
									//resolve
							}, function(err) {
								console.log('Error!')
								//reject
						}).then(function() {
							setstate('thermostatMode', 'off',Resources,facades).then(function() {
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
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}

			})						
		})
	}
	else if(facades == 'Facades/HasVibration'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('vibration',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('vibration').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})						
		})
	}
	else if(facades == 'Facades/HasWaterLeakDetector'){
		describe(`#testing ${Resources}...`.yellow,function(done){
			this.timeout(60000)
			it(`${Resources} test complete`,function(){
				if(regis && reach === true){
					getstate('waterleak',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('waterleak').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/OccupiedCoolTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow.underline.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('occupiedCoolTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('occupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/OccupiedHeatTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('occupiedHeatTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('occupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/OccupiedAutoTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('occupiedAutoTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('occupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedCoolTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('unoccupiedCoolTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('unoccupiedCoolTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedHeatTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('unoccupiedHeatTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('unoccupiedHeatTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/UnoccupiedAutoTemperatureLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('unoccupiedAutoTemperatureLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('unoccupiedAutoTemperatureLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/ThermostatReturnTemperature'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('returnTemperature',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('returnTemperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/ThermostatSupplyTemperature'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('supplyTemperature',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('supplyTemperature').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/ThermostatDeadband'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('deadband',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('deadband').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/ThermostatW1Status'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('w1Status','open',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('w1Status','close',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatW2Status'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('w2Status','open',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('w2Status','close',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatY1Status'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('y1Status','open',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('y1Status','close',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatY2Status'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('y2Status','open',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('y2Status','close',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/ThermostatGStatus'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('gStatus','open',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('gStatus','close',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/KeypadLockLevel'){
		describe(`#testing ${Resources}...`.yellow,function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					getstate('keypadLockLevel',Resources,facades).then(function(){
						done()
					},function(err){
						reject()
						done()
					})
				}
				else{

					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
				/*if(regis && reach === true){
					dev$.selectByID(Resources).get('keypadLockLevel').then(function(c){
						console.log(c)
						done()
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}*/
			})					
		})
	}
	else if(facades == 'Facades/TemperatureDisplayMode'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('temperatureDisplayMode','celsius',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('temperatureDisplayMode','fahrenheit',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
					expect(regis && reach).to.deep.equal(true);
					done();
				}
			})
		})
	}
	else if(facades == 'Facades/OccupancyMode'){
		describe(`#testing ${Resources}...`.yellow, function(){
			this.timeout(60000)
			it(`${Resources} test complete`,function(done){
				if(regis && reach === true){
					console.log(`device ${Resources} has facades- ${facades}`.blue)
					console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades)
					setstate('occupancyMode','occupied',Resources,facades).then(function() {
						//done();
						//resolve area
					}, function(err) {
						console.log('Error!')
						//reject
					}).then(function() {
						setstate('occupancyMode','unoccupied',Resources,facades).then(function() {
							done();
								//resolve
						}, function(err) {
							console.log('Error!')
							//reject
						});
					})
				}
				else{
					console.log(`problem in the ${Resources}`.underline.green)
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