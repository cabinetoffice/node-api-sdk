import { describe, test, expect } from '@jest/globals';

import { add } from '../../src/index';

describe('Dummy test suite', () => {
    test('test add sums 2 numbers', () => {
        const sum = add(2, 3);
        expect(sum).toEqual(5);
    });
});
