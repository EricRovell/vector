import { describe, expect, it } from "vitest";
import { vector } from "../../src";
import type {
	Coords,
	CoordsCylindrical,
	CoordsPolar,
	CoordsTuple,
	Input,
	VectorString
} from "../../src/types";

describe("Parsing user input", () => {
	describe("Handling empty input", () => {
		it("Should create a zero vector when arguments are not provided", () => {
			expect(vector().toString()).toBe("(0, 0, 0)");
		});
	});
	describe("Detecting invalid input", () => {
		it("Should detect invalid user input", () => {
			const test = (input: unknown) => vector(input as Input).valid;
	
			const inputValues = [
				null,
				"123",
				[ NaN ],
				{ a: 4 },
				[ 1, 2, 3, 4 ],
				[ "1", "2", "3" ],
				{ magnitude: 5 },
				{ degrees: true, magnitude: 5 },
				{ phi: "23" },
				{ phi: NaN }
			];
	
			for (const input of inputValues) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore: types are wrong here, that's the point
				expect(test(input)).toBe(false);
			}
		});
	});
	describe("Parsing arguments input", () => {
		it("Should parses arguments input", () => {
			const test = (x: number, y?: number, z?: number) => vector(x, y, z).toString();
	
			interface TestCase {
				input: CoordsTuple;
				output: `(${number}, ${number}, ${number})`;
			}
	
			const tests: TestCase[] = [
				{
					input: [ 1 ],
					output: "(1, 0, 0)"
				},
				{
					input: [ 1, 2 ],
					output: "(1, 2, 0)"
				},
				{
					input: [ 1, 2, 3 ],
					output: "(1, 2, 3)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(...input)).toBe(output);
			}
		});
	});
	describe("Parsing a cartesian coordinates object", () => {
		it("Should handle a valid input", () => {
			const test = (input: Coords) => vector(input).toString();
	
			interface TestCase {
				input: Partial<Coords>;
				output: VectorString;
			}
	
			const tests: TestCase[] = [
				{
					input: { x: 1 },
					output: "(1, 0, 0)"
				},
				{
					input: { y: 2 },
					output: "(0, 2, 0)"
				},
				{
					input: { z: 3 },
					output: "(0, 0, 3)"
				},
				{
					input: { x: 1, y: 2 },
					output: "(1, 2, 0)"
				},
				{
					input: { x: 1, z: 3 },
					output: "(1, 0, 3)"
				},
				{
					input: { y: 2, z: 3 },
					output: "(0, 2, 3)"
				},
				{
					input: { x: 1, y: 2, z: 3 },
					output: "(1, 2, 3)"
				}
			];
	
			for (const { input, output } of tests) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore: some keys may be missing, it is fine
				expect(test(input)).toBe(output);
			}
		});
		it("Should handle an input mixed with odd data", () => {
			const test = (input: Record<string, number>) => vector(input).toString();
	
			const tests = [
				{
					input: { x: 1, a: 2 },
					output: "(1, 0, 0)"
				},
				{
					input: { y: 2, a: 2 },
					output: "(0, 2, 0)"
				},
				{
					input: { z: 3, a: 2 },
					output: "(0, 0, 3)"
				},
				{
					input: { x: 1, y: 2, a: 2 },
					output: "(1, 2, 0)"
				},
				{
					input: { x: 1, z: 3, a: 2 },
					output: "(1, 0, 3)"
				},
				{
					input: { y: 2, z: 3, a: 2 },
					output: "(0, 2, 3)"
				},
				{
					input: { x: 1, y: 2, z: 3, a: 2 },
					output: "(1, 2, 3)"
				}
			];

			for (const { input, output } of tests) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore: some keys are wrong intentionally
				expect(test(input)).toBe(output);
			}
		});
	});
	describe("Parsing a cartesian coordinates tuple", () => {
		it("Should handles a valid input", () => {
			const test = (input: CoordsTuple) => vector(input).toString();
	
			interface TestCase {
				input: CoordsTuple;
				output: VectorString;
			}
	
			const tests: TestCase[] = [
				{
					input: [ 1 ],
					output: "(1, 0, 0)"
				},
				{
					input: [ 1, 2 ],
					output: "(1, 2, 0)"
				},
				{
					input: [ 1, 2, 3 ],
					output: "(1, 2, 3)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(input)).toBe(output);
			}
		});
	});
	describe("Parsing a polar coordinates object", () => {
		it("Should handle an input defined in radians", () => {
			interface TestCase {
				input: Partial<Exclude<CoordsPolar, "degrees">>;
				output: VectorString;
			}
	
			const test = (input: TestCase["input"]) => vector(input).toString();
	
			const tests: TestCase[] = [
				{
					input: { phi: 0 },
					output: "(1, 0, 0)"
				},
				{
					input: { phi: Math.PI / 2 },
					output: "(0, 1, 0)"
				},
				{
					input: { phi: Math.PI },
					output: "(-1, 0, 0)"
				},
				{
					input: { phi: 3 * Math.PI / 2 },
					output: "(0, -1, 0)"
				},
				{
					input: { phi: 2 * Math.PI },
					output: "(1, 0, 0)"
				},
				{
					input: { theta: 0 },
					output: "(0, 0, 1)"
				},
				{
					input: { theta: Math.PI / 2 },
					output: "(1, 0, 0)"
				},
				{
					input: { theta: Math.PI },
					output: "(0, 0, -1)"
				},
				{
					input: { theta: 3 * Math.PI / 2 },
					output: "(-1, 0, 0)"
				},
				{
					input: { theta: 2 * Math.PI },
					output: "(0, 0, 1)"
				},
				{
					input: { phi: Math.PI / 2, theta: 0 },
					output: "(0, 0, 1)"
				},
				{
					input: { phi: Math.PI / 2, theta: Math.PI / 2 },
					output: "(0, 1, 0)"
				},
				{
					input: { phi: Math.PI / 2, theta: Math.PI },
					output: "(0, 0, -1)"
				},
				{
					input: { phi: Math.PI / 2, theta: 3 * Math.PI / 2 },
					output: "(0, -1, 0)"
				},
				{
					input: { phi: Math.PI / 2, theta: 2 * Math.PI },
					output: "(0, 0, 1)"
				},
				{
					input: { phi: 0, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { phi: Math.PI / 2, magnitude: 10 },
					output: "(0, 10, 0)"
				},
				{
					input: { phi: Math.PI, magnitude: 10 },
					output: "(-10, 0, 0)"
				},
				{
					input: { phi: 3 * Math.PI / 2, magnitude: 10 },
					output: "(0, -10, 0)"
				},
				{
					input: { phi: 2 * Math.PI, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { theta: 0, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { theta: Math.PI / 2, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { theta: Math.PI, magnitude: 10 },
					output: "(0, 0, -10)"
				},
				{
					input: { theta: 3 * Math.PI / 2, magnitude: 10 },
					output: "(-10, 0, 0)"
				},
				{
					input: { theta: 2 * Math.PI, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { phi: Math.PI / 2, theta: 0, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { phi: Math.PI / 2, theta: Math.PI / 2, magnitude: 10 },
					output: "(0, 10, 0)"
				},
				{
					input: { phi: Math.PI / 2, theta: Math.PI, magnitude: 10 },
					output: "(0, 0, -10)"
				},
				{
					input: { phi: Math.PI / 2, theta: 3 * Math.PI / 2, magnitude: 10 },
					output: "(0, -10, 0)"
				},
				{
					input: { phi: Math.PI / 2, theta: 2 * Math.PI, magnitude: 10 },
					output: "(0, 0, 10)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(input)).toBe(output);
			}
		});
		it("Should handle an input defined in degrees", () => {
			interface TestCase {
				input: Partial<CoordsPolar>;
				output: VectorString;
			}
	
			const test = (input: TestCase["input"]) => vector(input).toString();
	
			const tests: TestCase[] = [
				{
					input: { degrees: true, phi: 0 },
					output: "(1, 0, 0)"
				},
				{
					input: { degrees: true, phi: 90 },
					output: "(0, 1, 0)"
				},
				{
					input: { degrees: true, phi: 180 },
					output: "(-1, 0, 0)"
				},
				{
					input: { degrees: true, phi: 270 },
					output: "(0, -1, 0)"
				},
				{
					input: { degrees: true, phi: 360 },
					output: "(1, 0, 0)"
				},
				{
					input: { degrees: true, theta: 0 },
					output: "(0, 0, 1)"
				},
				{
					input: { degrees: true, theta: 90 },
					output: "(1, 0, 0)"
				},
				{
					input: { degrees: true, theta: 180 },
					output: "(0, 0, -1)"
				},
				{
					input: { degrees: true, theta: 270 },
					output: "(-1, 0, 0)"
				},
				{
					input: { degrees: true, theta: 360 },
					output: "(0, 0, 1)"
				},
				{
					input: { degrees: true, phi: 90, theta: 0 },
					output: "(0, 0, 1)"
				},
				{
					input: { degrees: true, phi: 90, theta: 90 },
					output: "(0, 1, 0)"
				},
				{
					input: { degrees: true, phi: 90, theta: 180 },
					output: "(0, 0, -1)"
				},
				{
					input: { degrees: true, phi: 90, theta: 270 },
					output: "(0, -1, 0)"
				},
				{
					input: { degrees: true, phi: 90, theta: 360 },
					output: "(0, 0, 1)"
				},
				{
					input: { degrees: true, phi: 0, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { degrees: true, phi: 90, magnitude: 10 },
					output: "(0, 10, 0)"
				},
				{
					input: { degrees: true, phi: 180, magnitude: 10 },
					output: "(-10, 0, 0)"
				},
				{
					input: { degrees: true, phi: 270, magnitude: 10 },
					output: "(0, -10, 0)"
				},
				{
					input: { degrees: true, phi: 360, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { degrees: true, theta: 0, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { degrees: true, theta: 90, magnitude: 10 },
					output: "(10, 0, 0)"
				},
				{
					input: { degrees: true, theta: 180, magnitude: 10 },
					output: "(0, 0, -10)"
				},
				{
					input: { degrees: true, theta: 270, magnitude: 10 },
					output: "(-10, 0, 0)"
				},
				{
					input: { degrees: true, theta: 360, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { degrees: true, phi: 90, theta: 0, magnitude: 10 },
					output: "(0, 0, 10)"
				},
				{
					input: { degrees: true, phi: 90, theta: 90, magnitude: 10 },
					output: "(0, 10, 0)"
				},
				{
					input: { degrees: true, phi: 90, theta: 180, magnitude: 10 },
					output: "(0, 0, -10)"
				},
				{
					input: { degrees: true, phi: 90, theta: 270, magnitude: 10 },
					output: "(0, -10, 0)"
				},
				{
					input: { degrees: true, phi: 90, theta: 360, magnitude: 10 },
					output: "(0, 0, 10)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(input)).toBe(output);
			}
		});
	});
	describe("Parsing a cylindrical coordinates object", () => {
		it("Should handle an input defined in radians", () => {
			interface TestCase {
				input: Partial<Exclude<CoordsCylindrical, "degrees">>;
				output: VectorString;
			}
	
			const test = (input: TestCase["input"]) => {
				return vector(input).round(4).toString();
			};
	
			const tests: TestCase[] = [
				{
					input: { p: Math.SQRT2, phi: Math.PI / 4, z: 5 },
					output: "(1, 1, 5)"
				},
				{
					input: { p: 7.0711, phi: -Math.PI / 4, z: 12 },
					output: "(5, -5, 12)"
				},
				{
					input: { p: 7.0711, phi: 5 * Math.PI / 4, z: 12 },
					output: "(-5, -5, 12)"
				},
				{
					input: { p: 7.0711, phi: 5 * Math.PI / 4, z: 0 },
					output: "(-5, -5, 0)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(input)).toBe(output);
			}
		});
		it("Should handle an input defined in degrees", () => {
			interface TestCase {
				input: Partial<CoordsCylindrical>;
				output: VectorString;
			}
	
			const test = (input: TestCase["input"]) => {
				return vector(input).round(4).toString();
			};
	
			const tests: TestCase[] = [
				{
					input: { degrees: true, p: Math.SQRT2, phi: 45, z: 5 },
					output: "(1, 1, 5)"
				},
				{
					input: { degrees: true, p: 7.0711, phi: -45, z: 12 },
					output: "(5, -5, 12)"
				},
				{
					input: { degrees: true, p: 7.0711, phi: 225, z: 12 },
					output: "(-5, -5, 12)"
				},
				{
					input: { degrees: true, p: 7.0711, phi: 225, z: 0 },
					output: "(-5, -5, 0)"
				}
			];
	
			for (const { input, output } of tests) {
				expect(test(input)).toBe(output);
			}
		});
	});
});
