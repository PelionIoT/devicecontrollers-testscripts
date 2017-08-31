var intersection = {
    intersects: function intersects(x, y) {
        return (x.start < y.end && y.start < x.end) || x.start === y.start;
    },

    intersectsWithSome: function intersectsWithSome(intervals, interval) {
        function intersectWithInterval(other) {
            return intersection.intersects(interval, other);
        }
        return intervals.some(intersectWithInterval);
    }
};

module.exports = intersection;
