var intervalPacker = require('../lib/greedyIntervalPacker');
var expect = require('unexpected').clone()
    .installPlugin(require('./unexpected-intervals'));

describe('greedy-interval-packer', function () {
    it('throws when given anything other than an array', function () {
        expect([
            [],
            [undefined],
            ['Hello'],
            [42]
        ], 'to be an array whose items satisfy', function (args) {
            expect(function () {
                intervalPacker.apply(null, args);
            }, 'to throw', 'The interval packer requires an array of objects with start and end properties.');
        });
    });

    it('throw if it finds in invalid interval', function () {
        expect([
            [{}],
            [{ start: 1, end: 2 }, {}],
            [{ start: 'foo', end: 'bar' }],
            [{ start: 2, end: 2 }],
            [{ start: 2, end: -2 }]
        ], 'to be an array whose items satisfy', function (intervals) {
            expect(function () {
                intervalPacker(intervals);
            }, 'to throw', 'Intervals must be objects with integer properties start and end where start < end.');
        });
    });

    describe('given a empty list of intervals', function () {
        it('returns an empty list of partitions', function () {
            expect(intervalPacker([]), 'to be empty');
        });
    });

    describe('given a list of intervals that does not overlap', function () {
        it('returns one partition with the intervals sorted by decresing start', function () {
            expect(['[6;10)', '[0;2)', '[3;6)'], 'to be partitioned as', [
                ['[0;2)', '[3;6)', '[6;10)']
            ]);
        });
    });

    describe('given a list of intervals that overlaps', function () {
        it('returns a list of partitions with no overlapping intervals that is packed greedily', function () {
            expect(['[6;10)', '[3;5)', '[0;2)', '[6;8)', '[3;6)'], 'to be partitioned as', [
                ['[0;2)', '[3;6)', '[6;10)'],
                ['[3;5)', '[6;8)']
            ]);

            expect(['[6;10)', '[3;5)', '[0;2)', '[6;8)', '[3;6)'], 'to be partitioned as', [
                ['[0;2)', '[3;6)', '[6;10)'],
                ['[3;5)', '[6;8)']
            ]);

            expect([
                '[0;2)', '[2;4)', '[4;6)', '[6;8)', '[8;10)',
                '[1;3)', '[3;5)', '[5;7)', '[7;9)'
            ], 'to be partitioned as', [
                ['[0;2)', '[2;4)', '[4;6)', '[6;8)', '[8;10)'],
                ['[1;3)', '[3;5)', '[5;7)', '[7;9)']
            ]);

            // This is not optimal but a greedy solution can't do it better
            expect([
                '[0;2)', '[2;4)',
                '[2;3)', '[3;10)'
            ], 'to be partitioned as', [
                ['[0;2)', '[2;4)'],
                ['[2;3)', '[3;10)']
            ]);

            expect([
                '[0;2)', '[2;6)',
                '[1;3)', '[3;5)',
                '[2;4)', '[4;6)',
                '[3;5)',
                '[3;4)', '[4;5)'
            ], 'to be partitioned as', [
                ['[0;2)', '[2;6)'],
                ['[1;3)', '[3;5)'],
                ['[2;4)', '[4;6)'],
                ['[3;5)'],
                ['[3;4)', '[4;5)']
            ]);
        });
    });

    it('evaluates the readme example correctly', function () {
        expect(intervalPacker([
            { start: 2, end: 4, value: '4' },
            { start: 4, end: 6, value: '5' },
            { start: 3, end: 4, value: '7' },
            { start: 3, end: 5, value: '6' },
            { start: 1, end: 3, value: '2' },
            { start: 3, end: 5, value: '3' },
            { start: 0, end: 2, value: '0' },
            { start: 4, end: 5, value: '8' },
            { start: 2, end: 6, value: '1' }
        ]), 'to equal', [
            [{ start: 0, end: 2, value: '0' }, { start: 2, end: 6, value: '1' }],
            [{ start: 1, end: 3, value: '2' }, { start: 3, end: 5, value: '3' }],
            [{ start: 2, end: 4, value: '4' }, { start: 4, end: 6, value: '5' }],
            [{ start: 3, end: 5, value: '6' }],
            [{ start: 3, end: 4, value: '7' }, { start: 4, end: 5, value: '8' }]
        ]);

        expect(intervalPacker([
            { start: 0, end: 2, value: '0' }, { start: 3, end: 6, value: '1' }, { start: 6, end: 10, value: '2' },
            { start: 3, end: 5, value: '3' }, { start: 6, end: 8, value: '4' }
        ]), 'to equal', [
            [{ start: 0, end: 2, value: '0' }, { start: 3, end: 6, value: '1' }, { start: 6, end: 10, value: '2' }],
            [{ start: 3, end: 5, value: '3' }, { start: 6, end: 8, value: '4' }]
        ]);

        expect(intervalPacker([
            { start: 0, end: 2, value: '0' }, { start: 3, end: 6, value: '1' }, { start: 6, end: 10, value: '2' },
            { start: 3, end: 5, value: '3' }, { start: 6, end: 8, value: '4' }
        ], { groupPartitions: true }), 'to equal', [
            [
                [{ start: 0, end: 2, value: '0' }]
            ],
            [
                [{ start: 3, end: 6, value: '1' }],
                [{ start: 3, end: 5, value: '3' }]
            ],
            [
                [{ start: 6, end: 10, value: '2' }],
                [{ start: 6, end: 8, value: '4' }]
            ]
        ]);
    });
});
