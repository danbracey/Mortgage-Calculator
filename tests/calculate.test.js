const calculate = require('../calculate');

test('Test that mortgage calculator functions with pre-defined values', () => {
    expect(calculate(180000, 18000, 6, 25)).toBe(1159.74);
});

