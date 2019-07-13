const Calculator = {
  Sum: (a: number, b: number): number => a + b
};

describe('calculate', function() {
  it('add', function() {
    let result = Calculator.Sum(5, 2);
    expect(result).toBe(7);
  });
});
