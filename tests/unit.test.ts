import { describe, expect, it } from "vitest";
import { vector, Vector } from "../src";
import type { Component, Coords, CoordsCylindrical, CoordsPolar, CoordsTuple, Input, InputUser } from "../src/types";
import { round } from "../src/utils";

describe("Rational constructor", () => {
	it("Accepts a class instance input", () => {
		const instance = new Vector();
		expect(vector(instance).toString()).toBe("(0, 0, 0)");
	});
});

describe("Parsing", () => {
	it("No arguments creates a zero vector", () => {
		expect(vector().toString()).toBe("(0, 0, 0)");
	});
	it("Parses arguments", () => {
		const fn = (x?: number, y?: number, z?: number) => vector(x, y, z).toString();

		expect(fn(1)).toBe("(1, 0, 0)");
		expect(fn(1, 2)).toBe("(1, 2, 0)");
		expect(fn(1, 2, 3)).toBe("(1, 2, 3)");
	});
	it("Parses a coordinates object input", () => {
		const fn = (input?: Partial<Coords>) => vector(input).toString();

		expect(fn()).toBe("(0, 0, 0)");
		expect(fn({ x: 1 })).toBe("(1, 0, 0)");
		expect(fn({ y: 2 })).toBe("(0, 2, 0)");
		expect(fn({ z: 3 })).toBe("(0, 0, 3)");
		expect(fn({ x: 1, y: 2 })).toBe("(1, 2, 0)");
		expect(fn({ x: 1, z: 3 })).toBe("(1, 0, 3)");
		expect(fn({ y: 2, z: 3 })).toBe("(0, 2, 3)");
		expect(fn({ x: 1, y: 2, z: 3 })).toBe("(1, 2, 3)");
	});
	it("Parses a coordinates object input with odd data", () => {
		const fn = (input?: Partial<Coords>) => vector(input).toString();

		// @ts-expect-error: test against invalid input
		expect(fn({ x: 1, a: 2 })).toBe("(1, 0, 0)");
		// @ts-expect-error: test against invalid input
		expect(fn({ y: 2, a: 2 })).toBe("(0, 2, 0)");
		// @ts-expect-error: test against invalid input
		expect(fn({ z: 3, a: 2 })).toBe("(0, 0, 3)");
		// @ts-expect-error: test against invalid input
		expect(fn({ x: 1, y: 2, a: 2 })).toBe("(1, 2, 0)");
		// @ts-expect-error: test against invalid input
		expect(fn({ x: 1, z: 3, a: 2 })).toBe("(1, 0, 3)");
		// @ts-expect-error: test against invalid input
		expect(fn({ y: 2, z: 3, a: 2 })).toBe("(0, 2, 3)");
		// @ts-expect-error: test against invalid input
		expect(fn({ x: 1, y: 2, z: 3, a: 2 })).toBe("(1, 2, 3)");
	});
	it("Parses a coordinates tuple input", () => {
		const fn = (input: CoordsTuple) => vector(input).toString();

		expect(fn([ 1 ])).toBe("(1, 0, 0)");
		expect(fn([ 1, 2 ])).toBe("(1, 2, 0)");
		expect(fn([ 1, 2, 3 ])).toBe("(1, 2, 3)");
	});
	it("Parses a polar coordinates input", () => {
		const fn = (input: Partial<CoordsPolar>) => vector(input).toString();

		expect(fn({ phi: 0 })).toBe("(1, 0, 0)");
		expect(fn({ phi: Math.PI / 2 })).toBe("(0, 1, 0)");
		expect(fn({ phi: Math.PI })).toBe("(-1, 0, 0)");
		expect(fn({ phi: 3 * Math.PI / 2 })).toBe("(0, -1, 0)");
		expect(fn({ phi: 2 * Math.PI })).toBe("(1, 0, 0)");

		expect(fn({ degrees: true, phi: 0 })).toBe("(1, 0, 0)");
		expect(fn({ degrees: true, phi: 90 })).toBe("(0, 1, 0)");
		expect(fn({ degrees: true, phi: 180 })).toBe("(-1, 0, 0)");
		expect(fn({ degrees: true, phi: 270 })).toBe("(0, -1, 0)");
		expect(fn({ degrees: true, phi: 360 })).toBe("(1, 0, 0)");

		expect(fn({ theta: 0 })).toBe("(0, 0, 1)");
		expect(fn({ theta: Math.PI / 2 })).toBe("(1, 0, 0)");
		expect(fn({ theta: Math.PI })).toBe("(0, 0, -1)");
		expect(fn({ theta: 3 * Math.PI / 2 })).toBe("(-1, 0, 0)");
		expect(fn({ theta: 2 * Math.PI })).toBe("(0, 0, 1)");

		expect(fn({ degrees: true, theta: 0 })).toBe("(0, 0, 1)");
		expect(fn({ degrees: true, theta: 90 })).toBe("(1, 0, 0)");
		expect(fn({ degrees: true, theta: 180 })).toBe("(0, 0, -1)");
		expect(fn({ degrees: true, theta: 270 })).toBe("(-1, 0, 0)");
		expect(fn({ degrees: true, theta: 360 })).toBe("(0, 0, 1)");

		expect(fn({ phi: Math.PI / 2, theta: 0 })).toBe("(0, 0, 1)");
		expect(fn({ phi: Math.PI / 2, theta: Math.PI / 2 })).toBe("(0, 1, 0)");
		expect(fn({ phi: Math.PI / 2, theta: Math.PI })).toBe("(0, 0, -1)");
		expect(fn({ phi: Math.PI / 2, theta: 3 * Math.PI / 2 })).toBe("(0, -1, 0)");
		expect(fn({ phi: Math.PI / 2, theta: 2 * Math.PI })).toBe("(0, 0, 1)");

		expect(fn({ degrees: true, phi: 90, theta: 0 })).toBe("(0, 0, 1)");
		expect(fn({ degrees: true, phi: 90, theta: 90 })).toBe("(0, 1, 0)");
		expect(fn({ degrees: true, phi: 90, theta: 180 })).toBe("(0, 0, -1)");
		expect(fn({ degrees: true, phi: 90, theta: 270 })).toBe("(0, -1, 0)");
		expect(fn({ degrees: true, phi: 90, theta: 360 })).toBe("(0, 0, 1)");

		expect(fn({ phi: 0, magnitude: 10 })).toBe("(10, 0, 0)");
		expect(fn({ phi: Math.PI / 2, magnitude: 10 })).toBe("(0, 10, 0)");
		expect(fn({ phi: Math.PI, magnitude: 10 })).toBe("(-10, 0, 0)");
		expect(fn({ phi: 3 * Math.PI / 2, magnitude: 10 })).toBe("(0, -10, 0)");
		expect(fn({ phi: 2 * Math.PI, magnitude: 10 })).toBe("(10, 0, 0)");

		expect(fn({ degrees: true, phi: 0, magnitude: 10 })).toBe("(10, 0, 0)");
		expect(fn({ degrees: true, phi: 90, magnitude: 10 })).toBe("(0, 10, 0)");
		expect(fn({ degrees: true, phi: 180, magnitude: 10 })).toBe("(-10, 0, 0)");
		expect(fn({ degrees: true, phi: 270, magnitude: 10 })).toBe("(0, -10, 0)");
		expect(fn({ degrees: true, phi: 360, magnitude: 10 })).toBe("(10, 0, 0)");

		expect(fn({ theta: 0, magnitude: 10 })).toBe("(0, 0, 10)");
		expect(fn({ theta: Math.PI / 2, magnitude: 10 })).toBe("(10, 0, 0)");
		expect(fn({ theta: Math.PI, magnitude: 10 })).toBe("(0, 0, -10)");
		expect(fn({ theta: 3 * Math.PI / 2, magnitude: 10 })).toBe("(-10, 0, 0)");
		expect(fn({ theta: 2 * Math.PI, magnitude: 10 })).toBe("(0, 0, 10)");

		expect(fn({ degrees: true, theta: 0, magnitude: 10 })).toBe("(0, 0, 10)");
		expect(fn({ degrees: true, theta: 90, magnitude: 10 })).toBe("(10, 0, 0)");
		expect(fn({ degrees: true, theta: 180, magnitude: 10 })).toBe("(0, 0, -10)");
		expect(fn({ degrees: true, theta: 270, magnitude: 10 })).toBe("(-10, 0, 0)");
		expect(fn({ degrees: true, theta: 360, magnitude: 10 })).toBe("(0, 0, 10)");

		expect(fn({ phi: Math.PI / 2, theta: 0, magnitude: 10 })).toBe("(0, 0, 10)");
		expect(fn({ phi: Math.PI / 2, theta: Math.PI / 2, magnitude: 10 })).toBe("(0, 10, 0)");
		expect(fn({ phi: Math.PI / 2, theta: Math.PI, magnitude: 10 })).toBe("(0, 0, -10)");
		expect(fn({ phi: Math.PI / 2, theta: 3 * Math.PI / 2, magnitude: 10 })).toBe("(0, -10, 0)");
		expect(fn({ phi: Math.PI / 2, theta: 2 * Math.PI, magnitude: 10 })).toBe("(0, 0, 10)");

		expect(fn({ degrees: true, phi: 90, theta: 0, magnitude: 10 })).toBe("(0, 0, 10)");
		expect(fn({ degrees: true, phi: 90, theta: 90, magnitude: 10 })).toBe("(0, 10, 0)");
		expect(fn({ degrees: true, phi: 90, theta: 180, magnitude: 10 })).toBe("(0, 0, -10)");
		expect(fn({ degrees: true, phi: 90, theta: 270, magnitude: 10 })).toBe("(0, -10, 0)");
		expect(fn({ degrees: true, phi: 90, theta: 360, magnitude: 10 })).toBe("(0, 0, 10)");
	});
	it("Parses a cylindrical coordinates input", () => {
		const fn = (input: CoordsCylindrical) => vector(input).toArray().map(val => round(val, 4));

		expect(fn({ p: Math.SQRT2, phi: Math.PI / 4, z: 5 })).toEqual([ 1, 1, 5 ]);
		expect(fn({ p: 7.0711, phi: -Math.PI / 4, z: 12 })).toEqual([ 5, -5, 12 ]);
		expect(fn({ p: 7.0711, phi: 5 * Math.PI / 4, z: 12 })).toEqual([ -5, -5, 12 ]);
		expect(fn({ p: 7.0711, phi: 5 * Math.PI / 4, z: 0 })).toEqual([ -5, -5, 0 ]);

		expect(fn({ degrees: true, p: Math.SQRT2, phi: 45, z: 5 })).toEqual([ 1, 1, 5 ]);
		expect(fn({ degrees: true, p: 7.0711, phi: -45, z: 12 })).toEqual([ 5, -5, 12 ]);
		expect(fn({ degrees: true, p: 7.0711, phi: 225, z: 12 })).toEqual([ -5, -5, 12 ]);
		expect(fn({ degrees: true, p: 7.0711, phi: 225, z: 0 })).toEqual([ -5, -5, 0 ]);
	});
	it("Detects invalid input", () => {
		const fn = (input: InputUser) => vector(input).valid;

		expect(fn([ NaN ])).toBe(false);
		expect(fn({})).toBe(false);
		// @ts-expect-error: test invalid input
		expect(fn({ a: 4 })).toBe(false);
		// @ts-expect-error: test invalid input
		expect(fn([ 1, 2, 3, 4 ])).toBe(false);
		// @ts-expect-error: test invalid input
		expect(fn([ "1", "2", "3" ])).toBe(false);
		expect(fn({ magnitude: 5 })).toBe(false);
		expect(fn({ degrees: true, magnitude: 5 })).toBe(false);
		// @ts-expect-error: invalid polar coords without angles
		expect(fn({ phi: "23" })).toBe(false);
		expect(fn({ phi: NaN })).toBe(false);
	});
});

