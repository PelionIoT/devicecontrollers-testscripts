var assert = require('assert')
var expect = require('chai').expect;


describe('WigWag Inc test for automate', function(){
	it('the listed resources are as above', function(done){
		dev$.select('id=*').listResources().then(function(resp){
			console.log(resp)
			done()
		})
	})
})