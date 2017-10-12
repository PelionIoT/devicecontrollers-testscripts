/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report 
 */

module.exports = function(stateproperty,setvalue,Resources,facades){
	return new Promise(function(resolve, reject) {
		dev$.selectByID(Resources).set(stateproperty, setvalue).then(function(setResp) {
			if(setResp && setResp[Resources] && setResp[Resources].receivedResponse && setResp[Resources].response.error === null) {
				//Successfuly set the power to 'on'
				dev$.selectByID(Resources).get(stateproperty).then(function(getResp) {
					if(getResp && getResp[Resources] && getResp[Resources].response && typeof getResp[Resources].response.result !== 'undefined') {
						if(getResp[Resources].response.result == setvalue) {
							//console.log(`device ${Resources} has facades- ${facades}`.blue)
				console.log(/*'\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades ,'\n',*/
						'\t\tSet State:'.green,stateproperty ,'\n',
						'\t\tValue:'.green,setvalue ,'\n',
						'\t\t\tgetstate:'.green,stateproperty ,'\n',
						'\t\t\tReceive responce:'.green,getResp[Resources].receivedResponse ,'\n',
						'\t\t\tResponce result:'.green,getResp[Resources].response.result ,'\n',
						'\t\t\tError:'.green,getResp[Resources].response.error)
				//console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
							resolve();
							//Previous set successfully set the power value to 'on'
						} else {
							reject();
						}
					} else {
						
						reject();
					}
				}, function(err) {
					//console.log('Error!')
					reject(err);
				});
			} else {
				reject();
			}
			}, function(err) {
			//console.log('Error!')
			reject(err);
		});
	});
}