describe("Operations", () => {
	it("Adds two vectors", () => {
		const fn = (input1: Input, input2: Input) => vector(input1).add(input2).toString();

		expect(vector(1).add(vector(1, 2, 3)).toString()).toBe("(2, 2, 3)");
		expect(vector(1).add(1, 2, 3).toString()).toBe("(2, 2, 3)");
		expect(vector(1).add([ 1, 2, 3 ]).toString()).toBe("(2, 2, 3)");
		expect(fn([ 1 ], [ 2 ])).toBe("(3, 0, 0)");
		expect(fn([ 1 ], [ 2, 3 ])).toBe("(3, 3, 0)");
		expect(fn([ 1 ], [ 1, 2, 3 ])).toBe("(2, 2, 3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(1, 4, 3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(1, 4, 3)");
		expect(fn({ x: 1, y: 2, z: 3 }, [ 1, 2, 3 ])).toBe("(2, 4, 6)");
	});
	it("Performs the scalar multiplication of the vector", () => {
		const fn = (input1: Input, value: number, inverse = false) => vector(input1).scale(value, inverse).toString();

		expect(fn([ 1 ], 3)).toBe("(3, 0, 0)");
		expect(fn([ 1, 2 ], 3)).toBe("(3, 6, 0)");
		expect(fn([ 1, 2, 3 ], 3)).toBe("(3, 6, 9)");
		expect(fn({ x: 1, y: 2 }, 3)).toBe("(3, 6, 0)");
		expect(fn({ x: 1, y: 2 }, 3)).toBe("(3, 6, 0)");
		expect(fn({ x: 1, y: 2, z: 3 }, 3)).toBe("(3, 6, 9)");
		expect(fn([ 1 ], -3)).toBe("(-3, 0, 0)");
		expect(fn([ 1, 2 ], -3)).toBe("(-3, -6, 0)");
		expect(fn([ 1, 2, 3 ], -3)).toBe("(-3, -6, -9)");
		expect(fn({ x: 1, y: 2 }, -3)).toBe("(-3, -6, 0)");
		expect(fn({ x: 1, y: 2 }, -3)).toBe("(-3, -6, 0)");
		expect(fn({ x: 1, y: 2, z: 3 }, -3)).toBe("(-3, -6, -9)");
		expect(fn([ 1 ], 0.5)).toBe("(0.5, 0, 0)");
		expect(fn([ 1, 2 ], 0.5)).toBe("(0.5, 1, 0)");
		expect(fn([ 1, 2, 3 ], 0.5)).toBe("(0.5, 1, 1.5)");
		expect(fn({ x: 1, y: 2 }, 0.5)).toBe("(0.5, 1, 0)");
		expect(fn({ x: 1, y: 2 }, 0.5)).toBe("(0.5, 1, 0)");
		expect(fn({ x: 1, y: 2, z: 3 }, 0.5)).toBe("(0.5, 1, 1.5)");

		expect(fn([ 2, 4, 6 ], 2, true)).toBe("(1, 2, 3)");
		expect(fn([ 1, 3, 5 ], 2, true)).toBe("(0.5, 1.5, 2.5)");
		expect(fn([ -2, -4, -6 ], 2, true)).toBe("(-1, -2, -3)");
		expect(fn([ 2, 4, 6 ], 0, true)).toBe("(0, 0, 0)");
	});
	it("Inverts the vector", () => {
		const fn = (input: Input) => vector(input).inverted.toString();

		expect(fn([ 2 ])).toBe("(-2, 0, 0)");
		expect(fn([ 1, 2 ])).toBe("(-1, -2, 0)");
		expect(fn([ 1, 2, 3 ])).toBe("(-1, -2, -3)");
		expect(fn({ x: 2 })).toBe("(-2, 0, 0)");
		expect(fn({ x: 1, y: 2 })).toBe("(-1, -2, 0)");
		expect(fn({ x: 1, y: 2, z: 3 })).toBe("(-1, -2, -3)");
		expect(fn([ -2 ])).toBe("(2, 0, 0)");
		expect(fn([ -1, -2 ])).toBe("(1, 2, 0)");
		expect(fn([ -1, -2, -3 ])).toBe("(1, 2, 3)");
		expect(fn({ x: -2 })).toBe("(2, 0, 0)");
		expect(fn({ x: -1, y: -2 })).toBe("(1, 2, 0)");
		expect(fn({ x: -1, y: -2, z: -3 })).toBe("(1, 2, 3)");
	});
	it("Subtracts two vectors", () => {
		const fn = (input1: Input, input2: Input) => vector(input1).sub(input2).toString();

		expect(vector(1, 2, 3).sub(vector(3, 4, 5)).equals(-2, -2, -2)).toBe(true);
		expect(fn([ 1 ], [ 2 ])).toBe("(-1, 0, 0)");
		expect(fn([ 1 ], [ 2, 3 ])).toBe("(-1, -3, 0)");
		expect(fn([ 1 ], [ 1, 2, 3 ])).toBe("(0, -2, -3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(-1, 0, -3)");
		expect(fn({ y: 2, z: 5 }, [ 1, 2, 3 ])).toBe("(-1, 0, 2)");
		expect(fn({ x: 1, y: 2, z: 3 }, [ 1, 2, 3 ])).toBe("(0, 0, 0)");
	});
	it("Performs an equality check", () => {
		const fn = (input1: Input, input2: Input) => vector(input1).equals(input2);

		expect(vector(1, 2, 3).equals(1, 2, 3)).toBe(true);
		expect(vector(1).equals(1, 2, 3)).toBe(false);
		expect(fn([ 1, 1, 1 ], { x: 1, y: 1, z: 1 })).toBe(true);
		expect(fn({ x: 1, y: 1, z: 1 }, [ 1, 1, 1 ])).toBe(true);
		expect(fn([ 1, 1, 1 ], [ 1, 1, 1 ])).toBe(true);
		expect(fn(vector([ 1, 1, 1 ]), vector({ x: 1, y: 1, z: 1 }))).toBe(true);
		expect(fn(vector({ x: 1, y: 1, z: 1 }), vector([ 1, 1, 1 ]))).toBe(true);
		expect(fn(vector([ 1, 1, 1 ]), vector([ 1, 1, 1 ]))).toBe(true);
		expect(fn([ 1, 0, 1 ], { x: 1, y: -1, z: 1 })).toBe(false);
		expect(fn({ x: -1, y: 1, z: 1 }, [ 1, 1, 1 ])).toBe(false);
		expect(fn([ 1, 1, 1 ], [ 1, 2, 1 ])).toBe(false);
		expect(fn(vector([ -3, 1, 1 ]), vector({ x: 1, y: 1, z: 1 }))).toBe(false);
		expect(fn(vector({ x: 2.5, y: 1, z: 1 }), vector([ 1, 1, 1 ]))).toBe(false);
		expect(fn(vector([ 1, 1, 1 ]), vector([ 2.005, 1, 1 ]))).toBe(false);
	});
	it("Calculates the cross product between two vectors", () => {
		const fn = (a: Input, b: Input) => vector(a).cross(b).toString();

		expect(vector(1, 2, 3).cross(4, 5, 6).toString()).toBe("(-3, 6, -3)");
		expect(vector(-2.5).cross(vector(4, 5.3, -8)).toString()).toBe("(0, -20, -13.25)");
		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ])).toBe("(-3, 6, -3)");
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ])).toBe("(0, -20, -13.25)");
	});
	it("Calculates the dot product between two vectors", () => {
		const fn = (a: Input, b: Input) => vector(a).dot(b);

		expect(vector(1, 2, 3).dot(vector(4, 5, 6 ))).toBe(32);
		expect(vector(-2.5).dot(vector(4, 5.3, -8 ))).toBe(-10);
		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ])).toBe(32);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ])).toBe(-10);
	});
	it("Calculates the distance between two vectors", () => {
		const fn = (a: Input, b: Input) => round(vector(a).distance(b), 5);

		expect(round(vector(1, 2, 3).distance(4, 5, 6), 5)).toBe(5.19615);
		expect(round(vector(-2.5).distance(vector(4, 5.3, -8)), 5)).toBe(11.59051);
		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ])).toBe(5.19615);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ])).toBe(11.59051);
	});
	it("Calculates the angle between two vectors", () => {
		const fn = (a: Input, b: Input, signed = false, degrees = false) => round(vector(a).angle(b, signed, degrees), 5);

		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ])).toBe(0.22573);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ])).toBe(1.96572);
		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ], false, true)).toBe(12.93315);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ], false, true)).toBe(112.62759);
		expect(fn([ 0 ], [ 4, 5, 6 ])).toBe(0);
		expect(fn([ 1, 2, 3 ], [ 0 ], false, true)).toBe(0);

		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ], true)).toBe(-0.22573);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ], true)).toBe(-1.96572);
		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ], true, true)).toBe(-12.93315);
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ], true, true)).toBe(-112.62759);
		expect(fn([ 0 ], [ 4, 5, 6 ], true)).toBe(0);
		expect(fn([ 1, 2, 3 ], [ 0 ], true, true)).toBe(0);
	});
	it("Linearly interpolate the vector to another vector", () => {
		const a = vector([ 4, 8, 16 ]);
		const b = vector([ 8, 24, 48 ]);

		const fn = (coef?: number) => a.lerp(b, coef).toString();

		expect(fn()).toBe("(8, 24, 48)");
		expect(fn(-0.5)).toBe("(4, 8, 16)");
		expect(fn(0.25)).toBe("(5, 12, 24)");
		expect(fn(0.5)).toBe("(6, 16, 32)");
		expect(fn(0.75)).toBe("(7, 20, 40)");
		expect(fn(1)).toBe("(8, 24, 48)");
		expect(fn(1.5)).toBe("(8, 24, 48)");
	});
	it("Creates a copy of itself", () => {
		const a = vector([ 1, 2, 3 ]);
		const b = a.copy();
		const c = vector([ 2, 4, 6 ]);

		expect(a.equals(b)).toBe(true);
		expect(c.equals(b)).toBe(false);
	});
	it("Reflects the vector", () => {
		const a = vector([ 4, 6 ]);
		const n = vector([ 0, -1 ]);

		expect(vector(4, 6).reflect(0, -1).equals(4, -6)).toBe(true);
		expect(a.reflect(n).toString()).toBe("(4, -6, 0)");
	});
	it("Generates a random 2D vector", () => {
		for (let i = 0; i < 10; i++) {
			for (const component of vector().random().toArray()) {
				expect(component).lessThanOrEqual(1);
				expect(component).greaterThanOrEqual(-1);
			}
		}
	});
	it("Generates a random 3D vector", () => {
		for (let i = 0; i < 10; i++) {
			for (const component of vector().random3d().toArray()) {
				expect(component).lessThanOrEqual(1);
				expect(component).greaterThanOrEqual(-1);
			}
		}
	});
	it("Sets the vector's component value", () => {
		const a = vector(1, 2, 3);
		const fn = (input: Component, value: number) => a.setComponent(input, value).toString();

		expect(fn("x", 2)).toBe("(2, 2, 3)");
		expect(fn("y", 3)).toBe("(1, 3, 3)");
		expect(fn("z", 4)).toBe("(1, 2, 4)");

		// @ts-expect-error: test invalid input
		expect(fn("d", 3)).toBe("(0, 0, 0)");
		// @ts-expect-error: test invalid input
		expect(fn("d", "3")).toBe("(0, 0, 0)");
		// @ts-expect-error: test invalid input
		expect(fn("f", NaN)).toBe("(0, 0, 0)");
	});
});

