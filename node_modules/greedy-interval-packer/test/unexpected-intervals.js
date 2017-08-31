var intervalPacker = require('../lib/greedyIntervalPacker');
var intersects = require('../lib/intersection').intersects;
var byDescStartAndLength = require('../lib/byDescStartAndLength');

function parseInterval(intervalDefinition) {
    var m =  /\[(\d+);(\d+)\)/.exec(intervalDefinition);
    return { start: parseInt(m[1], 10), end: parseInt(m[2], 10) };
}

module.exports = {
    name: 'intervals',
    installInto: function (expect) {
        expect.addType({
            name: 'interval',
            identify: function (value) {
                return typeof value.start === 'number' && typeof value.end === 'number';
            },
            inspect: function (value, depth, output) {
                output.text('[').number(value.start).text(';').number(value.end).text(')');
            },
            equal: function (a, b) {
                return a === b || (a.start === b.start && a.end === b.end);
            }
        }).addAssertion('array', 'to be partitioned as', function (expect, subject, partitioning) {
            this.errorMode = 'nested';
            var intervals = subject.map(parseInterval);
            expect(intervalPacker(intervals), 'to equal', partitioning.map(function (partition) {
                return partition.map(parseInterval);
            }));
        }).addAssertion('interval', '[not] to intersect with', function (expect, subject, other) {
            expect(intersects(subject, other), '[not] to be truthy');
        }).addAssertion('array', 'not to have any overlapping intervals', function (expect, partitioning) {
            this.errorMode = 'nested';
            partitioning.forEach(function (partition) {
                partition.forEach(function (interval) {
                    partition.forEach(function (otherInterval) {
                        if (interval !== otherInterval) {
                            expect(interval, 'not to intersect with', otherInterval);
                        }
                    });
                });
            });
        }).addAssertion('array', 'to be ordered by start and then length', function (expect, partitioning) {
            this.errorMode = 'nested';
            partitioning.forEach(function (partition) {
                expect(partition, 'to equal', [].concat(partition).sort(byDescStartAndLength).reverse());
            });
        }).addAssertion('array', 'to only have intervals', function (expect, partitioning, intervals) {
            this.errorMode = 'nested';
            var expectedIntervals = [].concat(intervals).sort(byDescStartAndLength);
            var actualIntervals = partitioning.reduce(function (result, partition) {
                Array.prototype.push.apply(result, partition);
                return result;
            }, []).sort(byDescStartAndLength);
            expect(actualIntervals, 'to equal', expectedIntervals);
        });
    }
};
