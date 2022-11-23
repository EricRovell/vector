import { describe, expect, it } from "vitest";
import { vector, Vector } from "../src";
import type { Coords, CoordsTuple, Input, InputUser } from "../src/types";

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
});
