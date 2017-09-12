var assert = require('assert')
var expect = require('chai').expect;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

describe('WigWag Inc test for automate', function(){
	describe('#you have following resources with their status', function(){
		it('you have the above resources with there status', function(done){
			dev$.select('id=*').listResources().then(function(resp){
				console.log(resp)
				done()
			})
		})
	})				
	describe('#checking all the resources',function(){
		it('this is the automate check for the mocha',function(done){
			dev$.selectByID('VirtualDeviceDriver').call('listResources').then(function(resp) { 
				var len = resp.VirtualDeviceDriver.response.result.length
					dev$.selectByID('VirtualDeviceDriver').call('listResources').then(function(resp) { 
						if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) {
							for(var i = 0; i < len; i++){
						  	console.log(resp.VirtualDeviceDriver.response.result[i])
						  	}
						  	done();
						}
					    else {
						    console.log('Failed: ',)
						    done(); 
						} 
					})
			})
		
		})		
	})
})