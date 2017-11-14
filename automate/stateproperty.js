/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report 
 */
"use strict"
module.exports = function(stateproperty,setvalue,deviceId,facades){
	return new Promise(function(resolve, reject) {
		dev$.selectByID(deviceId).set(stateproperty, setvalue).then(function(setResp) {
			if(setResp && setResp[deviceId] && setResp[deviceId].receivedResponse && setResp[deviceId].response.error === null) {
				//Successfuly set the power to 'on'
				dev$.selectByID(deviceId).get(stateproperty).then(function(getResp) {
					if(getResp && getResp[deviceId] && getResp[deviceId].response && typeof getResp[deviceId].response.result !== 'undefined') {
						if(getResp[deviceId].response.result == setvalue) {
							//console.log(`device ${deviceId} has facades- ${facades}`.blue)
				console.log(/*'\tdevice:'.green,deviceId ,'\n',
						'\ttesting facades:'.green,facades ,'\n',*/
						'\t\tSet State:'.green,stateproperty ,'\n',
						'\t\tValue:'.green,setvalue ,'\n',
						'\t\t\tgetstate:'.green,stateproperty ,'\n',
						'\t\t\tReceive responce:'.green,getResp[deviceId].receivedResponse ,'\n',
						'\t\t\tResponce result:'.green,getResp[deviceId].response.result ,'\n',
						'\t\t\tError:'.green,getResp[deviceId].response.error)
				//console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
							resolve();
							//Previous set successfully set the power value to 'on'
						} else {
							reject(new Error("Device get responese is not equal to set value"));
						}
					} else {
						
						reject(new Error("Device get undefined responce" + getResp[deviceId].response.error));
					}
				}, function(err) {
					//console.log('Error!')
					reject(new Error("Device get responce failed " + err))
				});
			} else {
				reject(new Error("Device set failed " + setResp[deviceId].response.error));
			}
			}, function(err) {
			//console.log('Error!')
			reject(new Error("Device set responce failed " + err));
		});
	});
}

