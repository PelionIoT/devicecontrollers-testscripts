var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect
var setstate = require('./stateproperty.js')
var getstate = require('./get_device.js')

describe('Testing starting......'.yellow.bold,function(){
		describe('#you have following onboard devices'.yellow, function(){
			this.timeout(300000)
			it('list onboard devices compleate', function(done){
				dev$.select('id=*').listResources().then(function(Resp){
					console.log(Object.keys(Resp))
					//console.log(Object.keys(Resp).length)
					done()
					//console.log('<------------------------------------------------------------------------->'.rainbow)
				})
			})
		})
		dev$.select('id=*').listResources().then(function(Resp){
			dev$.listResourceTypes().then(function(b){
				len = Object.keys(Resp).length 
				for(var i = 0; i < len; i++){
					var Resources = Object.keys(Resp)[i]
					var resourcesTyp = Resp[Resources].type
					for(var j = 0; j < 19; j++){
						var facades = b[resourcesTyp]['0.0.1'].interfaces[j]
						//console.log(i +'-' + facades)
						var regis = Resp[Resources].registered
						var reach = Resp[Resources].reachable
						//console.log(regis +'and'.green + reach)
						if(facades == 'Facades/Switchable'){
				describe(`#testing ${Resources}...`.yellow,function(){
					this.timeout(60000)
						if(regis && reach === true){
							it(`${Resources} test complete`,function(done){
							console.log(`device ${Resources} has facades- ${facades}`.blue)
							console.log('\tdevice:'.green,Resources ,'\n',
								'\ttesting facades:'.green,facades)
							setstate('power','on',Resources,facades).then(function() {
							}, function(err) {
								it(`${Resources} test fail`,function(done){
									console.log(`problem in the ${Resources}`)
									done(new Error("promise is not resolve"));
								})
							}).then(function() {
								setstate('power','off', Resources,facades).then(function() {
									console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
									done();
									//resolve
								}, function(err) {
									it(`${Resources} test fail`,function(done){
										console.log(`problem in the ${Resources}`)
										done(new Error("promise is not resolved"));
									})
								});
							});
							})
						} 
						else{
							it(`${Resources} test fail`,function(done){
								console.log(`problem in the ${Resources}`)
								done(new Error("either device is not registered or reachable or both"));
							})
						}   
					})
				
			}
						/*if(facades == 'Facades/Switchable'){
							describe('this should work',function(){
								it('this is working properly', function(){
									console.log('start')
								})
							})
						}
						else{
							console.log('debug the issues'.red)
						}*/

					}
				}
			})
		})
})

