var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect

describe('#you have following onboard devices'.yellow, function(){
	this.timeout(60000)
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
	len = Object.keys(Resp).length 
	for(var i = 0; i < len; i++){
		const Resources = Object.keys(Resp)[i]
		const resourcesTyp = Resp[Resources].type
		console.log(Resources)
		console.log(resourcesTyp)
		//for(var j = 0; j < 19; j++){
			dev$.listResourceTypes().then(function(b){
				const facades = b[resourcesTyp]['0.0.1'].interfaces
				console.log(facades)
			})
		//}
	}
})
	