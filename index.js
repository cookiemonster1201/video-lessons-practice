let range = {
  from: 1,
  to: 5,

  // for..of range вызывает этот метод один раз в самом начале
  [Symbol.iterator]() {
    // ...он возвращает перебираемый объект:
    // далее for..of работает только с этим объектом, запрашивая следующие значения
    return {
      current: this.from,
      last: this.to,

      // next() вызывается при каждой итерации цикла for..of
      next() {
        // нужно вернуть значение как объект {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// при переборе объекта range будут выведены числа от range.from до range.to
alert([...range]); // 1,2,3,4,5

// //=================================================================================
//более краткий вариант используя генератор
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // краткая запись для [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

alert([...range]); // 1,2,3,4,5

// =================================================================================
//перебор строки

let str = "Hello";

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // выводит символы один за другим
}

// MY EXAMPLE ======================================================================
const myObject = {
  start: 1,
  end: 9,

  [Symbol.iterator]: function () {
    let current = this.start;
    let last = this.end;

    return {
      next() {
        if (current <= last) {
          return {
            done: false,
            value: current++,
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  },
};

for (let number of myObject) {
  console.log(number);
}

const iterator = myObject[Symbol.iterator]();
console.log(iterator);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function* generateSum() {
  let a = 3;
  let b = 5;

  yield a + b;
  ++a;
  yield a + b;
  ++b;
  yield a + b;
  ++a;
  ++b;
  yield a + b;
}

let generator = generateSum();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
