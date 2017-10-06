
/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report 
 */
//var colors = require('colors');

module.exports = function(stateproperty,Resources,facades){
	return new Promise(function(resolve, reject) {
		dev$.selectByID(Resources).get(stateproperty).then(function(getResp) {
			if(getResp && getResp[Resources] && getResp[Resources].response && typeof getResp[Resources].response.result !== 'undefined') {
				console.log(`device ${Resources} has facades- ${facades}`.blue)
				console.log('\tdevice:'.green,Resources ,'\n',
						'\ttesting facades:'.green,facades ,'\n',
						'\t\tGet State:'.green,stateproperty ,'\n',
						'\t\tReceive responce:'.green,getResp[Resources].receivedResponse ,'\n',
						'\t\tResponce result:'.green,getResp[Resources].response.result ,'\n',
						'\t\tError:'.green,getResp[Resources].response.error , )
				console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
				resolve()
			}
			else{

			}
		}),function(err){
			
		}
	})
}

