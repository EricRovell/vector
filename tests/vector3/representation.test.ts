import { describe, expect, it } from "vitest";
import { vector, Vector } from "../../src";
import type { Coords, VectorString, Input, CoordsTuple } from "../../src/types";

describe("Constructor", () => {
	it("Accepts a class instance input", () => {
		const instance = new Vector();
		expect(vector(instance).toString()).toBe("(0, 0, 0)");
	});
});

describe("Representation", () => {
	describe("As an array", () => {
		interface TestCase {
			input: Partial<Coords>;
			output: [ x: number, y: number, z: number ];
		}

		const tests: TestCase[] = [
			{
				input: { x: 1 },
				output: [ 1, 0, 0 ]
			},
			{
				input: { x: 1, y: 2 },
				output: [ 1, 2, 0 ]
			},
			{
				input: { x: 1, y: 2, z: 3 },
				output: [ 1, 2, 3 ]
			}
		];

		it("Should return an array vector representation", () => {
			for (const { input, output } of tests) {
				expect(vector(input.x, input.y, input.z).toArray()).toEqual(output);
			}
		});
		it("Should be possible to iterate over the instance", () => {
			expect(Array.from(vector([ 1, 2, 3 ]))).toEqual([ 1, 2, 3 ]);
			expect([ ...vector([ 1, 2, 3 ]) ]).toEqual([ 1, 2, 3 ]);
		});
	});
	describe("As a string", () => {
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
				input: { x: 1, y: 2 },
				output: "(1, 2, 0)"
			},
			{
				input: { x: 1, y: 2, z: 3 },
				output: "(1, 2, 3)"
			}
		];

		it("Should return an array vector representation", () => {
			for (const { input, output } of tests) {
				expect(vector(input.x, input.y, input.z).toString()).toEqual(output);
			}
		});
	});
	describe("As a primitive", () => {
		/* interface TestCase {
			input: Partial<Coords>;
			output: number;
		}

		const tests: TestCase[] = [
			{
				input: { x: 1 },
				output: 1
			},
			{
				input: { x: 3, y: 4 },
				output: 5
			},
			{
				input: { x: 0, y: 12, z: 5 },
				output: 13
			}
		]; */

		/* it("Should return a primitive vector representation as it's length", () => {
			for (const { input, output } of tests) {
				expect(vector(input.x, input.y, input.z).to()).toEqual(output);
			}
		}); */
		it("Should convert a vector into a primitive value on coercion", () => {
			const a = vector([ 3, 4 ]);
			const b = vector([ 6, 8 ]);
	
			expect(a + b).toBe(15);
		});
	});
});

describe("Entity", () => {
	describe("Copying", () => {
		it("Creates a copy of itself", () => {
			const a = vector([ 1, 2, 3 ]);
			const b = a.copy();
			const c = vector([ 2, 4, 6 ]);
	
			expect(a.equals(b)).toBe(true);
			expect(c.equals(b)).toBe(false);
		});
	});
	describe("Equality", () => {
		interface TestCase {
			v1: CoordsTuple;
			v2: Input;
			output: boolean;
		}

		const tests: TestCase[] = [
			{
				v1: [ 1, 2, 3 ],
				v2: { x: 1, y: 2, z: 3 },
				output: true
			},
			{
				v1: [ 1, 2, 3 ],
				v2: { x: 1, y: 2, z: 3 },
				output: true
			},
			{
				v1: [ 1, 2, 3 ],
				v2: [ 1, 2, 3 ],
				output: true
			},
			{
				v1: [ 1, 2, 3 ],
				v2: { x: 2, y: 2, z: 3 },
				output: false
			},
			{
				v1: [ 1, 2, 3 ],
				v2: { x: 1, y: 5, z: 3 },
				output: false
			},
			{
				v1: [ 1, 2, 3 ],
				v2: [ 1, 2 ],
				output: false
			},
		];

		it("Compares the vector instance to vector input", () => {
			const test = (v1: CoordsTuple, v2: Input) => {
				return vector(...v1).equals(v2);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
			}
		});
		it("Compares the vector instances", () => {
			const test = (v1: CoordsTuple, v2: Input) => {
				return vector(...v1).equals(
					vector(v2)
				);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
			}
		});
	});
});
