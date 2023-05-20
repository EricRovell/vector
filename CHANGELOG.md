# Rational

## 0.16.0 (2023-05-20)

- [fix]: handle non-positive values for `.limit()` and `.limitSelf()` methods;
- [feat]: implemented `crossSelf()` method, the mutable version of `cross()`;

## 0.15.0 (2022-12-13)

- [feat]: `.map()` method;
- [feat]: `.mapSelf()` method;
- [refactor]: use `.mapSelf` and `.map` internally to simplify other methods internals;
- [breaking]: replace `.unit` getter with `.normalize()` method;

## 0.14.0 (2022-12-12)

- [feat]: `.setMagnitudeSelf()` method;
- [feat]: `.limitSelf()` method;
- [feat]: `round` method;
- [feat]: `floor` method;
- [feat]: `ceil` method;
- [feat]: `clamp` method;

## 0.13.0 (2022-12-10)

- [feat]: `scale()` and `scaleSelf()` second argument for reciprocal scaling;

## 0.12.1 (2022-12-04)

- [fix]: rename `postinstall` script, as it used dev dependency and breaked the `CI/CD` pipeline;

## 0.12.0 (2022-12-03)

- [feat]: [Cylindrical coordinate system](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system) input support;

## 0.11.1 (2022-12-01)

- [fix]: Update ESM module extension for new Node version;

## 0.11.0 (2022-11-29)

- [feat]: `addSelf()` method;
- [feat]: `scaleSelf()` method;
- [feat]: `subSelf()` method;
- [feat]: `rotateSelf()` method;
- [feat]: `rotateSelf3d()` method;
- [feat]: `setPhiSelf()` method;
- [feat]: `setThetaSelf()` method;
- [feat]: `setComponentSelf()` method;
- [feat]: `set()` method;
- [feat]: `normalizeSelf()` method;
- [feat]: update input options for `add()`, `cross()`, `distance()`, `distanceSq()`, `dot()`, `equality()`, `reflect()`, `sub()` methods;
- [breaking]: update `lerp()` default `coef` value to 1;

## 0.10.0 (2022-11-28)

- [feat]: `vector` instance can be iterated over it's components;
- [feat]: providing vector components as arguments to constructor;
- [brekaing]: disallow sparse array input;
- [feat]: `setComponent()` method;

## 0.9.0 (2022-11-28)

- [feat]: `random()` method;
- [feat]: `random3d()` method;

## 0.8.0 (2022-11-28)

- [feat]: `toArray()` method;
- [feat]: `valueOf()` method;

## 0.7.0 (2022-11-28)

- [feat]: `.distance()` and `.distanceSq()` methods;
- [feat]: `angle()` method;
- [feat]: `lerp()` method;
- [feat]: `copy()` method;
- [feat]: `reflect()` method;

## 0.6.0 (2022-11-27)

- [feat]: `.equals()` method;
- [feat]: `.cross()` method;
- [feat]: `.dot()` method;

## 0.5.0 (2022-11-27)

- [feat]: Azimuthal (`phi`) and Elevation (`theta`) angles getters;
- [feat]: Azimuthal (`phi`) and Elevation (`theta`) angles setters;
- [feat]: `.rotate(phi)` and `.rotate3d(phi, theta)` methods;

## 0.4.0 (2022-11-25)

- [feat]: `magnitude` and `magnitudeSq` properties;
- [feat]: `unit` property;
- [feat]: `.setMagnitude()` method;
- [feat]: `.limit()` method;

## 0.3.0 (2022-11-25)

- [feat]: parse input using polar coordinates input;

## 0.2.0 (2022-11-24)

- [feat]: `.add()` method for vector addition;
- [feat]: `.scale()` method for scalar vector multiplication;
- [feat]: `inverted` property for inverting the vector;
- [feat]: `.sub()` method for vector subtraction;

## 0.1.0 (2022-11-23)

- [chore]: First release, just parsing user input functionality;
