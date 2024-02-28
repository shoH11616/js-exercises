import { add, sub, mul, div } from './index.js';

describe('Complex number operations', () => {
    describe('add function', () => {
        // 実部と虚部が正の整数の場合
        it('correctly add two complex numbers', () => {
            expect(add({real: 1, imag: 2}, {real: 3, imag: 4})).toEqual({real: 4, imag: 6}); // => pass
        });

        // 実部と虚部が負の整数の場合
        it('correctly add two complex negative numbers', () => {
            expect(add({real: -1, imag: -2}, {real: -3, imag: -4})).toEqual({real: -4, imag: -6}); // => pass
        });

        // 虚部が0の場合
        it('correctly add when imaginary parts are zero', () => {
            expect(add({real: 1, imag: 0}, {real: 3, imag: 0})).toEqual({real: 4, imag: 0}); // => pass
        });

        // 実部が0の場合
        it('correctly add when real parts are zero', () => {
            expect(add({real: 0, imag: 2}, {real: 0, imag: 4})).toEqual({real: 0, imag: 6}); // => pass
        });
    });

    describe('sub function', () => {
        // 実部と虚部が正の整数の場合
        it('correctly subtract two complex numbers', () => {
            expect(sub({real: 1, imag: 2}, {real: 3, imag: 4})).toEqual({real: -2, imag: -2}); // => pass
        });

        // 実部と虚部が負の整数の場合
        it('correctly subtract two complex negative numbers', () => {
            expect(sub({real: -1, imag: -2}, {real: -3, imag: -4})).toEqual({real: 2, imag: 2}); // => pass
        });

        // 虚部が0の場合
        it('correctly subtract when imaginary parts are zero', () => {
            expect(sub({real: 3, imag: 0}, {real: 1, imag: 0})).toEqual({real: 2, imag: 0}); // => pass
        });

        // 実部が0の場合
        it('correctly subtract when real parts are zero', () => {
            expect(sub({real: 0, imag: 4}, {real: 0, imag: 2})).toEqual({real: 0, imag: 2}); // => pass
        });
    });

    describe('mul function', () => {
        // 実部と虚部が正の整数の場合
        it('correctly multiply two complex numbers', () => {
            expect(mul({real: 1, imag: 2}, {real: 3, imag: 4})).toEqual({real: -5, imag: 10}); // => pass
        });

        // 実部と虚部が負の整数の場合
        it('correctly multiply two complex negative numbers', () => {
            expect(mul({real: -1, imag: -2}, {real: -3, imag: -4})).toEqual({real: -5, imag: 10}); // => pass
        });

        // 虚部が0の場合
        it('correctly multiply when imaginary parts are zero', () => {
            expect(mul({real: 3, imag: 0}, {real: 1, imag: 0})).toEqual({real: 3, imag: 0}); // => pass
        });

        // 実部が0の場合
        it('correctly multiply when real parts are zero', () => {
            expect(mul({real: 0, imag: 4}, {real: 0, imag: 2})).toEqual({real: -8, imag: 0}); // => pass
        });
    });

    describe('div function', () => {
        // 実部と虚部が正の整数の場合
        it('correctly divide two complex numbers', () => {
            expect(div({real: 1, imag: 2}, {real: 3, imag: 4})).toEqual({real: 0.44, imag: 0.08}); // => pass
        });

        // 実部と虚部が負の整数の場合
        it('correctly divide two complex negative numbers', () => {
            expect(div({real: -1, imag: -2}, {real: -3, imag: -4})).toEqual({real: 0.44, imag: 0.08}); // => pass
        });

        // 0除算になる場合、エラーを出す
        it('throw an error when dividing by zero', () => {
            expect(() => div({real: 1, imag: 2}, {real: 0, imag: 0})).toThrow('Division by zero is not allowed in complex numbers.'); // => pass
        });
    });
});
