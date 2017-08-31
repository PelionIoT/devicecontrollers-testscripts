var intersectsWithSome = require('./intersection').intersectsWithSome;
var byDescStartAndLength = require('./byDescStartAndLength');

module.exports = function greedyIntervalPacker(intervals, options) {
    options = options || {};

    if (!Array.isArray(intervals)) {
        throw new Error('The interval packer requires an array of objects with start and end properties.');
    }

    if (intervals.length === 0) {
        return [];
    }

    intervals.forEach(function (interval) {
        if (
            typeof interval !== 'object' ||
            typeof interval.start !== 'number' ||
            typeof interval.end !== 'number' ||
            interval.end <= interval.start
        ) {
            throw new Error('Intervals must be objects with integer properties start and end where start < end.');
        }
    });

    intervals = [].concat(intervals).sort(byDescStartAndLength);

    var currentPartition;
    var partitions = [];
    var currentPartitionEnd = -Infinity;

    while (intervals.length > 0) {
        var interval = intervals.pop();

        if (currentPartitionEnd <= interval.start) {
            currentPartition = [[]];
            partitions.push(currentPartition);
        }

        var i = 0;

        while (
            i < currentPartition.length &&
            intersectsWithSome(currentPartition[i], interval)
        ) {
            i += 1;
        }
        (currentPartition[i] = currentPartition[i] || []).push(interval);
        currentPartitionEnd = Math.max(currentPartitionEnd, interval.end);
    }

    if (!options.groupPartitions) {
        return partitions.reduce(function (result, partition) {
            partition.forEach(function (partitionGroup, i) {
                result[i] = result[i] || [];
                Array.prototype.push.apply(result[i], partitionGroup);
                return result;
            });
            return result;
        }, []);
    } else {
        return partitions;
    }
};
