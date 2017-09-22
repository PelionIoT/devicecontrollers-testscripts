/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */

// module.exports = function(stateproperty,setvalue,rs){
// 	describe('function for setting the device state',function(){
// 		it('test compleate',function(done){
// 			dev$.selectByID(rs).set(stateproperty, setvalue).then(function(setResp) {
// 				if(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error === null) {
// 					//Successfuly set the power to 'on'
// 					dev$.selectByID(rs).get(stateproperty).then(function(getResp) {
// 						if(getResp && getResp[rs] && getResp[rs].response && typeof getResp[rs].response.result !== 'undefined') {
// 							if(getResp[rs].response.result == setvalue) {
// 								console.log(getResp)
// 								done()
// 								//Previous set successfully set the power value to 'on'
// 							}
// 						} else {
// 							console.log('something is undefined')
// 							done()
							
// 						}
// 						}, function(err) {
// 						console.log('Error!')
// 						done()
// 						//Failed to get response
						
// 					});
// 				} else {
// 				console.log('some issue while state setting on')
// 				done()
// 				//Failed to set the power to 'on'
				
// 				}
// 				}, function(err) {
// 				console.log('Error!')
// 				done()
// 				//Failed to set the power to 'on'
// 			});
// 		})
// 	})
// }


module.exports = function(stateproperty,setvalue,rs){
	// describe('function for setting the device state',function(){
	// 	it('test compleate',function(done){
	return new Promise(function(resolve, reject) {
		dev$.selectByID(rs).set(stateproperty, setvalue).then(function(setResp) {
			if(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error === null) {
				//Successfuly set the power to 'on'
				dev$.selectByID(rs).get(stateproperty).then(function(getResp) {
					if(getResp && getResp[rs] && getResp[rs].response && typeof getResp[rs].response.result !== 'undefined') {
						if(getResp[rs].response.result == setvalue) {
							console.log(getResp);
							resolve();
							//Previous set successfully set the power value to 'on'
						} else {
							reject('get not equal to set');
						}
					} else {
						console.log('Failed to get response');
						reject('failed to get response');
					}
				}, function(err) {
					console.log('Error!')
					reject(err);
				});
			} else {
				console.log('failed to set response');
				reject('Did not get success on set');
			}
		}, function(err) {
			console.log('Error!')
			reject('Failed to do set');
		});
	});
}

