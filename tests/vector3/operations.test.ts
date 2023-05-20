import { describe, expect, it } from "vitest";
import { Cartesian, VectorString, vector } from "../../src";

describe("Vector operations", () => {
	describe("Addition", () => {
		interface TestCase {
			v1: Partial<Cartesian>;
			v2: Partial<Cartesian>;
			output: VectorString;
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				output: "(3, 5, 7)"
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				output: "(-1, 1, -1)"
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				output: "(0, 0, 0)"
			},
			{
				v1: { x: -1, y: 2 },
				v2: { x: 1, y: -2 },
				output: "(0, 0, 0)"
			}
		];

		describe("Immutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>) => {
					return vector(v1.x, v1.y, v1.z).add(v2.x, v2.y, v2.z).toString();
				};

				for (const { v1, v2, output } of tests) {
					expect(test(v1, v2)).toBe(output);
					expect(test(v2, v1)).toBe(output);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>) => {
					const another = vector(v2.x, v2.y, v2.z);
					return vector(v1.x, v1.y, v1.z).add(another).toString();
				};

				for (const { v1, v2, output } of tests) {
					expect(test(v1, v2)).toBe(output);
					expect(test(v2, v1)).toBe(output);
				}
			});
		});
		describe("Mutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>, output: VectorString) => {
					const v = vector(v1.x, v1.y, v1.z);
					expect(v.toString()).toBe(`(${v1.x || 0}, ${v1.y || 0}, ${v1.z || 0})`);
					v.addSelf(v2.x as number, v2.y, v2.z);
					expect(v.toString()).toBe(output);
				};

				for (const { v1, v2, output } of tests) {
					test(v1, v2, output);
					test(v2, v1, output);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>, output: VectorString) => {
					const v11 = vector(v1.x, v1.y, v1.z);
					const v22 = vector(v2.x, v2.y, v2.z);
					expect(v11.toString()).toBe(`(${v1.x || 0}, ${v1.y || 0}, ${v1.z || 0})`);
					v11.addSelf(v22);
					expect(v11.toString()).toBe(output);
				};

				for (const { v1, v2, output } of tests) {
					test(v1, v2, output);
					test(v2, v1, output);
				}
			});
			it("Should be chainable", () => {
				const v = vector(1, 2, 3)
					.addSelf(-1, 0, 0)
					.addSelf([ 0, -2, 0 ])
					.addSelf(0, 0, -3)
					.addSelf({ x: -2, y: -5, z: 8 });

				expect(v.equals([ -2, -5, 8 ])).toBe(true);
			});
		});
	});
	describe("Subtraction", () => {
		interface TestCase {
			v1: Partial<Cartesian>;
			v2: Partial<Cartesian>;
			output12: VectorString;
			output21: VectorString;
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				output12: "(-1, -1, -1)",
				output21: "(1, 1, 1)"
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				output12: "(3, -5, 7)",
				output21: "(-3, 5, -7)"
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				output12: "(-2, 4, -6)",
				output21: "(2, -4, 6)"
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: -1, y: -2, z: -3 },
				output12: "(0, 0, 0)",
				output21: "(0, 0, 0)"
			},
			{
				v1: { x: -1, y: 2 },
				v2: { x: 1, y: -2 },
				output12: "(-2, 4, 0)",
				output21: "(2, -4, 0)"
			}
		];

		describe("Immutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>) => {
					return vector(v1.x, v1.y, v1.z).sub(v2.x as number, v2.y, v2.z).toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>) => {
					const another = vector(v2.x, v2.y, v2.z);
					return vector(v1.x, v1.y, v1.z).sub(another).toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
		});
		describe("Mutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>, diff: VectorString) => {
					const v = vector(v1.x, v1.y, v1.z);
					expect(v.toString()).toBe(`(${v1.x || 0}, ${v1.y || 0}, ${v1.z || 0})`);
					v.subSelf(v2.x as number, v2.y, v2.z);
					expect(v.toString()).toBe(diff);
				};

				for (const { v1, v2, output12, output21 } of tests) {
					test(v1, v2, output12);
					test(v2, v1, output21);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Partial<Cartesian>, v2: Partial<Cartesian>, diff: VectorString) => {
					const v11 = vector(v1.x, v1.y, v1.z);
					const v22 = vector(v2.x, v2.y, v2.z);
					expect(v11.toString()).toBe(`(${v1.x || 0}, ${v1.y || 0}, ${v1.z || 0})`);
					v11.subSelf(v22);
					expect(v11.toString()).toBe(diff);
				};

				for (const { v1, v2, output12, output21 } of tests) {
					test(v1, v2, output12);
					test(v2, v1, output21);
				}
			});
			it("Should be chainable", () => {
				const v = vector(12, 15, 25)
					.subSelf(1, 2, 3)
					.subSelf([ -2, -3, -4 ])
					.subSelf({ x: -1, y: 2, z: -3 });

				expect(v.equals([ 14, 14, 29 ])).toBe(true);
			});
		});
	});
	describe("Cross product", () => {
		interface TestCase {
			v1: Cartesian;
			v2: Cartesian;
			output12: VectorString;
			output21: VectorString;
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				output12: "(-1, 2, -1)",
				output21: "(1, -2, 1)",
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				output12: "(-1, -2, -1)",
				output21: "(1, 2, 1)"
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				output12: "(0, 0, 0)",
				output21: "(0, 0, 0)"
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: -1, y: -2, z: -3 },
				output12: "(0, 0, 0)",
				output21: "(0, 0, 0)"
			}
		];

		describe("Immutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Cartesian, v2: Cartesian) => {
					return vector(v1.x, v1.y, v1.z).cross(v2.x, v2.y, v2.z).toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Cartesian, v2: Cartesian) => {
					const another = vector(v2.x, v2.y, v2.z);
					return vector(v1.x, v1.y, v1.z).cross(another).toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
		});
		describe("Mutable", () => {
			it("Should use plane arguments as an input and an addendum", () => {
				const test = (v1: Cartesian, v2: Cartesian) => {
					const instance = vector(v1.x, v1.y, v1.z);
					instance.crossSelf(v2.x, v2.y, v2.z);
					return instance.toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
			it("Should use plane arguments as an input and another vector instance as an addendum", () => {
				const test = (v1: Cartesian, v2: Cartesian) => {
					const instance = vector(v1.x, v1.y, v1.z);
					const anotherInstance = vector(v2.x, v2.y, v2.z);
					instance.crossSelf(anotherInstance);
					return instance.toString();
				};

				for (const { v1, v2, output12, output21 } of tests) {
					expect(test(v1, v2)).toBe(output12);
					expect(test(v2, v1)).toBe(output21);
				}
			});
		});
	});
	describe("Dot product", () => {
		interface TestCase {
			v1: Cartesian;
			v2: Cartesian;
			output: number
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				output: 20
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				output: -20
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				output: -14
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: -1, y: -2, z: -3 },
				output: 14
			}
		];

		it("Should use plane arguments as an input and an addendum", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				return vector(v1.x, v1.y, v1.z).dot(v2.x, v2.y, v2.z);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
				expect(test(v2, v1)).toBe(output);
			}
		});
		it("Should use plane arguments as an input and another vector instance as an addendum", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				const another = vector(v2.x, v2.y, v2.z);
				return vector(v1.x, v1.y, v1.z).dot(another);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
				expect(test(v2, v1)).toBe(output);
			}
		});
	});
	describe("Distance between", () => {
		interface TestCase {
			v1: Cartesian;
			v2: Cartesian;
			output: number
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				output: 1.73205
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				output: 9.11043
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				output: 7.48331
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: -1, y: -2, z: -3 },
				output: 0
			}
		];

		it("Should use plane arguments as an input and an addendum", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				return vector(v1.x, v1.y, v1.z).distance(v2.x, v2.y, v2.z);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBeCloseTo(output, 5);
				expect(test(v2, v1)).toBeCloseTo(output, 5);
			}
		});
		it("Should use plane arguments as an input and another vector instance as an addendum", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				const another = vector(v2.x, v2.y, v2.z);
				return vector(v1.x, v1.y, v1.z).distance(another);
			};

			for (const { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBeCloseTo(output, 5);
				expect(test(v2, v1)).toBeCloseTo(output, 5);
			}
		});
	});
	describe("Angle between", () => {
		interface TestCase {
			v1: Cartesian;
			v2: Cartesian;
			outputRadians: number;
			outputDegrees: number;
			sign: -1 | 0 | 1;
			signInverse: -1 | 0 | 1;
		}

		const tests: TestCase[] = [
			{
				v1: { x: 1, y: 2, z: 3 },
				v2: { x: 2, y: 3, z: 4 },
				outputRadians: 0.12187,
				outputDegrees: 6.98250,
				sign: -1,
				signInverse: 1
			},
			{
				v1: { x: 1, y: -2, z: 3 },
				v2: { x: -2, y: 3, z: -4 },
				outputRadians: 3.01973,
				outputDegrees: 173.01750,
				sign: -1,
				signInverse: 1
			},
			{
				v1: { x: -1, y: 2, z: -3 },
				v2: { x: 1, y: -2, z: 3 },
				outputRadians: Math.PI,
				outputDegrees: 180,
				sign: 1,
				signInverse: 1
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: -1, y: -2, z: -3 },
				outputRadians: 0,
				outputDegrees: 0,
				sign: 0,
				signInverse: 0
			},
			{
				v1: { x: 0, y: 0, z: 0 },
				v2: { x: -1, y: -2, z: -3 },
				outputRadians: 0,
				outputDegrees: 0,
				sign: 0,
				signInverse: 0
			},
			{
				v1: { x: -1, y: -2, z: -3 },
				v2: { x: 0, y: 0, z: 0 },
				outputRadians: 0,
				outputDegrees: 0,
				sign: 0,
				signInverse: 0
			}
		];

		
		describe("Unsigined", () => {
			describe("Radians", () => {
				it("Should use plane arguments as an input", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						return vector(v1.x, v1.y, v1.z).angle(v2);
					};
		
					for (const { v1, v2, outputRadians } of tests) {
						expect(test(v1, v2)).toBeCloseTo(outputRadians, 5);
						expect(test(v2, v1)).toBeCloseTo(outputRadians, 5);
					}
				});
				it("Should use plane arguments as an input and another vector instance", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						const another = vector(v2.x, v2.y, v2.z);
						return vector(v1.x, v1.y, v1.z).angle(another);
					};
		
					for (const { v1, v2, outputRadians } of tests) {
						expect(test(v1, v2)).toBeCloseTo(outputRadians, 5);
						expect(test(v2, v1)).toBeCloseTo(outputRadians, 5);
					}
				});
			});
			describe("Degrees", () => {
				it("Should use plane arguments as an input", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						return vector(v1.x, v1.y, v1.z).angle(v2, false, true);
					};
		
					for (const { v1, v2, outputDegrees } of tests) {
						expect(test(v1, v2)).toBeCloseTo(outputDegrees, 5);
						expect(test(v2, v1)).toBeCloseTo(outputDegrees, 5);
					}
				});
				it("Should use plane arguments as an input and another vector instance", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						const another = vector(v2.x, v2.y, v2.z);
						return vector(v1.x, v1.y, v1.z).angle(another, false, true);
					};
		
					for (const { v1, v2, outputDegrees } of tests) {
						expect(test(v1, v2)).toBeCloseTo(outputDegrees, 5);
						expect(test(v2, v1)).toBeCloseTo(outputDegrees, 5);
					}
				});
			});
		});
		describe("Signed", () => {
			describe("Radians", () => {
				it("Should use plane arguments as an input", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						return Math.sign(
							vector(v1.x, v1.y, v1.z).angle(v2, true)
						);
					};
		
					for (const { v1, v2, sign, signInverse } of tests) {
						expect(test(v1, v2)).toBe(sign);
						expect(test(v2, v1)).toBe(signInverse);
					}
				});
				it("Should use plane arguments as an input and another vector instance", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						const another = vector(v2.x, v2.y, v2.z);
						return Math.sign(
							vector(v1.x, v1.y, v1.z).angle(another, true)
						);
					};
		
					for (const { v1, v2, sign, signInverse } of tests) {
						expect(test(v1, v2)).toBe(sign);
						expect(test(v2, v1)).toBe(signInverse);
					}
				});
			});
			describe("Degrees", () => {
				it("Should use plane arguments as an input", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						return Math.sign(
							vector(v1.x, v1.y, v1.z).angle(v2, true, true)
						);
					};
		
					for (const { v1, v2, sign, signInverse } of tests) {
						expect(test(v1, v2)).toBe(sign);
						expect(test(v2, v1)).toBe(signInverse);
					}
				});
				it("Should use plane arguments as an input and another vector instance", () => {
					const test = (v1: Cartesian, v2: Cartesian) => {
						const another = vector(v2.x, v2.y, v2.z);
						return Math.sign(
							vector(v1.x, v1.y, v1.z).angle(another, true, true)
						);
					};
		
					for (const { v1, v2, sign, signInverse } of tests) {
						expect(test(v1, v2)).toBe(sign);
						expect(test(v2, v1)).toBe(signInverse);
					}
				});
			});
		});
	});
	describe("Scaling", () => {
		interface TestCase {
			input: Cartesian;
			outputList: {
				scale: number;
				output: VectorString;
				outputInverse: VectorString;
			}[];
		}

		const tests: TestCase[] = [
			{
				input: { x: 1, y: 2, z: 3 },
				outputList: [
					{
						scale: 1,
						output: "(1, 2, 3)",
						outputInverse: "(1, 2, 3)"
					},
					{
						scale: -1,
						output: "(-1, -2, -3)",
						outputInverse: "(-1, -2, -3)"
					},
					{
						scale: 0.5,
						output: "(0.5, 1, 1.5)",
						outputInverse: "(2, 4, 6)"
					},
					{
						scale: 2,
						output: "(2, 4, 6)",
						outputInverse: "(0.5, 1, 1.5)"
					}
				]
			}
		];

		describe("Immutable", () => {
			it("Should perform the scalar multiplication of the vector", () => {
				const test = (v: Cartesian, scaleValue: number) => {
					return vector(v.x, v.y, v.z).scale(scaleValue).toString();
				};

				for (const { input, outputList } of tests) {
					for (const { scale, output } of outputList) {
						expect(test(input, scale)).toBe(output);
					}
				}
			});
			it("Should perform the inversed scalar multiplication of the vector", () => {
				const test = (v: Cartesian, scaleValue: number) => {
					return vector(v.x, v.y, v.z).scale(scaleValue, true).toString();
				};

				for (const { input, outputList } of tests) {
					for (const { scale, outputInverse } of outputList) {
						expect(test(input, scale)).toBe(outputInverse);
					}
				}
			});
		});
		describe("Mutable", () => {
			it("Should perform the scalar multiplication of the vector", () => {
				const test = (v: Cartesian, scaleValue: number) => {
					const instance = vector(v.x, v.y, v.z);
					instance.scaleSelf(scaleValue);
					return instance.toString();
				};

				for (const { input, outputList } of tests) {
					for (const { scale, output } of outputList) {
						expect(test(input, scale)).toBe(output);
					}
				}
			});
			it("Should perform the inversed scalar multiplication of the vector", () => {
				const test = (v: Cartesian, scaleValue: number) => {
					const instance = vector(v.x, v.y, v.z);
					instance.scaleSelf(scaleValue, true);
					return instance.toString();
				};

				for (const { input, outputList } of tests) {
					for (const { scale, outputInverse } of outputList) {
						expect(test(input, scale)).toBe(outputInverse);
					}
				}
			});
			it("Should be chainable", () => {
				const a = vector(1, 2, 3)
					.scaleSelf(2)
					.scaleSelf(3)
					.scaleSelf(-2);

				expect(a.equals([ -12, -24, -36 ])).toBe(true);
			});
			it("Should be chainable with inverse scaling option", () => {
				const a = vector(24, 60, 36)
					.scaleSelf(3, true)
					.scaleSelf(-2, true);

				expect(a.equals([ -4, -10, -6 ])).toBe(true);

				a.scaleSelf(0, true);
				expect(a.equals(-4, -10, -6)).toBe(true);
			});
		});
	});
	describe("Linear interpolation", () => {
		interface TestCase {
			input: Cartesian;
			destination: Cartesian;
			steps: {
				step: number;
				output: VectorString;
			}[];
		}

		const tests: TestCase[] = [
			{
				input: { x: 4, y: 8, z: 16 },
				destination: { x: 8, y: 24, z: 48 },
				steps: [
					{
						step: 0.25,
						output: "(5, 12, 24)"
					},
					{
						step: 0.5,
						output: "(6, 16, 32)"
					},
					{
						step: 0.75,
						output: "(7, 20, 40)"
					},
					{
						step: 1,
						output: "(8, 24, 48)"
					},
					{
						step: 1.5,
						output: "(8, 24, 48)"
					}
				]
			}
		];

		it("Should linearly interpolate the vector to destination vector", () => {
			const test = (input: Cartesian, destination: Cartesian, steps: TestCase["steps"]) => {
				const v1 = vector(input.x, input.y, input.z);
				const v2 = vector(destination.x, destination.y, destination.z);

				for (const { step, output } of steps) {
					expect(v1.lerp(v2, step).toString()).toBe(output);
				}
			};

			for (const { input, destination, steps } of tests) {
				test(input, destination, steps);
			}
		});
		it("Should use the input as fallback on negative step value", () => {
			const test = (input: Cartesian, destination: Cartesian) => {
				const v1 = vector(input.x, input.y, input.z);
				const v2 = vector(destination.x, destination.y, destination.z);
				expect(v1.lerp(v2).toString()).toBe(v2.toString());
			};

			for (const { input, destination } of tests) {
				test(input, destination);
			}
		});
		it("Should come to destination when step is not provided", () => {
			const test = (input: Cartesian, destination: Cartesian) => {
				const v1 = vector(input.x, input.y, input.z);
				const v2 = vector(destination.x, destination.y, destination.z);
				expect(v1.lerp(v2, -1).toString()).toBe(v1.toString());
			};

			for (const { input, destination } of tests) {
				test(input, destination);
			}
		});
	});
	describe("Reflection", () => {
		interface TestCase {
			v1: Cartesian;
			v2: Cartesian;
			output: VectorString;
		}

		const tests: TestCase[] = [
			{
				v1: { x: 4, y: 6, z: 0 },
				v2: { x: 0, y: -1, z: 0 },
				output: "(4, -6, 0)"
			}
		];

		it("Should reflect the vector against another vector input", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				return vector(v1.x, v1.y, v1.z)
					.reflect(v2.z, v2.y, v2.z)
					.toString();
			};

			for (const  { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
			}
		});
		it("Should reflect the vector against another vector instance", () => {
			const test = (v1: Cartesian, v2: Cartesian) => {
				const instance = vector(v1.x, v1.y, v1.z);
				const anotherInstance = vector(v2.z, v2.y, v2.z);
				return instance.reflect(anotherInstance).toString();
			};

			for (const  { v1, v2, output } of tests) {
				expect(test(v1, v2)).toBe(output);
			}
		});
	});
});
