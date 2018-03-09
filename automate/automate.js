/*
 * mocha test for on board devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * testScript 
 */
"use strict"
var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect
let list_Resources = dev$.select('id=*').listResources()
// let listResources_type = dev$.listResourceTypes()
var setstate = require('./stateproperty.js')
var getstate = require('./get_device.js')

var program = require('commander');

var resourceTypes;
var resources;
var Resources;

var reachable = [];
var registered  = [];

program
  .option('-r, --resourceId [type]', 'specified device for test')
  .option('-f, --facades [type]', 'specified facade for specified device')
  .parse(process.argv);

function isDeviceInterface(value) {
    return (value.indexOf('Facades') != -1);
}

//console.log('------------------------' + process.argv +'----------------------')
//if(process.argv[3] == "bhoopesh"){
  //  console.log("bhoopesh is working fine")
//}
function getDevicesWithFacades() {
    var devices = {};
    return new Promise(function(resolve, reject) {
        dev$.listResourceTypes().then(function(rsrcTypes) {
            resourceTypes = rsrcTypes;
            // console.log('Got resourceTypes ' + JSON.stringify(resourceTypes));
            dev$.select('id=*').listResources().then(function(rsrc) {
                Resources = resources = rsrc;
                // console.log('Got resources ' + JSON.stringify(resources));
                Object.keys(resources).forEach(function(deviceId) {
                    //if(process.argv[3] == undefined){
                       // console.log("bhoopesh working cool")
                    //}
                    if(program.resourceId){
                        deviceId = program.resourceId
                    }
                    if (typeof resourceTypes[resources[deviceId].type] !== 'undefined') {
                        // devices[deviceId] = resourceTypes[resources[deviceId].type]['0.0.1'].interfaces;
                        var deviceInterfaces = [];
                        try {
                            deviceInterfaces = resourceTypes[resources[deviceId].type]['0.0.1'].interfaces.filter(isDeviceInterface);
                        } catch (e) {
                            console.error("Failed to filter interfaces " + deviceId + ' type ' + resources[deviceId].type + ' err ' + e);
                        }
                        if (deviceInterfaces.length > 0) {
                            if(resources[deviceId].reachable) {
                                reachable.push(deviceId);
                            }
                            if(resources[deviceId].registered) {
                                registered.push(deviceId);
                            }
                            // if (resources[deviceId].registered && resources[deviceId].reachable) {
                                devices[deviceId] = deviceInterfaces;
                            // } else {
                                // console.log('Device ' + deviceId + ' is offline, not testing it');
                            // }
                        }
                    } else {
                        console.error('Type not defined in the listResourceTypes ' + JSON.stringify(resources[deviceId]));
                    }
                });
                resolve(devices);
            }, function(err) {
                console.error('Failed to get resources ' + err);
            });
        }, function(err) {
            console.error('Failed to get listResourceTypes ' + err);
        });
    });
}
describe('#you have following onboard devices'.yellow, function() {
    this.timeout(10000)
it('got device compleate',function(done){
getDevicesWithFacades().then(function(devices) {
    console.log('Got devices with facades\n'.blue, devices);
    done()
    Object.keys(devices).forEach(function(deviceId) {
        devices[deviceId].forEach(function(facades) {
            //console.log(typeof program.facades)
            var regis = (registered.indexOf(deviceId) > -1);
            var reach = (reachable.indexOf(deviceId) > -1);  
                if(facades === program.facades){
                   //facades = program.facades
                }
                else if(program.facades === undefined){
                    //console.log('hgvdbhjwnkm')
                }
                else{
                    return;
                    //console.log(facades)
                }
            
            //console.log(facades)
            if (facades == 'Facades/Switchable') {
                describe(`#testing ${deviceId}...`.yellow,function(){
                   // console.log(`${facades}`.green)
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('power','on',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting power to off of ${deviceId}`.red)
                                done('setting power to on  failed with ' + err);
                                }).then(function() {
                                setstate('power','off', deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                console.log(`Error while setting power to off of ${deviceId}`.red)
                                done('setting power to off failed with ' + err);
                                });
                            });
                         })
                    } 
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }   
                })
            } 
            else if(facades == 'Facades/HasBattery'){
                //console.log(regis)
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('battery',deviceId,facades).then(function(){
                            done()
                            },function(err){
                            console.log(`Error while getting battery of ${deviceId}`.red)
                            done('getting power of battery failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }   
                })                      
            }
           else if(facades == 'Facades/Button'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}}`,function(done){
                            getstate('pressed',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting button status of ${deviceId}`.red)
                                done('geting push button failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }   
                })                      
            }
            else if(facades == 'Facades/HasContact'){
                describe(`#testing ${deviceId}...`.yellow,function(done){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('contact',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting contact sensors of ${deviceId}`.red)
                                done('getting contact sensor failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }
            else if(facades == 'Facades/HasLock'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('lock','lock',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting Doorlock to lock of ${deviceId}`.red)
                                done('setting Doorlock to lock failed with ' + err);
                            }).then(function() {
                                setstate('lock','unlock',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting Doorlock to unlock of ${deviceId}`.red)
                                    done('setting Doorlock to unlocked failed with ' + err);
                                });
                            }); 
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }   
                    
                })
            }
            else if(facades == 'Facades/Flipflop'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('flipflop','on',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting flipflop to on of ${deviceId}`.red)
                                done('setting flipflop to on failed with ' + err);
                            }).then(function() {
                                setstate('flipflop','off',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting flipflop to off of ${deviceId}`.red)
                                    done('setting flipflop to off failed with ' + err);
                                });
                            });
                        })      
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }       
                })
            }
            else if(facades == 'Facades/Humidity'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('humidity',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting humidity of ${deviceId}`.red)
                                done('getting humidity failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }   
                })
            } 
            else if(facades == 'Facades/HasLuminance'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('luminance',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting luminance of ${deviceId}`.red)
                                done('getting luminance failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                           console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }   
            else if(facades == 'Facades/HasMotion'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('motion',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting motion status of ${deviceId}`.red)
                                done('getting motion sensor failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                           console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }
            else if(facades == 'Facades/Regulator'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('regulator',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting regulator output of ${deviceId}`.red)
                                done('getting regulator failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }   
            else if(facades == 'Facades/HasSmokeAlarm'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('smoke',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting smokealarm status of ${deviceId}`.red)
                                done('getting smoke alarm failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }       
            else if(facades == 'Facades/HasTemperature'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('temperature',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting temperature from ${deviceId}`.red)
                                done('getting temperature failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }   
            else if(facades == 'Facades/ThermostatMode'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('thermostatMode', 'heat',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting thermostat to heat of ${deviceId}`.red)
                                done('setting thermostat to heat failed with ' + err);
                            }).then(function() {
                                setstate('thermostatMode', 'cool',deviceId,facades).then(function() {
                                }, function(err) {
                                    console.log(`Error while setting thermostat to cool of ${deviceId}`.red)
                                    done('setting thermostat to cool failed with ' + err);
                                }).then(function() {
                                    setstate('thermostatMode', 'auto',deviceId,facades).then(function() {
                                    }, function(err) {
                                        console.log(`Error while setting thermostat to auto of ${deviceId}`.red)
                                        done('setting thermostat to auto failed with ' + err);
                                    }).then(function() {
                                        setstate('thermostatMode', 'off',deviceId,facades).then(function() {
                                            console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                            done();
                                        }, function(err) {
                                            console.log(`Error while setting thermostat to off of ${deviceId}`.red)
                                            done('setting thermostat to off failed with ' + err);
                                        })
                                    })      
                                })      
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }
            else if(facades == 'Facades/HasVibration'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('vibration',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting vibration status from ${deviceId}`.red)
                                done('getting vibration failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }  
                })
            }
            else if(facades == 'Facades/HasWaterLeakDetector'){
                describe(`#testing ${deviceId}...`.yellow,function(done){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(){
                            getstate('waterleak',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting waterleak status from ${deviceId}`.red)
                                done('getting waterleak failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/OccupiedCoolTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('occupiedCoolTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting occupiedCoolTemperatureLevel status from ${deviceId}`.red)
                                done('getting occupiedCoolTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/OccupiedHeatTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('occupiedHeatTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                 console.log(`Error while getting occupiedHeatTemperatureLevel status from ${deviceId}`.red)
                                done('getting occupiedHeatTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/OccupiedAutoTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('occupiedAutoTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                 console.log(`Error while getting occupiedAutoTemperatureLevel status from ${deviceId}`.red)
                                done('getting occupiedAutoTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/UnoccupiedCoolTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('unoccupiedCoolTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                 console.log(`Error while getting unoccupiedCoolTemperatureLevel status from ${deviceId}`.red)
                                done('getting UnoccupiedCoolTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/UnoccupiedHeatTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('unoccupiedHeatTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                 console.log(`Error while getting unoccupiedHeatTemperatureLevel status from ${deviceId}`.red)
                                done('getting UnoccupiedHeatTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/UnoccupiedAutoTemperatureLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('unoccupiedAutoTemperatureLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                 console.log(`Error while getting unoccupiedAutoTemperatureLevel status from ${deviceId}`.red)
                                done('getting UnoccupiedAutoTemperatureLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatReturnTemperature'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('returnTemperature',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting ThermostatReturnTemperature status from ${deviceId}`.red)
                                done('getting return temperature failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatSupplyTemperature'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('supplyTemperature',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting ThermostatSupplyTemperature status from ${deviceId}`.red)
                                done('getting supply temperature failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatDeadband'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('deadband',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting ThermostatDeadband status from ${deviceId}`.red)
                                done('getting deadband failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatW1Status'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('w1Status','open',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting ThermostatW1Status to open for ${deviceId}`.red)
                                done('setting w1Status to open failed with ' + err);
                            }).then(function() {
                                setstate('w1Status','close',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting ThermostatW1Status to close for ${deviceId}`.red)
                                    done('setting w1Status to close failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatW2Status'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('w2Status','open',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting ThermostatW2Status to open for ${deviceId}`.red)
                                done('setting w2Status to open failed with ' + err);
                            }).then(function() {
                                setstate('w2Status','close',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting ThermostatW2Status to close for ${deviceId}`.red)
                                    done('setting w2Status to close failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatY1Status'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('y1Status','open',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting ThermostatY1Status to open for ${deviceId}`.red)
                                done('setting y1Status to open failed with ' + err);
                            }).then(function() {
                                setstate('y1Status','close',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting ThermostatY1Status to close for ${deviceId}`.red)
                                    done('setting y1Status to close failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatY2Status'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('y2Status','open',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting ThermostatY2Status to open for ${deviceId}`.red)
                                done('setting y2Status to open failed with ' + err);
                            }).then(function() {
                                setstate('y2Status','close',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting ThermostatY2Status to close for ${deviceId}`.red)
                                    done('setting y2Status to close failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/ThermostatGStatus'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('gStatus','open',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting ThermostatGStatus to open for ${deviceId}`.red)
                                done('setting gStatus to open failed with ' + err);
                            }).then(function() {
                                setstate('gStatus','close',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting ThermostatGStatus to close for ${deviceId}`.red)
                                    done('setting gStatus to close failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/KeypadLockLevel'){
                describe(`#testing ${deviceId}...`.yellow,function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            getstate('keypadLockLevel',deviceId,facades).then(function(){
                            done()
                            },function(err){
                                console.log(`Error while getting keypadLockLevel of ${deviceId}`.red)
                                done('getting KeypadLockLevel failed with ' + err);
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/TemperatureDisplayMode'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('temperatureDisplayMode','celsius',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting temperatureDisplayMode to celsius for ${deviceId}`.red)
                                done('setting temperatureDisplayMode to celsius failed with ' + err);
                            }).then(function() {
                                setstate('temperatureDisplayMode','fahrenheit',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting temperatureDisplayMode to fahrenheit for ${deviceId}`.red)
                                    done('setting temperatureDisplayMode to fahrenheit failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }
            else if(facades == 'Facades/OccupancyMode'){
                describe(`#testing ${deviceId}...`.yellow, function(){
                    this.timeout(60000)
                    if(regis && reach === true){
                        it(`${deviceId} test complete for facade ${facades}`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('occupancyMode','occupied',deviceId,facades).then(function() {
                            }, function(err) {
                                console.log(`Error while setting OccupancyMode to occupied for ${deviceId}`.red)
                                done('setting occupancyMode to occupieds failed with ' + err);
                            }).then(function() {
                                setstate('occupancyMode','unoccupied',deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                }, function(err) {
                                    console.log(`Error while setting OccupancyMode to unoccupied for ${deviceId}`.red)
                                    done('setting occupancyMode to unoccupied failed with ' + err);
                                });
                            })
                        })
                    }
                    else{
                        it(`${deviceId} test fail for facade ${facades}`,function(done){
                            console.log(`Error while setting ${facades} of ${deviceId}`.red)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    } 
                })
            }   
        });
    });
});


    })
})