import { describe, expect, it } from "vitest";
import { vector, Vector } from "../src";
import type { Cartesian, VectorString, VectorInput, CartesianTuple } from "../src/types";

describe("Constructor", () => {
	it("Accepts a class instance input", () => {
		const instance = new Vector();
		expect(vector(instance).toString()).toBe("(0, 0, 0)");
	});
});

describe("Representation", () => {
	describe("As an array", () => {
		interface TestCase {
			input: Partial<Cartesian>;
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
	describe("As a primitive", () => {
		interface TestCase {
			input: Partial<Cartesian>;
			outputNumber: number;
			outputString: VectorString;
		}

		const tests: TestCase[] = [
			{
				input: { x: 1 },
				outputNumber: 1,
				outputString: "(1, 0, 0)"
			},
			{
				input: { x: 3, y: 4 },
				outputNumber: 5,
				outputString: "(3, 4, 0)"
			},
			{
				input: { x: 0, y: 12, z: 5 },
				outputNumber: 13,
				outputString: "(0, 12, 5)"
			}
		];

		describe("As a string", () => {
			it("Should convert an instance into string", () => {
				for (const { input, outputString } of tests) {
					const v = vector(input.x, input.y, input.z);
					expect(v.toString()).toEqual(outputString);
					expect(v[Symbol.toPrimitive]("string")).toBe(outputString);
				}
			});
			it("Should convert an instance into string when used in literal template", () => {
				for (const { input, outputString } of tests) {
					const v = vector(input.x, input.y, input.z);
					const output = `The vector is ${v.toString()}`;
					expect(output).toEqual(`The vector is ${outputString}`);
				}
			});
		});
		describe("As a number", () => {
			it("Should convert vector instance into a primitive using it's length as value", () => {
				for (const { input, outputNumber } of tests) {
					const v = vector(input.x, input.y, input.z);
					expect(+v).toEqual(outputNumber);
					expect(v[Symbol.toPrimitive]("number")).toBe(outputNumber);
				}
			});
			it("Should convert a vector into a primitive value on coercion", () => {
				const a = vector([ 3, 4 ]);
				const b = vector([ 6, 8 ]);
		
				// @ts-expect-error: testing coercion
				expect(a + b).toBe(15);
			});
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
			v1: CartesianTuple;
			v2: VectorInput;
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
			const test = (v1: CartesianTuple, v2: VectorInput) => {
				return vector(...v1).equals(v2);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
			}
		});
		it("Compares the vector instances", () => {
			const test = (v1: CartesianTuple, v2: VectorInput) => {
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
