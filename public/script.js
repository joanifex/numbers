const [
  numberSpan,
  incrementButton,
  decrementButton,
  nextButton,
  previousButton,
  factorsSpan,
] = [
  "number",
  "increment",
  "decrement",
  "next",
  "previous",
  "factors",
].map(id => document.querySelector(`#${id}`));

const range = n => [...Array(n).keys()];

let number;
let factors;
let factorIndex;
let svg;

function initialize(update, render) {
  number = 1;
  factors = [[1, 1]];
  factorIndex = 0;

  svg = d3.select("svg");

  const increment = () => {
    number = number + 1;
  };
  const decrement = () => {
    if (number > 1) {
      number = number - 1;
    }
  };
  const next = () => {
    if (factorIndex < factors.length - 1) {
      factorIndex = factorIndex + 1;
    }
  };
  const previous = () => {
    if (factorIndex > 0) {
      factorIndex = factorIndex - 1;
    }
  };

  const react = operation => {
    operation();
    update();
    render();
  };

  [
    [incrementButton, increment],
    [decrementButton, decrement],
    [nextButton, next],
    [previousButton, previous],
  ].forEach(([button, operation]) =>
    button.addEventListener("click", () => react(operation))
  );

  render();
}

function update() {
  if (number === 1) {
    factors = [[1, 1]];
  }
  if (number === 2) {
    factors = [
      [1, 2],
      [2, 1],
    ];
  }
  if (number === 3) {
    factors = [
      [1, 3],
      [3, 1],
    ];
  }
  if (number === 4) {
    factors = [
      [1, 4],
      [2, 2],
      [4, 1],
    ];
  }
  if (number === 5) {
    factors = [
      [1, 5],
      [5, 1],
    ];
  }
  if (number === 6) {
    factors = [
      [1, 6],
      [2, 3],
      [3, 2],
      [6, 1],
    ];
  }
  if (number === 7) {
    factors = [
      [1, 7],
      [7, 1],
    ];
  }
  if (number === 8) {
    factors = [
      [1, 8],
      [2, 4],
      [4, 2],
      [8, 1],
    ];
  }
  if (number === 9) {
    factors = [
      [1, 9],
      [3, 3],
      [9, 1],
    ];
  }
  // 8: [[1,8], [2, 4], [2, [2, 2]]]

  if (factorIndex > factors.length - 1) {
    factorIndex = factors.length - 1;
  }
}

function render() {
  if (number < 2) {
    decrementButton.setAttribute("disabled", true);
  } else {
    decrementButton.removeAttribute("disabled");
  }

  if (factors.length && factorIndex < factors.length - 1) {
    nextButton.removeAttribute("disabled");
  } else {
    nextButton.setAttribute("disabled", true);
  }

  if (factors.length && factorIndex > 0) {
    previousButton.removeAttribute("disabled");
  } else {
    previousButton.setAttribute("disabled", true);
  }

  numberSpan.innerText = number.toString();
  factorsSpan.innerText = factors[factorIndex];

  svg
    .selectAll("rect")
    .data(factors)
    .join(enter => enter.append("rect"));
}

initialize(update, render);
