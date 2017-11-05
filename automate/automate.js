/*
 * mocha test for onboard devices
 *
 * WIGWAG Inc, bhoopesh <bhoopesh@izuma.net>
 *
 * This file for the test report 
 */
"use strict"
var assert = require('assert')
var colors = require('colors')
var expect = require('chai').expect
let list_Resources = dev$.select('id=*').listResources()
// let listResources_type = dev$.listResourceTypes()
var setstate = require('./stateproperty.js')
var getstate = require('./get_device.js')

describe('#you have following onboard devices'.yellow, function() {
    it('list onboard devices compleate', function(done) {
        list_Resources.then(function(Resp) {
            console.log(Object.keys(Resp))
            done()
            //console.log('<------------------------------------------------------------------------->'.rainbow)
        })
    })
})

var resourceTypes;
var resources;
var Resources;

var reachable = [];
var registered  = [];

function isDeviceInterface(value) {
    return (value.indexOf('Facades') != -1);
}

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

getDevicesWithFacades().then(function(devices) {
	console.log('Got devices ', devices);
    Object.keys(devices).forEach(function(deviceId) {
        devices[deviceId].forEach(function(facades) {
        	var regis = (registered.indexOf(deviceId) > -1);
        	var reach = (reachable.indexOf(deviceId) > -1);
            if (facades == 'Facades/Switchable') {
            	// console.log('here');
                // describe('#testing.......', function() {
                //     this.timeout(60000)
                //     it('test compleate', function() {
                //         console.log('now it is printing'.red)
                //     })
                // })
                /*describe(`#testing ${Resources}...`.yellow,function(){
                	this.timeout(60000)
                		if(regis && reach === true){
                			it(`${Resources} test complete`,function(done){
                			console.log(`device ${Resources} has facades- ${facades}`.blue)
                			console.log('\tdevice:'.green,Resources ,'\n',
                				'\ttesting facades:'.green,facades)
                			setstate('power','on',Resources,facades).then(function() {
                			}, function(err) {
                				it(`${Resources} test fail`,function(done){
                					console.log(`problem in the ${Resources}`)
                					done(new Error("promise is not resolve"));
                				})
                			}).then(function() {
                				setstate('power','off', Resources,facades).then(function() {
                					console.log('Tested Facade:'.green,`${facades} for the device ${Resources} successfully`.blue)
                					done();
                					//resolve
                				}, function(err) {
                					it(`${Resources} test fail`,function(done){
                						console.log(`problem in the ${Resources}`)
                						done(new Error("promise is not resolved"));
                					})
                				});
                			});
                			})
                		} 
                		else{
                			it(`${Resources} test fail`,function(done){
                				console.log(`problem in the ${Resources}`)
                				done(new Error("either device is not registered or reachable or both"));
                			})
                		}   
                })*/

            } else if (facades == 'Facades/HasBattery') {
                //console.log(regis)
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)

                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('battery', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }
                })

            } else if (facades == 'Facades/Button') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('pressed', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })

            } else if (facades == 'Facades/HasContact') {
                describe(`#testing ${Resources}...`.yellow, function(done) {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('contact', Resources, facades).then(function() {
                                done()
                                //console.log('----------------------------------------------------------------')
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/HasLock') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('lock', 'lock', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('lock', 'unlock', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            });
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/Flipflop') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('flipflop', 'on', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('flipflop', 'off', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            });
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/Humidity') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('humidity', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/HasLuminance') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('luminance', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/HasMotion') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('motion', Resources, facades).then(function() {
                                done()
                                //console.log('-----------------------------------------------------------------')
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/Regulator') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('regulator', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/HasSmokeAlarm') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('smoke', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/HasTemperature') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('temperature', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/ThermostatMode') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('thermostatMode', 'heat', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('thermostatMode', 'cool', Resources, facades).then(function() {
                                    //done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                }).then(function() {
                                    setstate('thermostatMode', 'auto', Resources, facades).then(function() {
                                        //done();
                                        //resolve
                                    }, function(err) {
                                        console.log('Error!')
                                        //reject
                                    }).then(function() {
                                        setstate('thermostatMode', 'off', Resources, facades).then(function() {
                                            console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                            done();
                                            //resolve
                                        }, function(err) {
                                            console.log('Error!')
                                            //reject
                                        })

                                    })
                                })
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }
                })
            } else if (facades == 'Facades/HasVibration') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('vibration', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/HasWaterLeakDetector') {
                describe(`#testing ${Resources}...`.yellow, function(done) {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function() {
                            getstate('waterleak', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/OccupiedCoolTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow.underline.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('occupiedCoolTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/OccupiedHeatTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('occupiedHeatTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/OccupiedAutoTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('occupiedAutoTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/UnoccupiedCoolTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('unoccupiedCoolTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/UnoccupiedHeatTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('unoccupiedHeatTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/UnoccupiedAutoTemperatureLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('unoccupiedAutoTemperatureLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/ThermostatReturnTemperature') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('returnTemperature', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/ThermostatSupplyTemperature') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('supplyTemperature', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/ThermostatDeadband') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('deadband', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }


                })
            } else if (facades == 'Facades/ThermostatW1Status') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('w1Status', 'open', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('w1Status', 'close', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/ThermostatW2Status') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('w2Status', 'open', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('w2Status', 'close', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }
                })
            } else if (facades == 'Facades/ThermostatY1Status') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('y1Status', 'open', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('y1Status', 'close', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/ThermostatY2Status') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('y2Status', 'open', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('y2Status', 'close', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/ThermostatGStatus') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('gStatus', 'open', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('gStatus', 'close', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/KeypadLockLevel') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            getstate('keypadLockLevel', Resources, facades).then(function() {
                                done()
                            }, function(err) {
                                //reject()
                                done()
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }
                })
            } else if (facades == 'Facades/TemperatureDisplayMode') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('temperatureDisplayMode', 'celsius', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('temperatureDisplayMode', 'fahrenheit', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }

                })
            } else if (facades == 'Facades/OccupancyMode') {
                describe(`#testing ${Resources}...`.yellow, function() {
                    this.timeout(60000)
                    if (regis && reach === true) {
                        it(`${Resources} test complete`, function(done) {
                            console.log(`device ${Resources} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green, Resources, '\n',
                                '\ttesting facades:'.green, facades)
                            setstate('occupancyMode', 'occupied', Resources, facades).then(function() {
                                //done();
                                //resolve area
                            }, function(err) {
                                console.log('Error!')
                                //reject
                            }).then(function() {
                                setstate('occupancyMode', 'unoccupied', Resources, facades).then(function() {
                                    console.log('Tested Facade:'.green, `${facades} for the device ${Resources} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    console.log('Error!')
                                    //reject
                                });
                            })
                        })
                    } else {
                        it(`${Resources} test fail`, function(done) {
                            console.log(`problem in the ${Resources}`)
                            //this.skip()
                            //expect(regis && reach).to.deep.equal(true);
                            done(new Error("either device is not registered or reachable or both"));
                        })
                    }
                })
            }
        });
    });
});