describe("Mutable operations", () => {
	it("Adds another vector to the current one", () => {
		const a = vector(1, 2, 3)
			.addSelf(-1, 0, 0)
			.addSelf([ 0, -2, 0 ])
			.addSelf(0, 0, -3)
			.addSelf({ x: -2, y: -5, z: 8 });

		expect(a.equals([ -2, -5, 8 ])).toBe(true);
	});
	it("Scales the current vector", () => {
		const a = vector(1, 2, 3)
			.scaleSelf(2)
			.scaleSelf(3)
			.scaleSelf(-2);

		expect(a.equals([ -12, -24, -36 ])).toBe(true);
	});
	it("Scales the current vector inversively", () => {
		const a = vector(24, 60, 36)
			.scaleSelf(3, true)
			.scaleSelf(-2, true);

		expect(a.equals([ -4, -10, -6 ])).toBe(true);

		a.scaleSelf(0, true);
		expect(a.equals(-4, -10, -6)).toBe(true);
	});
	it("Subtracts another vector from the current one", () => {
		const a = vector(12, 15, 25)
			.subSelf(1, 2, 3)
			.subSelf([ -2, -3, -4 ])
			.subSelf({ x: -1, y: 2, z: -3 });

		expect(a.equals([ 14, 14, 29 ])).toBe(true);
	});
	it("Rotates a current vector by azimuthal angle", () => {
		const radians = vector(1)
			.rotateSelf(1)
			.rotateSelf(1)
			.rotateSelf(-0.5)
			.getPhi();

		const degrees = vector(1)
			.rotateSelf(60, true)
			.rotateSelf(30, true)
			.rotateSelf(-45, true)
			.getPhi(true);

		expect(round(radians, 2)).toBe(1.5);
		expect(round(degrees, 2)).toBe(45);
	});
	it("Rotates a current vector in space", () => {
		const radians = vector({ phi: Math.PI / 3, theta: Math.PI / 3 })
			.rotateSelf3d(Math.PI / 3, Math.PI / 3)
			.rotateSelf3d(-Math.PI / 2, -Math.PI / 2);

		const degrees = vector({ degrees: true, phi: 0, theta: 0 })
			.rotateSelf3d(60, 30, true)
			.rotateSelf3d(30, 15, true)
			.rotateSelf3d(-45, -30, true);

		expect(round(radians.getPhi(), 2)).toBe(round(Math.PI / 6, 2));
		expect(round(radians.getTheta(), 2)).toBe(round(Math.PI / 6, 2));
		expect(round(degrees.getPhi(true), 2)).toBe(45);
		expect(round(degrees.getTheta(true), 2)).toBe(15);
	});
	it("Sets the current vector's azimuthal angle", () => {
		const fn = (input: InputUser, value: number, degrees = false) => round(vector(input).setPhiSelf(value, degrees).getPhi(degrees), 6);

		expect(fn({ x: 1 }, 0.927295)).toBe(0.927295);
		expect(fn({ x: 1 }, 53.130102, true)).toBe(53.130102);
		expect(fn({ x: 1, y: 2, z: 3 }, 1.951303)).toBe(1.951303);
		expect(fn({ x: 1, y: 2, z: 3 }, 111.801409, true)).toBe(111.801409);
	});
	it("Sets the current vector's elevation angle", () => {
		const fn = (input: InputUser, value: number, degrees = false) => round(vector(input).setThetaSelf(value, degrees).getTheta(degrees), 6);

		expect(fn({ x: 1 }, 0.927295)).toBe(0.927295);
		expect(fn({ x: 1 }, 53.130102, true)).toBe(53.130102);
		expect(fn({ x: 1, y: 2, z: 3 }, 1.951303)).toBe(1.951303);
		expect(fn({ x: 1, y: 2, z: 3 }, 111.801409, true)).toBe(111.801409);
	});
	it("Sets the current vector's component value", () => {
		const a = vector(1, 2, 3);
		const fn = (input: Component, value: number) => a.setComponentSelf(input, value).toString();

		expect(fn("x", 2)).toBe("(2, 2, 3)");
		expect(fn("y", 3)).toBe("(2, 3, 3)");
		expect(fn("z", 4)).toBe("(2, 3, 4)");

		// @ts-expect-error: test invalid input
		expect(fn("d", 3)).toBe("(2, 3, 4)");
		// @ts-expect-error: test invalid input
		expect(fn("d", "3")).toBe("(2, 3, 4)");
		// @ts-expect-error: test invalid input
		expect(fn("f", NaN)).toBe("(2, 3, 4)");
	});
	it("Sets the current vector's state", () => {
		const v1 = vector(1, 2, 3).set(0, 0, 0);
		const v2 = v1.set([ 3, 4, 5 ]);
		const v3 = v2.set({ x: -1, y: -2, z: -3 });

		expect(v1.equals([ -1, -2, -3 ])).toBe(true);
		expect(v2.equals([ -1, -2, -3 ])).toBe(true);
		expect(v3.equals([ -1, -2, -3 ])).toBe(true);
	});
	it("Normalizes the current vector", () => {
		const fn = (input: InputUser) => vector(input).normalizeSelf().magnitude;

		expect(fn({ x: 0 })).toBe(0);
		expect(fn({ x: 3, y: 4 })).toBe(1);
		expect(fn({ x: 3, y: 4, z: 12 })).toBe(1);
	});
});

