// calculator.ts
import * as readline from 'readline';

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number | string {
    if (b === 0) return 'Error: Division by zero';
    return a / b;
  }

  power(a: number, b: number): number {
    return Math.pow(a, b);
  }

  modulus(a: number, b: number): number {
    return a % b;
  }

  calculate(a: number, b: number, op: string): number | string {
    switch (op) {
      case '+': return this.add(a, b);
      case '-': return this.subtract(a, b);
      case '*': return this.multiply(a, b);
      case '/': return this.divide(a, b);
      case '^': return this.power(a, b);
      case '%': return this.modulus(a, b);
      default: return 'Error: Unknown operator';
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const calc = new Calculator();

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('=== Simple TypeScript Calculator ===');
  console.log('Available operators: +  -  *  /  ^  %');
  console.log('Type "exit" anytime to quit.\n');

  while (true) {
    const firstInput = await askQuestion('Enter first number: ');
    if (firstInput.toLowerCase() === 'exit') break;

    const operator = await askQuestion('Enter operator: ');
    if (operator.toLowerCase() === 'exit') break;

    const secondInput = await askQuestion('Enter second number: ');
    if (secondInput.toLowerCase() === 'exit') break;

    const a = parseFloat(firstInput);
    const b = parseFloat(secondInput);

    if (isNaN(a) || isNaN(b)) {
      console.log('Error: Please enter valid numbers.\n');
      continue;
    }

    const result = calc.calculate(a, b, operator);
    console.log(`Result: ${result}\n`);
  }

  console.log('Goodbye!');
  rl.close();
}

main();
