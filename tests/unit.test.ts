import { describe, expect, it } from "vitest";
import { vector, Vector } from "../src";
import type { Coords, CoordsPolar, CoordsTuple, Input, InputUser } from "../src/types";
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
	it("Parses a coordinates tuple input with missed values", () => {
		const fn = (input: CoordsTuple) => vector(input).toString();

		// @ts-expect-error: test against invalid input
		// eslint-disable-next-line no-sparse-arrays
		expect(fn([ , 2 ])).toBe("(0, 2, 0)");
		// @ts-expect-error: test against invalid input
		// eslint-disable-next-line no-sparse-arrays
		expect(fn([ , , 3 ])).toBe("(0, 0, 3)");
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

describe("Arithmetics", () => {
	it("Adds two vectors", () => {
		const fn = (input1: Input, input2: Input) => vector(input1).add(input2).toString();

		expect(fn([ 1 ], [ 2 ])).toBe("(3, 0, 0)");
		expect(fn([ 1 ], [ 2, 3 ])).toBe("(3, 3, 0)");
		expect(fn([ 1 ], [ 1, 2, 3 ])).toBe("(2, 2, 3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(1, 4, 3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(1, 4, 3)");
		expect(fn({ x: 1, y: 2, z: 3 }, [ 1, 2, 3 ])).toBe("(2, 4, 6)");
	});
	it("Performs the scalar multiplication of the vector", () => {
		const fn = (input1: Input, value: number) => vector(input1).scale(value).toString();

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

		expect(fn([ 1 ], [ 2 ])).toBe("(-1, 0, 0)");
		expect(fn([ 1 ], [ 2, 3 ])).toBe("(-1, -3, 0)");
		expect(fn([ 1 ], [ 1, 2, 3 ])).toBe("(0, -2, -3)");
		expect(fn({ y: 2 }, [ 1, 2, 3 ])).toBe("(-1, 0, -3)");
		expect(fn({ y: 2, z: 5 }, [ 1, 2, 3 ])).toBe("(-1, 0, 2)");
		expect(fn({ x: 1, y: 2, z: 3 }, [ 1, 2, 3 ])).toBe("(0, 0, 0)");
	});
	it("Performs an equality check", () => {
		const fn = (input1: Input, input2: Input) => vector(input1).equals(input2);

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
	it("Calculates the cross products between two vectors", () => {
		const fn = (a: Input, b: Input) => vector(a).cross(b).toString();

		expect(fn([ 1, 2, 3 ], [ 4, 5, 6 ])).toBe("(-3, 6, -3)");
		expect(fn([ -2.5 ], [ 4, 5.3, -8 ])).toBe("(0, -20, -13.25)");
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
