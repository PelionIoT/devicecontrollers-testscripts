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
           // done()
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
    console.log('Got devices n', devices);
    Object.keys(devices).forEach(function(deviceId) {
        devices[deviceId].forEach(function(facades) {
            var regis = (registered.indexOf(deviceId) > -1);
            var reach = (reachable.indexOf(deviceId) > -1);
            console.log(facades)
            if (facades == 'Facades/Switchable') {
                describe(`#testing ${deviceId}...`.yellow,function(){
                   // console.log(`${facades}`.green)
                    this.timeout(60000)
                        if(regis && reach === true){
                            it(`${deviceId} test complete`,function(done){
                            console.log(`device ${deviceId} has facades- ${facades}`.blue)
                            console.log('\tdevice:'.green,deviceId ,'\n',
                                '\ttesting facades:'.green,facades)
                            setstate('power','on',deviceId,facades).then(function() {
                            }, function(err) {
                                it(`${deviceId} test fail`,function(done){
                                    console.log(`problem in the ${deviceId}`)
                                    done(new Error("promise is not resolve"));
                                })
                            }).then(function() {
                                setstate('power','off', deviceId,facades).then(function() {
                                    console.log('Tested Facade:'.green,`${facades} for the device ${deviceId} successfully`.blue)
                                    done();
                                    //resolve
                                }, function(err) {
                                    it(`${Resources} test fail`,function(done){
                                        console.log(`problem in the ${deviceId}`)
                                        done(new Error("promise is not resolved"));
                                    })
                                });
                            });
                            })
                        } 
                        else{
                            it(`${deviceId} test fail`,function(done){
                                console.log(`problem in the ${deviceId}`)
                                done(new Error("either device is not registered or reachable or both"));
                            })
                        }   
                })

            } else {
                console.log(`#testing ${deviceId}...`.yellow)

            }
            
            
        });
    });
});