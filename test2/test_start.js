
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
console.log('you have following function to do', 
	"\n" ,'(1)List Templates',
	"\n" ,'(2)List Resources',
	"\n" ,'(3)Create Resources',
	"\n" ,'(4)Stop Resources',
	"\n" ,'(5)Delete Resourse',
	"\n" ,'(6)Delete all',
	"\n" ,'(7)set value',
	"\n" ,'(8)get value')


describe('WigWag DeviceController Tests:', function(){
	this.timeout(3000000)
	it('test of selected function compleate',function(done){
		rl.question('what you want to do?', (answer) =>{
			console.log(`you want to do: ${answer}`)
			if(answer == '1'){
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
				done();
			}
			else if(answer == '3'){
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
				done(); 
			}
			else if(answer == '2'){
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
				done();
			}
			else if(answer == '4'){
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
				done();
			}
			else if(answer == '5'){
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
				done();
			}
			else if(answer == '6'){
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
				done();
			}
			else if(answer == '7'){
			    describe('#set value',function(){
			  	this .timeout(60000)
					it('#set of value compleated',function(done){
						rl.question('which resource you want to set? ', (answer) => {
						  	console.log(`you want to set : ${answer}`)
						  	dev$.selectByID(answer).set('power', 'on')
						  	done();
						})
					})	
				})
				done();
			}
			else if(answer == '8'){
			    describe('#get value',function(){
			  	this .timeout(60000)
					it('#getting value compleated',function(done){
						rl.question('which resource you want to get? ', (answer) => {
						  	console.log(`you want to get: ${answer}`)
						  	dev$.selectByID(answer).get('power')
						  	done();
						})
					})	
				})
				done();
			}
			else {
			    describe('#resistoring devices',function(){
					it('devices registor succsesfully',function(done){
						console.log('you choose worng option')
					})	
				})
				done();
			}
		})
	})			
})