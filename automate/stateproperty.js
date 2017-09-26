/*

 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report of the virtual fdevice driver
 */

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
							reject();
						}
					} else {
						
						reject();
					}
				}, function(err) {
					console.log('Error!')
					reject(err);
				});
			} else {
				reject();
			}
			}, function(err) {
			console.log('Error!')
			reject('Failed to do set');
		});
	});
}

