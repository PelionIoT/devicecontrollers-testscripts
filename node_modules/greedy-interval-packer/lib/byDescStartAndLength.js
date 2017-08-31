module.exports = function (a, b) {
    var c = b.start - a.start;
    if (c !== 0) { return c; }
    return (a.end - a.start) - (b.end - b.start);
};