describe("Properties", () => {
	it("Calculates the magnitude squared", () => {
		const fn = (input: InputUser) => vector(input).magnitudeSq;

		expect(fn({ x: 0 })).toBe(0);
		expect(fn({ x: 3, y: 4 })).toBe(25);
		expect(fn({ x: 3, y: 4, z: 12 })).toBe(169);
	});
	it("Calculates the magnitude", () => {
		const fn = (input: InputUser) => vector(input).magnitude;

		expect(fn({ x: 0 })).toBe(0);
		expect(fn({ x: 3, y: 4 })).toBe(5);
		expect(fn({ x: 3, y: 4, z: 12 })).toBe(13);
	});
	it("Sets the magnitude", () => {
		const fn = (input: InputUser, value: number) => vector(input).setMagnitude(value).magnitude;

		expect(fn({ x: 1 }, 5)).toBe(5);
		expect(fn({ x: 1, y: 2 }, 5)).toBe(5);
		expect(fn({ x: 1, y: 2, z: 3 }, 5)).toBe(5);
	});
	it("Limits the magnitude", () => {
		const fn = (input: InputUser, value: number) => round(vector(input).limit(value).magnitude, 10);

		expect(fn({ x: 3, y: 4 }, 10)).toBe(5);
		expect(fn({ x: 3, y: 4 }, 2)).toBe(2);
		expect(fn({ x: 3, y: 4 }, 5)).toBe(5);
		expect(fn({ x: 3, y: 4, z: 12 }, 15)).toBe(13);
		expect(fn({ x: 3, y: 4, z: 12 }, 10)).toBe(10);
		expect(fn({ x: 3, y: 4, z: 12 }, 13)).toBe(13);
	});
	it("Normalizes the vector and returns a unit vector", () => {
		const fn = (input: InputUser) => vector(input).unit.magnitude;

		expect(fn({ x: 3, y: 4 })).toBe(1);
		expect(fn({ x: 3, y: 4, z: 12 })).toBe(1);
	});
	it("Do not normalize the zero vector, marks as invalid", () => {
		expect(vector({ x: 0 }).unit.valid).toBe(false);
		expect(vector([ 0, 0 ]).unit.valid).toBe(false);
		expect(vector([ 0, 0, 0 ]).unit.valid).toBe(false);
	});
});

