
/*
 * mocha test for virtual device driver
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */

var assert = require('assert');
var expect = require('chai').expect;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

describe('WigWag DeviceController Tests:', function(){
	describe('#list of the templates', function(){
		it('Get virtual device templates', function(done) {
			dev$.selectByID('VirtualDeviceDriver').call('listTemplates').then(function(resp) {
				if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) { 
					console.log(resp.VirtualDeviceDriver.response.result);
					done();
					}
	 			else {
		 			console.log('Failed: ');
		 			done();
				} 
			})
		})    
	})
	describe('#creating DeviceController',function(){
		this.timeout(60000)
		it('device controller created',function(done){
			rl.question('Which module you want to create? ', (answer) => {
			  	console.log(`creating the module succsesfully: ${answer}`)
				dev$.selectByID('VirtualDeviceDriver').call('create', answer).then(function(resp) {
			 		if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) { 
			 			console.log(resp.VirtualDeviceDriver.response.result);
			 			done();
			 	 	}
			 		else {
			 	   		console.log('Failed: ', );
			 	  		done();
			 		} 
				})
			});				
		})	
	}) 
	describe('#list resources',function(){
		it('<--------------these are the resources --------->',function(done){
			dev$.selectByID('VirtualDeviceDriver').call('listResources').then(function(resp) { 
				if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) {
			  		console.log(resp.VirtualDeviceDriver.response.result)
			  		done();
			 	}
		    	else {
			  		console.log('Failed: ',) 
			   		done();
				} 
			})
		})	
	})
	describe('#stop DeviceController',function(){
		this.timeout(60000)
		it('device is stopped',function(done){
			rl.question('Which module you want to stop? ', (answer) => {
			  	console.log(`module succsesfully stop: ${answer}`)
			 	dev$.selectByID('VirtualDeviceDriver').call('stop',answer).then(function(resp) {
		 			if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) { 
		 				console.log(resp.VirtualDeviceDriver.response.result)
		 				done();
		 	 		}
		 	  		else {
		 	  			console.log('Failed: ', )
		 	   			done();
		 	    	}
				})
			})
		})	
	})
	describe('#delete device controller',function(){
		this.timeout(60000)
		it('#delete the module',function(done){
			rl.question('Which module you want to delete? ', (answer) => {
			  	console.log(`module succsesfully stop: ${answer}`)
				dev$.selectByID('VirtualDeviceDriver').call('delete', answer).then(function(resp) { 
					if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) {
			 			console.log(resp.VirtualDeviceDriver.response.result) 
			 			done();
					}
			 		else {
			  			console.log('Failed: ', ) 
			  			done();
					}
		 		})
			})
		})	
	})
  describe('#delete all',function(){
  	this .timeout(60000)
		it('#delete all modules',function(done){
			rl.question('are you sure(yes/no)? ', (answer) => {
			  	console.log(`module succsesfully stop: ${answer}`)
			  	if(answer == 'yes'){
					dev$.selectByID('VirtualDeviceDriver').call('deleteAll').then(function(resp) { 
						if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) { 
							console.log(resp.VirtualDeviceDriver.response.result)
							done();
						} 
						else { 
							console.log('Failed: ', ) 
							done();
						} 
					})
				}
				else{
					console.log('device will not deleted' ) 
					done();
				}
			})
		})	
	})
    describe('#resistoring devices',function(){
		it('devices registor succsesfully',function(done){
			dev$.selectByID('VirtualDeviceDriver').call('register').then(function(resp) { 
				if(resp.VirtualDeviceDriver && resp.VirtualDeviceDriver.response && resp.VirtualDeviceDriver.response.result) { 
					console.log(resp.VirtualDeviceDriver.response.result) 
					done()
				}
				 else {
				  console.log('Failed: ', resp.VirtualDeviceDriver.response.error) 
				}
			})
		})	
	})	
})
