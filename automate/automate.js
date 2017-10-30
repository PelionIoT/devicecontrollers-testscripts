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
}).then(function(b){
	dev$.select('id=*').listResources().then(function(a){
		console.log(Object.keys(a).length)
	})
})