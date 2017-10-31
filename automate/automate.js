var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect
var setstate = require('./stateproperty.js')
var getstate = require('./get_device.js')

describe('#you have following onboard devices'.yellow, function(){
	this.timeout(300000)
	it('list onboard devices compleate', function(done){
		dev$.select('id=*').listResources().then(function(Resp){
			console.log(Object.keys(Resp))
			console.log(Object.keys(Resp).length)
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
		console.log(Resources)
		console.log(resourcesTyp)
		//for(var j = 0; j < 19; j++){
			
				var facades = b[resourcesTyp]['0.0.1'].interfaces[0]
				console.log(facades)
			
		//}
		if(facades == 'Facades/HasContact'){
		describe(`#testing ${Resources}...`.yellow,function(done){
			this.timeout(60000)
				it(`${Resources} test complete`,function(done){
					getstate('contact',Resources,facades).then(function(){
					done()
						//console.log('----------------------------------------------------------------')
					},function(err){
						reject()
						done()
					})
				})
			
			
				
									
		})
	}	

			}
	})
})
	