var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect

describe('#you have following onboard devices'.yellow, function(){
	it('list onboard devices compleate', function(done){
		dev$.select('id=*').listResources().then(function(Resp){
			console.log(Object.keys(Resp))
			done()
			//console.log('<------------------------------------------------------------------------->'.rainbow)
		})
	})
})
describe('#'.yellow, function(){
	it('list onboard devices compleate', function(done){
		dev$.select('id=*').listResources().then(function(Resp){
				len = Object.keys(Resp).length
				for(var i = 0; i < len; i++){
					dev$.select('id=*').listResources().then(function(Resp){
						dev$.listResourceTypes().then(function(b){
							var Resources = Object.keys(Resp)[i]
							var resourcesTyp = Resp[Resources].type
							var facades = b[resourcesTyp]['0.0.1'].interfaces
							console.log(Resources)
							console.log(resourcesTyp)
							console.log(facades)
					})	})
				}
			
		})
	})
})

