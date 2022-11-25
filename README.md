<div align="center">
  <a href="https://github.com/EricRovell/vector/actions">
    <img alt="build action status" src="https://github.com/EricRovell/vector/workflows/build/badge.svg" />
  </a>
  <a href="https://codecov.io/gh/EricRovell/vector">
    <img src="https://codecov.io/gh/EricRovell/vector/branch/main/graph/badge.svg?token=OCTMR1R41W"/>
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/@ericrovell/vector">
    <img alt="npm package version" src="https://badgen.net/npm/v/@ericrovell/vector/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/vector">
    <img alt="types included" src="https://badgen.net/npm/types/@ericrovell/vector/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/vector">
    <img alt="downloads count" src="https://badgen.net/npm/dt/@ericrovell/vector/" />
  </a>
  <a href="https://www.npmjs.com/package/@ericrovell/vector">
    <img alt="licence" src="https://badgen.net/npm/license/@ericrovell/vector/" />
  </a>
</div>

<div align="center">
  <a href="https://bundlephobia.com/package/@ericrovell/vector">
    <img alt="minified size" src="https://badgen.net/bundlephobia/min/@ericrovell/vector/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/vector">
    <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@ericrovell/vector/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/vector">
    <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@ericrovell/vector/" />
  </a>
  <a href="https://bundlephobia.com/package/@ericrovell/vector">
    <img alt="tree-shaking" src="https://badgen.net/bundlephobia/tree-shaking/@ericrovell/vector/" />
  </a>
</div>

# Vector

Euclidian vector (also known as "Geometric" vector) library written in Typescript. A vector is an entity that has both magnitude and direction. Both 2D and 3D vectors are supported.

## Features

- Dependency-free;
- Extendable;
- Immutable;
- Simple chainable API;
- Types included;
- Works in a browser and Node.js;

## Getting started

