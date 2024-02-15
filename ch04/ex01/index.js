// 複素数 ... a + bi, aが実部,bが虚部,iが虚数単位
// i^2 = -1

export function add(c1, c2) {
    return {
        real: c1.real + c2.real,
        imag: c1.imag + c2.imag
    };
}

export function sub(c1, c2) {
    return {
        real: c1.real - c2.real,
        imag: c1.imag - c2.imag
    };
}

export function mul(c1, c2) {
    // (a + bi) * (c + di) = (a * c) + (a * di) + (bi * c) + (bi * di)
    // = (a * c) + (a * di) + (bi * c) - (b * d)
    // = ac - bd + (ad + bc)i
    return {
        real: c1.real * c2.real - c1.imag * c2.imag,
        imag: c1.real * c2.imag + c1.imag * c2.real
    };
}

export function div(c1, c2) {
    let denom = c2.real * c2.real + c2.imag * c2.imag;
    if (denom === 0) {
        throw new Error("Division by zero is not allowed in complex numbers.");
    }
    return {
        real: (c1.real * c2.real + c1.imag * c2.imag) / denom,
        imag: (c1.imag * c2.real - c1.real * c2.imag) / denom
    };
}
