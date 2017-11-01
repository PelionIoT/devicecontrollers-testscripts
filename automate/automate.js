var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect

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
				console.log(i +'-' +facades)
				var regis = Resp[Resources].registered
				var reach = Resp[Resources].reachable
				//console.log(regis +'and'.green + reach)
				
				

			}
		}
	})
})
	