describe("Rotation", () => {
	it("Calculates the azimuthal angle", () => {
		const fn = (input: InputUser, degrees = false) => round(vector(input).getPhi(degrees), 6);

		expect(fn({ x: 3, y: 4 })).toBe(0.927295);
		expect(fn({ x: -2, y: 5 })).toBe(1.951303);
		expect(fn({ x: 3, y: 4 }, true)).toBe(53.130102);
		expect(fn({ x: -2, y: 5 }, true)).toBe(111.801409);
	});
	it("Calculates the elevation angle", () => {
		const fn = (input: InputUser, degrees = false) => round(vector(input).getTheta(degrees), 6);

		expect(fn({ x: 3, y: 4, z: 5 })).toBe(0.785398);
		expect(fn({ x: -2, y: 5, z: -6 })).toBe(2.410145);
		expect(fn({ x: 3, y: 4, z: 5 }, true)).toBe(45);
		expect(fn({ x: -2, y: 5, z: -6 }, true)).toBe(138.091152);
	});
	it("Sets the azimuthal angle", () => {
		const fn = (input: InputUser, value: number, degrees = false) => round(vector(input).setPhi(value, degrees).getPhi(degrees), 6);

		expect(fn({ x: 1 }, 0.927295)).toBe(0.927295);
		expect(fn({ x: 1 }, 53.130102, true)).toBe(53.130102);
		expect(fn({ x: 1, y: 2, z: 3 }, 1.951303)).toBe(1.951303);
		expect(fn({ x: 1, y: 2, z: 3 }, 111.801409, true)).toBe(111.801409);
	});
	it("Sets the elevation angle", () => {
		const fn = (input: InputUser, value: number, degrees = false) => round(vector(input).setTheta(value, degrees).getTheta(degrees), 6);

		expect(fn({ x: 1 }, 0.927295)).toBe(0.927295);
		expect(fn({ x: 1 }, 53.130102, true)).toBe(53.130102);
		expect(fn({ x: 1, y: 2, z: 3 }, 1.951303)).toBe(1.951303);
		expect(fn({ x: 1, y: 2, z: 3 }, 111.801409, true)).toBe(111.801409);
	});
	it("Rotates a vector by azimuthal angle", () => {
		const fn = (input: InputUser, value: number, degrees = false) => vector(input).rotate(value, degrees);

		expect(round(fn({ x: 1 }, 1).rotate(1).rotate(-0.5).getPhi(), 2)).toBe(1.5);
		expect(round(fn({ x: 1 }, 60, true).rotate(30, true).rotate(-45, true).getPhi(true), 2)).toBe(45);
	});
	it("Rotates a vector in space", () => {
		const radians = vector({ phi: Math.PI / 3, theta: Math.PI / 3 })
			.rotate3d(Math.PI / 3, Math.PI / 3)
			.rotate3d(-Math.PI / 2, -Math.PI / 2);

		const degrees = vector({ degrees: true, phi: 0, theta: 0 })
			.rotate3d(60, 30, true)
			.rotate3d(30, 15, true)
			.rotate3d(-45, -30, true);

		expect(round(radians.getPhi(), 2)).toBe(round(Math.PI / 6, 2));
		expect(round(radians.getTheta(), 2)).toBe(round(Math.PI / 6, 2));
		expect(round(degrees.getPhi(true), 2)).toBe(45);
		expect(round(degrees.getTheta(true), 2)).toBe(15);
	});
});

describe("Representation", () => {
	it("Returns vector's components packed into array", () => {
		const fn = (input: Input) => vector(input).toArray();

		expect(fn({ x: 1 })).toEqual([ 1, 0, 0 ]);
		expect(fn({ x: 1, y: 2 })).toEqual([ 1, 2, 0 ]);
		expect(fn({ x: 1, y: 2, z: 3 })).toEqual([ 1, 2, 3 ]);
	});
	it("Converts an instance into primitive value", () => {
		const a = vector([ 3, 4 ]);
		const b = vector([ 6, 8 ]);

		// @ts-expect-error: testing coercion
		expect(a + b).toBe(15);
	});
	it("Iterates the instance", () => {
		expect(Array.from(vector([ 1, 2, 3 ]))).toEqual([ 1, 2, 3 ]);
		expect([ ...vector([ 1, 2, 3 ]) ]).toEqual([ 1, 2, 3 ]);
	});
});
