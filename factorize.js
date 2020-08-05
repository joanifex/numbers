const fs = require("fs");

const WRITE_PATH = "./public/data.json";
const MAX = 100;
const range = n => [...Array(n).keys()].map(n => n + 1);

const construct = () =>
  range(MAX).reduce(
    (data, integer) => ({
      ...data,
      [integer]: factorize(integer),
    }),
    {}
  );

const build = constructed =>
  Object.entries(constructed).reduce(
    (data, [integer, factors]) => ({
      ...data,
      [integer]: decorateFactors(factors, integer),
    }),
    {}
  );

const decorateFactors = (factors, integer) =>
  factors.reduce(
    (factorData, [x, y]) => ({
      ...factorData,
      [`${x},${y}`]: decorateNodes(Number(integer), [x, y]),
    }),
    {}
  );

const factorize = integer =>
  range(integer).reduce(
    (factors, divisor) =>
      integer % divisor === 0
        ? [...factors, [divisor, integer / divisor]]
        : factors,
    []
  );

const decorateNodes = (integer, [x, y]) =>
  range(integer).map(n => ({
    position: n,
    column: (n - 1) % y,
    row: Math.floor((n - 1) / y),
  }));

const generateData = () => build(construct());

fs.writeFile(WRITE_PATH, JSON.stringify(generateData()), err =>
  console.log(err)
);
