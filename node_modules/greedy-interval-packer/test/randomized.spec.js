var intervalPacker = require('../lib/greedyIntervalPacker');
var Chance = require('chance');
var expect = require('unexpected').clone()
    .installPlugin(require('./unexpected-intervals'));

var chance = new Chance(42);

function createRandomIntervals(numberOfIntervals) {
    var intervals = [];
    for (var i = 0; i < numberOfIntervals; i += 1) {
        var start = chance.natural({ min: -100, max: 100 });
        intervals.push({
            start: start,
            end: start + chance.natural({ min: 1, max: 20 })
        });
    }
    return intervals;
}

describe('@slow packing randomized intervals', function () {

    for (var i = 0; i < 10; i += 1) {
        var numberOfIntervals = chance.natural({min: 0, max: 1000 });
        var intervals = createRandomIntervals(numberOfIntervals);
        describe('with ' + intervals.length + ' intervals', function () {
            var partitioning;
            before(function () {
                partitioning = intervalPacker(intervals);
            });

            it('partitioned intervals does not overlap', function () {
                expect(partitioning, 'not to have any overlapping intervals');
            });

            it('the partions contains all the intervals', function () {
                expect(partitioning, 'to only have intervals', intervals);
            });

            it('each partition is ordered by start and then length', function () {
                expect(partitioning, 'to be ordered by start and then length');
            });
        });
    }
});
