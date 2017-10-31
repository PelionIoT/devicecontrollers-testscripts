var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect

describe('#you have following onboard devices'.yellow, function(){
	it('list onboard devices compleate', function(done){
		dev$.select('id=*').listResources().then(function(Resp){
			console.log(Object.keys(Resp))
			console.log(Object.keys(Resp).length)
			done()
			//console.log('<------------------------------------------------------------------------->'.rainbow)
		})
	})
})
describe('#facades of each device'.yellow, function(){
	it('facades of each device', function(done){
		dev$.select('id=*').listResources().then(function(Resp){
			var resrc = Object.keys(Resp)
			var resrcTyp = a[resrc].type
			console.log(resrc)
			console.log(resrcTyp)
			done()
			//console.log('<------------------------------------------------------------------------->'.rainbow)
		})
	})
})
