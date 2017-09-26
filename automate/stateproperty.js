/*

 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */



var expect = require('expect');

module.exports = function(stateproperty,setvalue,rs){
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
							expect(getResp[rs].response.result).to.deep.Equal(setvalue);
							reject('get not equal to set');
						}
					} else {
						expect(getResp && getResp[rs] && getResp[rs].response && typeof getResp[rs].response.result).to.not.equal('undefined');
						//console.log('Failed to get response');
						reject('failed to get response');
					}
				}, function(err) {
					console.log('Error!')
					reject(err);
				});
			} else {
				expect(setResp && setResp[rs] && setResp[rs].receivedResponse && setResp[rs].response.error).to.deep.Equal(null);
				//console.log('failed to set response');
				reject('Did not get success on set');
			}
			}, function(err) {
			console.log('Error!')
			reject('Failed to do set');
		});
	});
}

