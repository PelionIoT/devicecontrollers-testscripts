/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * testScript 
 */
"use strict"
module.exports = function(stateproperty,deviceId,facades){
	return new Promise(function(resolve, reject) {
		dev$.selectByID(deviceId).get(stateproperty).then(function(getResp) {
			if(getResp && getResp[deviceId] && getResp[deviceId].response && typeof getResp[deviceId].response.result !== 'undefined') {
				console.log(`device ${deviceId} has facades- ${facades}`.blue)
				console.log('\tdevice:'.green,deviceId ,'\n',
						'\ttesting facades:'.green,facades ,'\n',
						'\t\tGet State:'.green,stateproperty ,'\n',
						'\t\tReceive responce:'.green,getResp[deviceId].receivedResponse ,'\n',
						'\t\tResponce result:'.green,getResp[deviceId].response.result ,'\n',
						'\t\tError:'.green,getResp[deviceId].response.error)
				console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
				resolve()
			}
			else{
				reject("Device get undefined response " + getResp[deviceId].response.error)
			}
		}),function(err){
			reject("Device get response failed " + err)
		}
	})
}

