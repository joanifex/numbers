const range = n => [...Array(n).keys()];
const percent = decimal => `${Math.floor(decimal * 100)}%`;

let data;
let number;
let factors;
let factorIndex;
let nodes;
let svg;

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

function initialize(update, render) {
  number = 1;
  factorIndex = 0;
  update();

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
  console.log(data);
  if (factorIndex > Object.keys(data[`${number}`]).length - 1) {
    factorIndex = Object.keys(data[`${number}`]).length;
  }
  factors = Object.keys(data[`${number}`])[factorIndex];
  nodes = data[`${number}`][factors];
}

function render() {
  if (number < 2) {
    decrementButton.setAttribute("disabled", true);
  } else {
    decrementButton.removeAttribute("disabled");
  }

  if (factorIndex < Object.keys(data[`${number}`]).length - 1) {
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
  factorsSpan.innerText = factors;

  const t = svg.transition().duration(750);

  svg
    .selectAll("rect")
    .data(nodes, d => d.position)
    .join(
      enter =>
        enter
          .append("rect")
          .attr("y", _ => 0)
          .attr("x", _ => 0)
          .call(enter =>
            enter
              .transition(t)
              .attr("y", data => data.column)
              .attr("x", data => data.row)
          ),
      update =>
        update.call(update =>
          update
            .transition(t)
            .attr("y", data => data.column)
            .attr("x", data => data.row)
        ),
      exit =>
        exit.call(exit =>
          exit
            .transition(t)
            .attr("y", _ => 0)
            .attr("x", _ => 0)
            .remove()
        )
    )
    .attr("fill", "black")
    .attr("height", _ => "1%")
    .attr("width", _ => "1%");
}

fetch("data.json")
  .then(response => response.json())
  .then(responseData => {
    data = responseData;
    console.log(data);
    initialize(update, render);
  });
