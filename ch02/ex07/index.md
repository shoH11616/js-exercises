console.log(a, b, c);　は 0 1 0 と表示
console.log(a, b, e);　は 1 1 0 と表示

前者は
// prettier-ignore
const c
=
a
// prettier-ignore
++
b
となっており、const c =　aと　++b　の二つの式として解釈されたと考えられる

後者は
// prettier-ignore
const e = a++
b;
となっており、const e = a++（e = aがa++より前に実行されるため、eは0）と b の二つの式として解釈されたと考えられる