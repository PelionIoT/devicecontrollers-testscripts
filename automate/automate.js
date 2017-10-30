var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect

describe('#you have following onboard devices'.yellow, function(){
	dev$.select('id=*').listResources().then(function(Resp){
		it('list onboard devices compleate', function(done){
			console.log(Object.keys(Resp))
			done().then(function(){
				console.log(Object.keys(Resp).length)
			})
		})
	})
})
dev$.select('id=*').listResources().then(function(a){
	console.log(Object.keys(a).length)
})