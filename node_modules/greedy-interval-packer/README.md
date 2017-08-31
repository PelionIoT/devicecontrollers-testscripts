# A greedy interval packer

Given a list of intervals the packer will return a list of partitions
with no overlapping intervals.

Intervals are just objects with integer properties for `start` and
`end` where `start < end`.

[![npm version](https://badge.fury.io/js/greedy-interval-packer.svg)](http://badge.fury.io/js/greedy-interval-packer)
[![Build Status](https://travis-ci.org/One-com/greedy-interval-packer.svg)](https://travis-ci.org/One-com/greedy-interval-packer)
[![Coverage Status](https://coveralls.io/repos/One-com/greedy-interval-packer/badge.svg)](https://coveralls.io/r/One-com/greedy-interval-packer)
[![Dependency Status](https://david-dm.org/One-com/greedy-interval-packer.svg)](https://david-dm.org/One-com/greedy-interval-packer)
[![devDependency Status](https://david-dm.org/One-com/greedy-interval-packer/dev-status.svg)](https://david-dm.org/One-com/greedy-interval-packer#info=devDependencies)

## Usage

```js
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
```

If you specify the partitions to be grouped, you will get the
following result:

```js
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
```

## Installation

### Node

Install it with NPM or add it to your `package.json`:

```
$ npm install greedy-interval-packer
```

Then:

```js
var intervalPacker = require('greedy-interval-packer');

expect(intervalPacker([
    { start: 0, end: 2, value: '0' },
    { start: 3, end: 6, value: '1' },
    { start: 6, end: 10, value: '2' },
    { start: 3, end: 5, value: '3' },
    { start: 6, end: 8, value: '4' }
]), 'to equal', [
    [
        { start: 0, end: 2, value: '0' },
        { start: 3, end: 6, value: '1' },
        { start: 6, end: 10, value: '2' }
    ],
    [
        { start: 3, end: 5, value: '3' },
        { start: 6, end: 8, value: '4' }
    ]
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
```

### Browser

Include `greedy-interval-packer.js`.

```html
<script src="greedy-interval-packer.js"></script>
```

this will expose the `greedyIntervalPacker` function under the following namespace:

```js
var intervalPacker = com.one.greedyIntervalPacker;

expect(intervalPacker([
    { start: 0, end: 2, value: '0' },
    { start: 3, end: 6, value: '1' },
    { start: 6, end: 10, value: '2' },
    { start: 3, end: 5, value: '3' },
    { start: 6, end: 8, value: '4' }
]), 'to equal', [
    [
        { start: 0, end: 2, value: '0' },
        { start: 3, end: 6, value: '1' },
        { start: 6, end: 10, value: '2' }
    ],
    [
        { start: 3, end: 5, value: '3' },
        { start: 6, end: 8, value: '4' }
    ]
]);
```

### RequireJS

Include the library with RequireJS the following way:

```js
require.config({
    paths: {
        greedyIntervalPacker: 'path/to/greedy-interval-packer'
    }
});

define(['greedyIntervalPacker'], function (intervalPacker) {
    expect(intervalPacker([
        { start: 0, end: 2, value: '0' },
        { start: 3, end: 6, value: '1' },
        { start: 6, end: 10, value: '2' },
        { start: 3, end: 5, value: '3' },
        { start: 6, end: 8, value: '4' }
    ]), 'to equal', [
        [
            { start: 0, end: 2, value: '0' },
            { start: 3, end: 6, value: '1' },
            { start: 6, end: 10, value: '2' }
        ],
        [
            { start: 3, end: 5, value: '3' },
            { start: 6, end: 8, value: '4' }
        ]
    ]);
});
```

## License

Copyright © 2015, One.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
