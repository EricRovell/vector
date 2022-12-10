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
    <code>vector(x: number | Input, y = 0, z = 0): Vector</code>
  </summary>

  Parses the given input and creates a new `Vector` instance.

  ```js
  vector(1, 2).toString();                  // -> "(1, 2, 0)"
  vector({ x: 1, y: 2, z: 3 }).toString();  // -> "(1, 2, 3)"
  vector([ 1, 2, 3 ]).toString();           // -> "(1, 2, 3)"
  ```
</details>

### Supported input

<details>
  <summary>
    <code>input: (x: number, y: number, z: number)</code>
  </summary>

  Parses numerical vector components from arguments.

  ```js
  vector(1).toString();        // -> "(1, 0, 0)"
  vector(1, 2).toString();     // -> "(1, 2, 0)"
  vector(1, 2, 3).toString();  // -> "(1, 2, 3)"
  ```
</details>

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

<details>
  <summary>
    <code>input: CoordsCylindrical</code>
  </summary>

  Parses the given input from `CoordsCylindrical` representing the vector [in cylindrical coordinate system](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system) and returns a new `Vector` instance:

  ```js
  vector({ p: Math.SQRT2, phi: Math.PI / 4, z: 5 }))    // -> "(1, 1, 5)"
  vector({ p: 7.0711, phi: -Math.PI / 4, z: 12 }))      // -> "(5, -5, 12)"
  ```

  By default angles input require [radians](https://en.wikipedia.org/wiki/Radian). To use degrees, pass a `degrees` property:

  ```js
  vector({ degrees: true, p: Math.SQRT2, phi: 45, z: 5 }))  // -> "(1, 1, 5)"
  vector({ degrees: true, p: 7.0711, phi: -45, z: 12 }))    // -> "(5, -5, 12)"
  ```

  The `CoordsCylindrical` object is considered valid if it is contains all properties: `p`, `phi`, and `z`. Only `degrees` property is optional.
</details>

## API

<details>
  <summary>
    <code>.add(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Performs the addition and returns the sum as new `Vector` instance.

  ```js
  vector(1, 2).add(3, 4).toString();                      // -> "(4, 6, 0)"
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
    <code>.addSelf(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Adds the another `Vector` instance or valid vector input to this vector.

  ```js
  const a = vector(1, 2, 3)
    .addSelf([ 1, 2, 3 ]);

  a.toString(); // -> "(2, 4, 6)"
  ```
</details>

<details>
  <summary>
    <code>.angle(input: Input, signed = false, degrees = false): number</code>
  </summary>

  Calculates the angle between two vectors.

  ```js
	vector([ 1, 2, 3 ].angle([ 4, 5, 6 ]) // -> 0.22573
	vector([ 1, 2, 3 ].angle([ 4, 5, 6 ], true) // -> -0.22573
	vector([ 1, 2, 3 ].angle([ 4, 5, 6 ], true, true) // -> -12.93315
  ```
</details>

<details>
  <summary>
    <code>.copy(): Vector</code>
  </summary>

  Returns a copy of current vector instance.

  ```js
  const a = vector([ 1, 2, 3 ]);
  const b = a.copy();

  b.toString(); // -> "(1, 2, 3)"
  ```
</details>

<details>
  <summary>
    <code>.cross(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Calculates the cross product between two vectors and returns a new `Vector` instance.

  ```js
  vector(1, 2, 3).cross(4, 5, 6)         // -> (-3, 6, -3)
	vector([ 1, 2, 3 ]).cross([ 4, 5, 6 ]) // -> (-3, 6, -3)
	vector([ -2.5 ]).cross([ 4, 5.3, -8 ]) // -> (0, -20, -13.25)
  ```
</details>

<details>
  <summary>
    <code>.distance(x: Input | number, y?: number, z?: number): number</code>
  </summary>

  Calculates the Euclidian distance between two points, considering a point as a vector.

  ```js
	vector([ 1, 2, 3 ]).distance([ 4, 5, 6 ]) // -> 5.19615
	vector([ -2.5 ]).distance([ 4, 5.3, -8 ]) // -> 11.59051
  ```
</details>

<details>
  <summary>
    <code>.distanceSq(x: Input | number, y?: number, z?: number): number</code>
  </summary>

  Calculates the squared Euclidian distance between two points, considering a point as a vector.
  Slighty more efficient to calculate, useful to comparing.

  ```js
	vector([ 1, 2, 3 ]).distanceSq([ 4, 5, 6 ]) // -> 27
	vector([ -2.5 ]).distanceSq([ 4, 5.3, -8 ]) // -> 134.34
  ```
</details>

<details>
  <summary>
    <code>.dot(x: Input | number, y?: number, z?: number): number</code>
  </summary>

  Calculates the dot product of two vectors.

  ```js
	vector(1, 2, 3).dot(4, 5, 6)   // -> 32
	vector([ -2.5 ]).dot([ 4, 5.3, -8 ])   // -> -10
  ```
</details>

<details>
  <summary>
    <code>.equals(x: Input | number, y?: number, z?: number): boolean</code>
  </summary>

  Performs an equality check against another vector input or `Vector` instance.

  ```js
  vector(1, 2, 3).equals(1, 2, 3);                  // -> true
  vector({ x: 1, y: 2 }).equals([ 1, 2 ]);          // -> true
  vector({ x: -1, y: -2 }).equals({ x: -1, y: 2});  // -> false
  ```
</details>

<details>
  <summary>
    <code>.getPhi(degrees = false): number</code>
  </summary>

  Calculates vector's azimutal angle.

  ```js
  vector({ x: 3, y: 4 }).getPhi();    // -> 0.927295
  vector([ 1, -2, 3 ]).getPhi(true);   // -> 53.130102
  ```
</details>

<details>
  <summary>
    <code>.getTheta(degrees = false): number</code>
  </summary>

  Calculates vector's elevation angle.

  ```js
  vector({ x: 3, y: 4, z: 5 }).getTheta();       // -> 0.785398
  vector({ x: 3, y: 4, z: 5 }).getTheta(true);   // -> 45
  ```
</details>

<details>
  <summary>
    <code>.inverted: Vector</code>
  </summary>

  Returns an inverted `Vector` instance.

  ```js
  vector({ x: -1, y: 2 }).inverted;   // -> "(1, -2, 0)"
  vector([ 1, -2, 3 ]).inverted;   // -> "(-1, 2, -3)"
  ```
</details>

<details>
  <summary>
    <code>.lerp(input: Input, coef = 1): Vector</code>
  </summary>

  Linearly interpolate the vector to another vector.

  ```js
  const a = vector([ 4, 8, 16 ]);
  const b = vector([ 8, 24, 48 ]);

  a.lerp(b)         // ->  "(4, 8, 16)"
  a.lerp(b, -0.5)   // ->  "(4, 8, 16)"
  a.lerp(b, 0.25)   // ->  "(5, 12, 24)"
  a.lerp(b, 0.5)    // ->  "(6, 16, 32)"
  a.lerp(b, 0.75)   // ->  "(7, 20, 40)"
  a.lerp(b, 1)      // ->  "(8, 24, 48)"
  a.lerp(b, 1.5)    // ->  "(8, 24, 48)"
  ```
</details>

<details>
  <summary>
    <code>.limit(value: number): Vector</code>
  </summary>

  Limits the magnitude of the vector and returns a new `Vector` instance.

  ```js
  vector({ x: 3, y: 4 }).limit(10).magnitude          // -> 5
  vector({ x: 3, y: 4 }).limit(2).magnitude           // -> 2
  vector({ x: 3, y: 4 }).limit(5).magnitude           // -> 5
  vector({ x: 3, y: 4, z: 12 }).limit(15).magnitude   // -> 13
  vector({ x: 3, y: 4, z: 12 }).limit(10).magnitude   // -> 10
  vector({ x: 3, y: 4, z: 12 }).limit(13).magnitude   // -> 13
  ```
</details>

<details>
  <summary>
    <code>.magnitude: number</code>
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
    <code>.magnitudeSq: number</code>
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
    <code>.normalizeSelf(): Vector</code>
  </summary>

  Makes the current vector a unit vector (sets the magnitude to 1).

  ```js
  vector(0).normalizeSelf().margnitude;          // -> 0
  vector(3, 4).normalizeSelf().margnitude;       // -> 5
  vector(3, 4, 12).normalizeSelf().margnitude;   // -> 13
  ```
</details>

<details>
  <summary>
    <code>.random(random = Math.random): Vector</code>
  </summary>

  Makes a new 2D vector from a random azimuthal angle.

  ```js
  vector().random().toArray() // ->  [ 0.23565, 0.75624, 0 ]
  ```
</details>

<details>
  <summary>
    <code>.random3d(random = Math.random): Vector</code>
  </summary>

  Makes a new 3D vector.

  Correct distribution thanks to [wolfram](https://mathworld.wolfram.com/SpherePointPicking.html).

  ```js
  vector().random3d().toArray() // ->  [ 0.23565, 0.75624, -0.56571 ]
  ```
</details>

<details>
  <summary>
    <code>.reflect(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Reflects the vector about a normal line for 2D vector, or about a normal to a plane in 3D.

  Here, in an example the vector `a` can be viewed as the incident ray, the vector `n` as the normal, and the resulting vector should be the reflected ray.

  ```js
  const a = vector([ 4, 6 ]);
  const n = vector([ 0, -1 ]);

  a.reflect(n).toString() // ->  "(4, -6, 0)"
  ```
</details>

<details>
  <summary>
    <code>.rotate(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the vector by an azimuthal angle (XOY plane) and returns a new `Vector` instance.

  ```js
  vector({ x: 1, y: 2 }).rotate(Math.PI / 3);
  vector({ x: 1, y: 2 }).rotate(60, true);
  ```
</details>

<details>
  <summary>
    <code>.rotateSelf(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the current vector by an azimuthal angle (XOY plane).

  ```js
  vector(1, 2).rotateSelf(Math.PI / 3);
  vector(1, 2).rotateSelf(60, true);
  ```
</details>

<details>
  <summary>
    <code>.rotate3d(phi: number = 0, theta: number = 0, degrees = false): Vector</code>
  </summary>

  Rotates the vector by an azimuthal and elevation angles and returns a new `Vector` instance.

  ```js
  vector({ x: 1, y: 2, z: 3 }).rotate3d(Math.PI / 3, Math.PI / 6);
  vector({ x: 1, y: 2, z: 3 }).rotate3d(60, 30, true);
  ```
</details>

<details>
  <summary>
    <code>.rotateSelf3d(phi: number = 0, theta: number = 0, degrees = false): Vector</code>
  </summary>

  Rotates the current vector by an azimuthal and elevation angles.

  ```js
  vector({ x: 1, y: 2, z: 3 }).rotateSelf3d(Math.PI / 3, Math.PI / 6);
  vector({ x: 1, y: 2, z: 3 }).rotateSelf3d(60, 30, true);
  ```
</details>

<details>
  <summary>
    <code>.set(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Set's the current vector state from another `Vector` instance or valid vector input.

  ```js
  const v1 = vector(1, 2, 3).set(0, 0, 0);
  v1.set([ 3, 4, 5 ]);
  v1.set({ x: -1, y: -2, z: -3 });

  v1.toString() // -> "(-1, -2, -3)"
  ```
</details>

<details>
  <summary>
    <code>.setComponent(component: Component, value: number): Vector</code>
  </summary>

  Sets the vector component value and returns a new `Vector` instance.

  ```js
  vector(1, 2, 3).setComponent("x", 2).toString(); // -> "(2, 2, 3)"
  vector(1, 2, 3).setComponent("y", 3).toString(); // -> "(1, 3, 3)"
  vector(1, 2, 3).setComponent("z", 4).toString(); // -> "(1, 2, 4)"
  ```
</details>

<details>
  <summary>
    <code>.setComponentSelf(component: Component, value: number): Vector</code>
  </summary>

  Sets the current vector's component value.

  ```js
  const v = vector(1, 2, 3)
    .setComponentSelf("x", 0)
    .setComponentSelf("y", 0)
    .setComponentSelf("z", 0)

  .toString() // -> "(0, 0, 0)"
  ```
</details>

<details>
  <summary>
    <code>.setMagnitude(value: number): Vector</code>
  </summary>

  Sets the magnitude of the vector and returns a new `Vector` instance.

  ```js
  vector({ x: 1 }).setMagnitude(5).magnitude               // -> 5;
  vector({ x: 1, y: 2 }).setMagnitude(5).magnitude         // -> 5;
  vector({ x: 1, y: 2, z: 3 }).setMagnitude(5).magnitude   // -> 5;
  ```
</details>

<details>
  <summary>
    <code>.setPhi(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the vector to a specific azimuthal angle (OXY plane) and returns a new `Vector` instance.

  ```js
  vector({ x: 1, y: 2 }).setPhi(Math.PI / 3);
  vector({ x: 1, y: 2, z: 3 }).setPhi(60, true);
  ```
</details>

<details>
  <summary>
    <code>.setPhiSelf(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the current vector to a specific azimuthal angle (OXY plane).

  ```js
  vector({ x: 1, y: 2 }).setPhiSelf(Math.PI / 3);
  vector({ x: 1, y: 2, z: 3 }).setPhiSelf(60, true);
  ```
</details>

<details>
  <summary>
    <code>.setTheta(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the vector to a specific elevation angle and returns a new `Vector` instance.

  ```js
  vector({ x: 1, y: 2 }).setTheta(Math.PI / 3);
  vector({ x: 1, y: 2, z: 3 }).setTheta(60, true);
  ```
</details>

<details>
  <summary>
    <code>.setThetaSelf(value: number, degrees = false): Vector</code>
  </summary>

  Rotates the current vector to a specific elevation angle.

  ```js
  vector({ x: 1, y: 2 }).setThetaSelf(Math.PI / 3);
  vector({ x: 1, y: 2, z: 3 }).setThetaSelf(60, true);
  ```
</details>

<details>
  <summary>
    <code>.scale(value: number, inverse = false): Vector</code>
  </summary>

  Performs the scalar vector multiplication and returns a new `Vector` instance:

  ```js
  vector(1, 2).scale(2).toString();  // -> "(2, 4, 0)"
  vector(1, 2, 3).scale(-2).toString();    // -> "(-2, -4, -6)"
  ```

  The second parameter turns the passed `value` into reciprocal, in other words the division will be performed:

  ```js
  vector(2, 4, 6).scale(2, true).toString(); // -> "(1, 2, 3)"
  ```

  Although the same effect can be obtained just with `.scale(0.5)`, it isuseful when the variable may have zero value. In case of zero division the zero vector will be returned and marked as invalid.

  ```js
  const v = vector(1, 2, 3).scale(0, true);

  v.valid      // -> false
  v.toString() // -> "(0, 0, 0)"
  ```
</details>

<details>
  <summary>
    <code>.scaleSelf(value: number, inverse = false): Vector</code>
  </summary>

  Scales this vector by a scalar value.

  ```js
  const a = vector(-1, 2, 3)
    .scaleSelf(5)
    .scaleSelf(-2);

  a.toString() // -> "(10, -20, -30)"
  ```

  The second parameter turns the passed `value` into reciprocal, in other words the division will be performed:

  ```js
  const v = vector(-12, -18, -24)
    .scale(2, true)
    .scale(-3, true);

  v.toString(); // -> "(2, 3, 4)"
  ```

  It is useful when the variable may have zero value. In this case the vector components won't change.
</details>

<details>
  <summary>
    <code>.sub(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Performs the subtraction and returns the result as new `Vector` instance.

  ```js
  vector(1, 2, 3).sub(2, 3, 4).toString()                 // -> "(-1, -1, -1)"
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
    <code>.subSelf(x: Input | number, y?: number, z?: number): Vector</code>
  </summary>

  Subtracts another `Vector` instance or valid vector input from this vector.

  ```js
  const a = vector(1, 2, 3)
    .subSelf([ 2, 1, 5 ]);

  a.toString(); // -> "(-1, 1, -2)"
  ```
</details>

<details>
  <summary>
    <code>.toArray(): number[]</code>
  </summary>

  Returns vector's components packed into array.

  ```js
  vector({ x: 1 }).toArray();               // -> [ 1, 0, 0 ]
  vector({ x: 1, y: 2 }).toArray();         // -> [ 1, 2, 0 ]
  vector({ x: 1, y: 2, z: 3 }).toArray();   // -> [ 1, 2, 3 ]
  ```
</details>

<details>
  <summary>
    <code>.toString(): `(x: number, y: number, z: number)`</code>
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
    <code>.unit: Vector</code>
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
    <code>.valid: boolean</code>
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

<details>
  <summary>
    <code>.valueOf(): number</code>
  </summary>

  Converts the vector instance to primitive value - it's magnitude.

  ```js
  const a = vector([ 3, 4 ]);
  const b = vector([ 6, 8 ]);

  a + b // -> 15
  ```
</details>

## Other Features

### Extedibility

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

## Iterability

The `Vector` instance can be iterated via `for ... of` loop to loop through the vector's components:

```js
for (const component of vector([ 1, 2, 3 ])) {
  console.log(component);
  // -> 1, 2, 3
}
```

The same way the spread operator can be used, Array.from(), and all other methods and functions that operates on iterables.

## Types

Tha package includes all necessary types useful for all possible valid input options are available for import:

```ts
export type {
  Coords,
  CoordsTuple,
  CoordsPolar,
  Input,
  Vector
} from "@ericrovell/vector";
```

## Tests

To run the tests use the `npm run test` command.