Package available via [npm](https://www.npmjs.com/package/@ericrovell/vector):

```
npm i @ericrovell/vector
```

```js
import { vector } from "@ericrovell/vector";

vector({ x: 1, y: 2 }).toString();  // -> "(1, 2, 0)"
```

## Parsing

<details>
  <summary>
    <code>vector(input)</code>
  </summary>

  Parses the given input and created a new `Vector` instance.

  ```js
  vector({ x: 1, y: 2, z: 3 }).toString();  // -> "(1, 2, 0)"
  vector([ 1, 2, 3 ]).toString();           // -> "(1, 2, 0)"
  ```
</details>

### Supported input

<details>
  <summary>
    <code>input: Coords</code>
  </summary>

  Parses the given input from `Coords` object and returns a new `Vector` instance.

  ```js
  vector({ x: 1 }).toString();               // -> "(1, 0, 0)"
  vector({ y: 2 }).toString();               // -> "(0, 2, 0)"
  vector({ z: 3 }).toString();               // -> "(0, 0, 3)"
  vector({ x: 1, y: 2 }).toString();         // -> "(1, 2, 0)"
  vector({ y: 2, z: 3 }).toString();         // -> "(0, 2, 3)"
  vector({ x: 1, z: 3 }).toString();         // -> "(1, 0, 3)"
  vector({ x: 1, y: 2, z: 3 }).toString();   // -> "(1, 2, 3)"
  ```

  The `Coords` object is considered valid if it is contains at least one of coordinate keys: `x`, `y`, or `z`.
  All missed keys defaults to zero, all extra keys are ignored.

  ```js
  vector({ x: 1, data: "hello!" }).toString();               // -> "(1, 0, 0)"
  vector({ x: 1, y: 2, z: 3, data: "hello!" }).toString();   // -> "(1, 2, 3)"
  ```
</details>

<details>
  <summary>
    <code>input: CoordsTuple</code>
  </summary>

  Parses the given input from `CoordsTuple` and returns a new `Vector` instance.

  ```js
  vector([ 1 ]).toString();         // -> "(1, 0, 0)"
  vector([ 1, 2 ]).toString();      // -> "(0, 2, 0)"
  vector([ 1, 2, 3 ]).toString();   // -> "(0, 0, 3)"
  ```

  Sparse arrays can be used to skip values, they are defaulted to zero:

  ```js
  vector([ , 2 ]).toString();     // -> "(0, 0, 0)"
  vector([ , , 3 ]).toString();   // -> "(0, 0, 3)"
  ```
</details>

<details>
  <summary>
    <code>input: CoordsPolar</code>
  </summary>

  Parses the given input from `CoordsPolar` representing the vector [in polar coordinates](https://en.wikipedia.org/wiki/Vector_notation#Spherical_vectors) and returns a new `Vector` instance:

  ```js
  vector({ phi: 0 }).toString();                                    // -> "(1, 0, 0)"
  vector({ phi: Math.PI / 2 }));                                    // -> "(0, 1, 0)";
  vector({ phi: 0, magnitude: 2 }).toString();                      // -> "(2, 0, 0)"
  vector({ phi: Math.PI / 2, magnitude: 2 }));                      // -> "(0, 2, 0)";
  vector({ theta: 0 })                                              // -> "(0, 0, 1)");
  vector({ theta: Math.PI / 2 })                                    // -> "(1, 0, 0)");
  vector({ phi: Math.PI / 2, theta: 0 })                            // -> "(0, 0, 1)");
  vector({ phi: Math.PI / 2, theta: Math.PI / 2 })                  // -> "(0, 1, 0)");
  vector({ phi: Math.PI / 2, theta: 0, magnitude: 2 })              // -> "(0, 0, 2)");
  vector({ phi: Math.PI / 2, theta: Math.PI / 2, magnitude: 2 })    // -> "(0, 2, 0)");
  ```

  By default angles input require [radians](https://en.wikipedia.org/wiki/Radian). To use degrees, pass a `degrees` property:

  ```js
  vector({ degrees: true, phi: 0 })                              // -> "(1, 0, 0)");
  vector({ degrees: true, phi: 90 })                             // -> "(0, 1, 0)");
  vector({ degrees: true, phi: 90, theta: 0, magnitude: 2 })     // -> "(0, 0, 2)");
  vector({ degrees: true, phi: 90, theta: 90, magnitude: 2 })    // -> "(0, 2, 0)");
  ```

  The `CoordsPolar` object is considered valid if it is contains at least one of angle keys: `phi` or `theta`. The `magnitude` defaults to unit length.
</details>

## API

<details>
  <summary>
    <code>.add(input: Input)</code>
  </summary>

	Performs the addition and returns the sum as new `Vector` instance.

  ```js
  vector({ x: 1, y: 2 }).add({ x: 3, y: 4 }).toString();  // -> "(4, 6, 0)"
  vector([ 1, 2, 3 ]).add([ 4, 5, 6 ]).toString();        // -> "(5, 7, 9)"
  ```

  Another instance can be used as an input as well:

  ```js
  const a = vector({ x: 1, y: 2, z: 3 });
  const b = vector({ x: -1, y: -2, z: -3 });

  a.add(b).toString();  // -> "(0, 0, 0)"
  ```
</details>

<details>
  <summary>
    <code>.inverted</code>
  </summary>

  Returns an inverted `Vector` instance.

  ```js
  vector({ x: -1, y: 2 }).inverted;   // -> "(1, -2, 0)"
  vector([ 1, -2, 3 ]).inverted;   // -> "(-1, 2, -3)"
  ```
</details>

<details>
  <summary>
    <code>.magnitude</code>
  </summary>

  Calculates the magnitude of the vector:

  ```js
  vector({ x: 0 }).magnitude;               // -> 0
  vector({ x: 3, y: 4 }).magnitude;         // -> 5
  vector({ x: 3, y: 4, z: 12 }).magnitude;  // -> 13
  ```
</details>

<details>
  <summary>
    <code>.magnitudeSq</code>
  </summary>

  Calculates the squared magnitude of the vector, which may be useful and faster where the real value is not that important, for example, to compare two vector's length:

  ```js
  vector({ x: 0 }).magnitudeSq;               // -> 0
  vector({ x: 3, y: 4 }).magnitudeSq;         // -> 25
  vector({ x: 3, y: 4, z: 12 }).magnitudeSq;  // -> 169
  ```
</details>

<details>
  <summary>
    <code>.scale(input: number)</code>
  </summary>

	Performs the scalar vector multiplication and returns a new `Vector` instance:

  ```js
  vector({ x: 1, y: 2 }).mul(2).toString();  // -> "(2, 4, 0)"
  vector([ 1, 2, 3 ]).mul(-2).toString();    // -> "(-2, -4, -6)"
  ```
</details>

<details>
  <summary>
    <code>.sub(input: Input)</code>
  </summary>

	Performs the subtraction and returns the result as new `Vector` instance.

  ```js
  vector({ x: 1, y: 2 }).sub({ x: 3, y: 4 }).toString();  // -> "(-2, -2, 0)"
  vector([ 1, 2, 3 ]).sub([ 4, 5, 6 ]).toString();        // -> "(-3, -3, -3)"
  ```

  Another instance can be used as an input as well:

  ```js
  const a = vector({ x: 1, y: 2, z: 3 });
  const b = vector({ x: 1, y: 2, z: 3 });

  a.sub(b).toString();  // -> "(0, 0, 0)"
  ```
</details>

<details>
  <summary>
    <code>.toString()</code>
  </summary>

  Returns a `Vector` string representation.

  ```js
  vector({ x: 1 }).toString();               // -> "(1, 0, 0)"
  vector({ x: 1, y: 2 }).toString();         // -> "(1, 2, 0)"
  vector({ x: 1, y: 2, z: 3 }).toString();   // -> "(1, 2, 3)"
  vector([ 1 ]).toString();                  // -> "(1, 0, 0)"
  vector([ 1, 2 ]).toString();               // -> "(0, 2, 0)"
  vector([ 1, 2, 3 ]).toString();            // -> "(0, 0, 3)"
  ```
</details>

<details>
  <summary>
    <code>.unit</code>
  </summary>

  Normalizes the original vector and returns [the unit vector](https://en.wikipedia.org/wiki/Unit_vector):

  ```js
  vector({ x: 0 }).unit.magnitude;                // -> 1
  vector({ x: 3, y: 4 }).unit.magnitude;          // -> 1
  vector({ x: 3, y: 4, z: 12 }).unit.magnitude;   // -> 1
  ```
</details>

<details>
  <summary>
    <code>.valid</code>
  </summary>

  On invalid input there is no error thrown.
  Method returns a boolean indicating whether or not a user input was valid.
  On invalid input the vector defaults to zero vector: (0, 0, 0).

  ```js
  vector([ 1, 2 ]).valid;  // -> true
  vector([ NaN ]).valid; // -> false
  vector({ x: 1, y: 2 }).valid;  // -> true
  vector({ a: 1, b: 2 }).valid; // -> false
  ```
</details>

## Extending

To extend the functionality for your needs, [extend](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) the parent `Vector` class:

```js
import { Vector, type Input } from "@ericrovell/vector";

class VectorExtended extends Vector {
	constructor(input: Input) {
		super(input);
	}

	get sum() {
		return this.x + this.y + this.z;
	}
}

const instance = new VectorExtended([ 1, 2, 3 ]);
instance.sum; // -> 6
```

## Types

Tha package includes all necessary types useful for all possible valid input options are available for import:

```ts
export type {
  Coords,
  CoordsTuple,
  Input,
  Vector
} from "@ericrovell/vector";
```

## Tests

To run the tests use the `npm run test` command.
