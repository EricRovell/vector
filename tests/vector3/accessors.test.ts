import { describe, expect, it } from "vitest";
import { Coords, VectorString, vector } from "../../src";

describe("Accessors", () => {
	describe("Getters", () => {
		describe("Magnitude", () => {
			interface TestCase {
				input: Partial<Coords>;
				magnitudeSq: number;
				magnitude: number;
			}

			const tests: TestCase[] = [
				{
					input: { x: 0 },
					magnitudeSq: 0,
					magnitude: 0
				},
				{
					input: { x: 3, y: 4 },
					magnitudeSq: 25,
					magnitude: 5
				},
				{
					input: { x: 3, y: 4, z: 12 },
					magnitudeSq: 169,
					magnitude: 13
				}
			];

			it("Should calculate the magnitude squared", () => {
				for (const { input, magnitudeSq } of tests) {
					expect(vector(input.x, input.y, input.z).magnitudeSq).toBe(magnitudeSq);
				}
			});
			it("Should calculate the magnitude", () => {
				for (const { input, magnitude } of tests) {
					expect(vector(input.x, input.y, input.z).magnitude).toBe(magnitude);
				}
			});
		});
		describe("Azimuthal angle", () => {
			interface TestCase {
				input: Partial<Coords>;
				outputRadians: number;
				outputDegrees: number;
			}

			const tests: TestCase[] = [
				{
					input: { x: 3, y: 4 },
					outputDegrees: 53.130102,
					outputRadians: 0.927295
				},
				{
					input: { x: -2, y: 5 },
					outputDegrees: 111.801409,
					outputRadians: 1.951303
				}
			];

			const test = (input: Partial<Coords>, degrees = false) => {
				return vector(input).getPhi(degrees);
			};

			it("Should calculate the azimuthal angle in radians", () => {
				for (const { input, outputRadians } of tests) {
					expect(test(input)).toBeCloseTo(outputRadians, 5);
				}
			});
			it("Should calculate the azimuthal angle in degrees", () => {
				for (const { input, outputDegrees } of tests) {
					expect(test(input, true)).toBeCloseTo(outputDegrees, 5);
				}
			});
		});
		describe("Elevation angle", () => {
			interface TestCase {
				input: Partial<Coords>;
				outputRadians: number;
				outputDegrees: number;
			}

			const tests: TestCase[] = [
				{
					input: { x: 3, y: 4, z: 5 },
					outputDegrees: 45,
					outputRadians: 0.785398
				},
				{
					input: { x: -2, y: 5, z: -6 },
					outputDegrees: 138.091152,
					outputRadians: 2.410145
				}
			];

			const test = (input: Partial<Coords>, degrees = false) => {
				return vector(input).getTheta(degrees);
			};

			it("Should calculate the elevation angle in radians", () => {
				for (const { input, outputRadians } of tests) {
					expect(test(input)).toBeCloseTo(outputRadians, 5);
				}
			});
			it("Should calculate the elevation angle in degrees", () => {
				for (const { input, outputDegrees } of tests) {
					expect(test(input, true)).toBeCloseTo(outputDegrees, 5);
				}
			});
		});
	});
	describe("Setters", () => {
		describe("Rotation", () => {
			describe("Azimuthal angle", () => {
				interface TestCase {
					input: Partial<Coords>;
					angleDegrees: number;
					angleRadians: number;
				}
	
				const tests: TestCase[] = [
					{
						input: { x: 1 },
						angleDegrees: 53.130102,
						angleRadians: 0.927295
					},
					{
						input: { x: 1, y: 2, z: 3 },
						angleDegrees: 111.801409,
						angleRadians: 1.951303
					}
				];
	
				describe("Immutable", () => {
					const test = (input: Partial<Coords>, angle: number, degrees = false) => {
						const instance = vector(input.x, input.y, input.z);
						expect(instance.getPhi(degrees)).not.toBeCloseTo(angle, 6);
						expect(instance.setPhi(angle, degrees).getPhi(degrees)).toBeCloseTo(angle, 6);
					};
	
					it("Should set the azimuthal angle in radians", () => {
						for (const { input, angleRadians } of tests) {
							test(input, angleRadians);
						}
					});
					it("Should set the azimuthal angle in degrees", () => {
						for (const { input, angleDegrees } of tests) {
							test(input, angleDegrees, true);
						}
					});
					it("Should rotate the azimuthal angle by angle in radians", () => {
						const test = (input: Partial<Coords>, angle: number) => {
							return vector(input).rotate(angle);
						};
					
						expect(test({ x: 1 }, 1).rotate(1).rotate(-0.5).getPhi()).toBeCloseTo(1.5, 1);
					});
					it("Should rotate the azimuthal angle by angle in degrees", () => {
						const test = (input: Partial<Coords>, angle: number) => {
							return vector(input).rotate(angle ,true);
						};
					
						expect(test({ x: 1 }, 60).rotate(30, true).rotate(-45, true).getPhi(true)).toBeCloseTo(45);
					});
				});
				describe("Mutable", () => {
					const test = (input: Partial<Coords>, angle: number, degrees = false) => {
						const instance = vector(input.x, input.y, input.z);
						expect(instance.getPhi(degrees)).not.toBeCloseTo(angle, 6);
						instance.setPhiSelf(angle, degrees);
						expect(instance.getPhi(degrees)).toBeCloseTo(angle, 6);
					};
		
					it("Should set the azimuthal angle in radians", () => {
						for (const { input, angleRadians } of tests) {
							test(input, angleRadians);
						}
					});
					it("Should set the azimuthal angle in degrees", () => {
						for (const { input, angleDegrees } of tests) {
							test(input, angleDegrees, true);
						}
					});
					it("Should rotate the azimuthal angle by angle in radians", () => {
						const radians = vector(1)
							.rotateSelf(1)
							.rotateSelf(1)
							.rotateSelf(-0.5)
							.getPhi();
	
						expect(radians).toBeCloseTo(1.5, 2);
					});
					it("Should rotate the azimuthal angle by angle in degrees", () => {
						const degrees = vector(1)
							.rotateSelf(60, true)
							.rotateSelf(30, true)
							.rotateSelf(-45, true)
							.getPhi(true);
					
						expect(degrees).toBeCloseTo(45);
					});
				});
			});
			describe("Elevation angle", () => {
				interface TestCase {
					input: Partial<Coords>;
					angleDegrees: number;
					angleRadians: number;
				}
	
				const tests: TestCase[] = [
					{
						input: { x: 1 },
						angleDegrees: 53.130102,
						angleRadians: 0.927295
					},
					{
						input: { x: 1, y: 2, z: 3 },
						angleDegrees: 111.801409,
						angleRadians: 1.951303
					}
				];
	
				describe("Immutable", () => {
					const test = (input: Partial<Coords>, angle: number, degrees = false) => {
						const instance = vector(input.x, input.y, input.z);
						expect(instance.getTheta(degrees)).not.toBeCloseTo(angle, 6);
						expect(instance.setTheta(angle, degrees).getTheta(degrees)).toBeCloseTo(angle, 6);
					};
		
					it("Should calculate the elevation angle in radians", () => {
						for (const { input, angleRadians } of tests) {
							test(input, angleRadians);
						}
					});
					it("Should calculate the elevation angle in degrees", () => {
						for (const { input, angleDegrees } of tests) {
							test(input, angleDegrees, true);
						}
					});
				});
				describe("Mutable", () => {
					const test = (input: Partial<Coords>, angle: number, degrees = false) => {
						const instance = vector(input.x, input.y, input.z);
						expect(instance.getTheta(degrees)).not.toBeCloseTo(angle, 6);
						instance.setThetaSelf(angle, degrees);
						expect(instance.getTheta(degrees)).toBeCloseTo(angle, 6);
					};
		
					it("Should set the elevation angle in radians", () => {
						for (const { input, angleRadians } of tests) {
							test(input, angleRadians);
						}
					});
					it("Should set the elevation angle in degrees", () => {
						for (const { input, angleDegrees } of tests) {
							test(input, angleDegrees, true);
						}
					});
				});
			});
			describe("Spatial rotation", () => {
				describe("Immutable", () => {
					it("Should rotate the vector in space using radians", () => {
						const radians = vector({ phi: Math.PI / 3, theta: Math.PI / 3 })
							.rotate3d(Math.PI / 3, Math.PI / 3)
							.rotate3d(-Math.PI / 2, -Math.PI / 2);

						expect(radians.getPhi()).toBeCloseTo(Math.PI / 6, 2);
						expect(radians.getTheta()).toBeCloseTo(Math.PI / 6, 2);
					});
					it("Should rotate the vector in space using degrees", () => {
						const degrees = vector({ degrees: true, phi: 0, theta: 0 })
							.rotate3d(60, 30, true)
							.rotate3d(30, 15, true)
							.rotate3d(-45, -30, true);

						expect(degrees.getPhi(true)).toBeCloseTo(45);
						expect(degrees.getTheta(true)).toBeCloseTo(15);
					});
				});
				describe("Mutable", () => {
					it("Should rotate the vector in space using radians", () => {
						const radians = vector({ phi: Math.PI / 3, theta: Math.PI / 3 })
							.rotateSelf3d(Math.PI / 3, Math.PI / 3)
							.rotateSelf3d(-Math.PI / 2, -Math.PI / 2);

						expect(radians.getPhi()).toBeCloseTo(Math.PI / 6, 2);
						expect(radians.getTheta()).toBeCloseTo(Math.PI / 6, 2);
					});
					it("Should rotate the vector in space using degrees", () => {
						const degrees = vector({ degrees: true, phi: 0, theta: 0 })
							.rotateSelf3d(60, 30, true)
							.rotateSelf3d(30, 15, true)
							.rotateSelf3d(-45, -30, true);

						expect(degrees.getPhi(true)).toBeCloseTo(45);
						expect(degrees.getTheta(true)).toBeCloseTo(15);
					});
				});
			});
		});
		describe("Components", () => {
			interface TestCase {
				v1: Coords;
				v2: Coords;
			}

			const tests: TestCase[] = [
				{
					v1: { x: 1, y: 2, z: 3 },
					v2: { x: 0, y: 0, z: 0 }
				},
				{
					v1: { x: 0, y: -2, z: 8 },
					v2: { x: 4, y: 4, z: -1 }
				}
			];
			
			it("Should set the components state from arguments", () => {
				const test = (v1: Coords, v2: Coords) => {
					const instance = vector(v1.x, v1.y, v1.z);
					instance.set(v2.x, v2.y, v2.z);
					expect(instance.x).toBe(v2.x);
					expect(instance.y).toBe(v2.y);
					expect(instance.z).toBe(v2.z);
				};

				for (const { v1, v2 } of tests) {
					test(v1, v2);
				}
			});
			it("Should set the components state from another vector instance", () => {
				const test = (v1: Coords, v2: Coords) => {
					const instance = vector(v1.x, v1.y, v1.z);
					const anotherInstance = vector(v2.x, v2.y, v2.z);
					instance.set(anotherInstance);
					expect(instance.x).toBe(anotherInstance.x);
					expect(instance.y).toBe(anotherInstance.y);
					expect(instance.z).toBe(anotherInstance.z);
				};

				for (const { v1, v2 } of tests) {
					test(v1, v2);
				}
			});
			it("Should fallback the state to zero vector on wrong input", () => {
				// @ts-expect-error: Testing wrong input
				expect(vector(1, 2, 3).set(null).toString()).toBe("(0, 0, 0)");
			});
		});
		describe("Component", () => {
			interface TestCase {
				input: Coords;
				component: "x" | "y" | "z";
				value: number;
				output: VectorString;
			}

			const tests: TestCase[] = [
				{
					input: { x: 1, y: 2, z: 3 },
					component: "x",
					value: 3,
					output: "(3, 2, 3)"
				},
				{
					input: { x: 1, y: 2, z: 3 },
					component: "y",
					value: 5,
					output: "(1, 5, 3)"
				},
				{
					input: { x: 1, y: 2, z: 3 },
					component: "z",
					value: -7,
					output: "(1, 2, -7)"
				}
			];

			describe("Immutable", () => {
				it("Should set the vector's component value", () => {
					const test = (v: Coords, component: "x" | "y" | "z", value: number) => {
						return vector(v.x, v.y, v.z).setComponent(component, value).toString();
					};
	
					for (const { input, component, value, output } of tests) {
						expect(test(input, component, value)).toBe(output);
					}
				});
				it("Should fallback to zero vector on invalid input", () => {
					interface TestCase {
						component: string;
						value: number;
					}

					const tests: TestCase[] = [
						{
							component: "d",
							value: 3
						},
						{
							component: "k",
							value: 8
						},
						{
							component: "f",
							value: NaN
						}
					];
	
					for (const { component, value } of tests) {
						// @ts-expect-error: testing invalid input
						expect(vector(1, 2, 3).setComponent(component, value).toString()).toBe("(0, 0, 0)");
					}
				});
			});
			describe("Mutable", () => {
				it("Should set the vector's component value", () => {
					const test = (v: Coords, component: "x" | "y" | "z", value: number, output: VectorString) => {
						const instance = vector(v.x, v.y, v.z);
						expect(instance[component]).toBe(v[component]);
						instance.setComponentSelf(component, value);
						expect(instance[component]).toBe(value);
						expect(instance.toString()).toBe(output);
					};
	
					for (const { input, component, value, output } of tests) {
						test(input, component, value, output);
					}
				});
				it("Should not change component values on invalid input", () => {
					interface TestCase {
						component: string;
						value: number;
					}

					const tests: TestCase[] = [
						{
							component: "d",
							value: 3
						},
						{
							component: "k",
							value: 8
						},
						{
							component: "f",
							value: NaN
						}
					];

					const test = (component: "x" | "y" | "z", value: number) => {
						const instance = vector(1, 2, 3);
						instance.setComponentSelf(component, value);
						expect(instance.toString()).toBe("(1, 2, 3)");
					};
	
					for (const { component, value } of tests) {
						// @ts-expect-error: testing invalid input
						test(component, value);
					}
				});
			});
		});
		describe("Magnitude", () => {
			interface TestCase {
				input: Partial<Coords>;
				magnitude: number;
				limits: {
					limit: number;
					result: number;
				}[];
			}

			const tests: TestCase[] = [
				{
					input: { x: 1 },
					magnitude: 5,
					limits: [
						{
							limit: 10,
							result: 5
						},
						{
							limit: 5,
							result: 5
						},
						{
							limit: 3,
							result: 3
						},
						{
							limit: 0,
							result: 0
						},
						{
							limit: -5,
							result: 0
						}
					]
				},
				{
					input: { x: 1, y: 2 },
					magnitude: 5,
					limits: [
						{
							limit: 10,
							result: 5
						},
						{
							limit: 5,
							result: 5
						},
						{
							limit: 3,
							result: 3
						},
						{
							limit: 0,
							result: 0
						},
						{
							limit: -5,
							result: 0
						}
					]
				},
				{
					input: { x: 1, y: 2, z: 3 },
					magnitude: 5,
					limits: [
						{
							limit: 10,
							result: 5
						},
						{
							limit: 5,
							result: 5
						},
						{
							limit: 3,
							result: 3
						},
						{
							limit: 0,
							result: 0
						},
						{
							limit: -5,
							result: 0
						}
					]
				}
			];

			describe("Immutable", () => {
				it("Should set the magnitude", () => {
					const test = (input: Partial<Coords>, magnitude: number) => {
						const v1 = vector(input.x, input.y, input.z);
						const v2 = v1.setMagnitude(magnitude);
						expect(v1.magnitude).not.toBe(v2.magnitude);
						expect(v2.magnitude).toBe(magnitude);
					};

					for (const { input, magnitude } of tests) {
						test(input, magnitude);
					}
				});
				it("Should limit the magnitude", () => {
					const test = (input: Partial<Coords>, magnitude: number, limit: number) => {
						return vector(input.x, input.y, input.z)
							.setMagnitude(magnitude)
							.limit(limit)
							.magnitude;
					};

					for (const { input, magnitude, limits } of tests) {
						for (const { limit, result } of limits) {
							expect(test(input, magnitude, limit)).toBeCloseTo(result, 10);
						}
					}
				});
				it("Should normalize the vector", () => {
					const test = (input: Partial<Coords>) => {
						return vector(input.x, input.y, input.z)
							.normalize()
							.magnitude;
					};

					for (const { input } of tests) {
						expect(test(input)).toBeCloseTo(1);
					}
				});
				it("Should not normalize the zero vector, the vector should be marked as invalid", () => {
					expect(vector(0, 0, 0).normalize().valid).toBe(false);
				});
			});
			describe("Mutable", () => {
				it("Should set the magnitude", () => {
					const test = (input: Partial<Coords>, magnitude: number) => {
						const instance = vector(input.x, input.y, input.z);
						expect(instance.magnitude).not.toBe(magnitude);
						instance.setMagnitudeSelf(magnitude);
						expect(instance.magnitude).toBe(magnitude);
					};

					for (const { input, magnitude } of tests) {
						test(input, magnitude);
					}
				});
				it("Should limit the magnitude", () => {
					const test = (input: Partial<Coords>, magnitude: number, limit: number) => {
						const instance = vector(input.x, input.y, input.z);
						instance.setMagnitudeSelf(magnitude);
						instance.limitSelf(limit);
						return instance.magnitude;
					};

					for (const { input, magnitude, limits } of tests) {
						for (const { limit, result } of limits) {
							expect(test(input, magnitude, limit)).toBeCloseTo(result, 10);
						}
					}
				});
				it("Should normalize the vector", () => {
					const test = (input: Partial<Coords>) => {
						const instance = vector(input.x, input.y, input.z);
						instance.normalizeSelf();
						return instance.magnitude;
					};

					for (const { input } of tests) {
						expect(test(input)).toBeCloseTo(1);
					}
				});
				it("Should not normalize the zero vector, state should not be changed", () => {
					expect(vector(0, 0, 0).normalizeSelf().magnitude).toBe(0);
				});
			});
		});
		describe("Inversion", () => {
			interface TestCase {
				input: Partial<Coords>;
				output: VectorString;
			}

			const tests: TestCase[] = [
				{
					input: { x: 2 },
					output: "(-2, 0, 0)"
				},
				{
					input: { x: 1, y: 2 },
					output: "(-1, -2, 0)"
				},
				{
					input: { x: 1, y: 2, z: 3 },
					output: "(-1, -2, -3)"
				},
				{
					input: { x: -2 },
					output: "(2, 0, 0)"
				},
				{
					input: { x: -1, y: -2 },
					output: "(1, 2, 0)"
				},
				{
					input: { x: -1, y: -2, z: -3 },
					output: "(1, 2, 3)"
				}
			];

			describe("Immutable", () => {
				const test = (input: Partial<Coords>, output: VectorString) => {
					const instance = vector(input.x, input.y, input.z).inverted;
					expect(instance.toString()).toBe(output);
				};

				it("Should invert the vector", () => {
					for (const { input, output } of tests) {
						test(input, output);
					}
				});
			});
		});
		describe("Rounding", () => {
			interface TestCase {
				input: Partial<Coords>;
				places?: number;
				clampRange?: [ left: number, right: number],
				outputRound: VectorString;
				outputFloor: VectorString;
				outputCeil: VectorString;
				outputClamp: VectorString;
			}

			const tests: TestCase[] = [
				{
					input: { x: 1.12345 },
					places: 4,
					clampRange: [ -2, 2 ],
					outputRound: "(1.1235, 0, 0)",
					outputFloor: "(1.1234, 0, 0)",
					outputCeil: "(1.1235, 0, 0)",
					outputClamp: "(1.12345, 0, 0)"
				},
				{
					input: { x: 1.12345, y: 2.45678 },
					places: 4,
					clampRange: [ -1, 1 ],
					outputRound: "(1.1235, 2.4568, 0)",
					outputFloor: "(1.1234, 2.4567, 0)",
					outputCeil: "(1.1235, 2.4568, 0)",
					outputClamp: "(1, 1, 0)"
				},
				{
					input: { x: 1.12345, y: 2.45678, z: 3.78921 },
					places: 4,
					clampRange: [ 0.5, 0.75 ],
					outputRound: "(1.1235, 2.4568, 3.7892)",
					outputFloor: "(1.1234, 2.4567, 3.7892)",
					outputCeil: "(1.1235, 2.4568, 3.7893)",
					outputClamp: "(0.75, 0.75, 0.75)"
				},
				{
					input: { x: 1.12345, y: 2.45678, z: 3.78921 },
					places: undefined,
					clampRange: [ 0, 10 ],
					outputRound: "(1, 2, 4)",
					outputFloor: "(1, 2, 3)",
					outputCeil: "(2, 3, 4)",
					outputClamp: "(1.12345, 2.45678, 3.78921)"
				},
				{
					input: { x: Math.SQRT2, y: Math.PI, z: 2 * Math.PI },
					places: 3,
					clampRange: [ 2, 4 ],
					outputRound: "(1.414, 3.142, 6.283)",
					outputFloor: "(1.414, 3.141, 6.283)",
					outputCeil: "(1.415, 3.142, 6.284)",
					outputClamp: `(2, ${Math.PI}, 4)`
				},
				{
					input: { x: Math.SQRT2, y: Math.PI, z: 2 * Math.PI },
					places: undefined,
					clampRange: undefined,
					outputRound: "(1, 3, 6)",
					outputFloor: "(1, 3, 6)",
					outputCeil: "(2, 4, 7)",
					outputClamp: "(1, 1, 1)"
				}
			];

			describe("Round", () => {
				it("Should round the vector's component values by defined accuracy", () => {
					for (const { input, places, outputRound } of tests) {
						if (places) {
							expect(vector(input.x, input.y, input.z).round(places).toString()).toBe(outputRound);
						}
					}
				});
				it("Should round the vector's component values to integers by default", () => {
					for (const { input, places, outputRound } of tests) {
						if (!places) {
							expect(vector(input.x, input.y, input.z).round().toString()).toBe(outputRound);
						}
					}
				});
			});
			describe("Floor", () => {
				it("Should floor the vector's component values by defined accuracy", () => {
					for (const { input, places, outputFloor } of tests) {
						if (places) {
							expect(vector(input.x, input.y, input.z).floor(places).toString()).toBe(outputFloor);
						}
					}
				});
				it("Should round the vector's component values to integers by default", () => {
					for (const { input, places, outputFloor } of tests) {
						if (!places) {
							expect(vector(input.x, input.y, input.z).floor().toString()).toBe(outputFloor);
						}
					}
				});
			});
			describe("Ceil", () => {
				it("Should floor the vector's component values by defined accuracy", () => {
					for (const { input, places, outputCeil } of tests) {
						if (places) {
							expect(vector(input.x, input.y, input.z).ceil(places).toString()).toBe(outputCeil);
						}
					}
				});
				it("Should round the vector's component values to integers by default", () => {
					for (const { input, places, outputCeil } of tests) {
						if (!places) {
							expect(vector(input.x, input.y, input.z).ceil().toString()).toBe(outputCeil);
						}
					}
				});
			});
			describe("Clamp", () => {
				it("Should clamp the vector's component values by defined accuracy", () => {
					for (const { input, clampRange, outputClamp } of tests) {
						if (clampRange) {
							expect(vector(input.x, input.y, input.z).clamp(...clampRange).toString()).toBe(outputClamp);
						}
					}
				});
				it("Should clamp the vector's component values to integers by default", () => {
					for (const { input, clampRange, outputClamp } of tests) {
						if (!clampRange) {
							expect(vector(input.x, input.y, input.z).clamp().toString()).toBe(outputClamp);
						}
					}
				});
			});
		});
		describe("Mapping", () => {
			interface TestCase {
				input: Partial<Coords>;
				func: (value: number) => number;
				output: VectorString;
			}

			const tests: TestCase[] = [
				{
					input: { x: 1, y: 2, z: 3 },
					func: (value: number) => value * 2,
					output: "(2, 4, 6)"
				},
				{
					input: { x: 2, y: 4, z: 6 },
					func: (value: number) => value / 2,
					output: "(1, 2, 3)"
				},
				{
					input: { x: 0, y: 5, z: 10 },
					func: (value: number) => value + 2,
					output: "(2, 7, 12)"
				},
				{
					input: { x: 25, y: 36, z: 49 },
					func: (value: number) => value ** 0.5,
					output: "(5, 6, 7)"
				}
			];

			describe("Immutable", () => {
				const test = (input: Partial<Coords>, func: TestCase["func"]) => {
					return vector(input.x, input.y, input.z)
						.map(func)
						.toString();
				};

				it("Creates a new Vector instance mapping the vector's components values", () => {
					for (const { input, func, output } of tests) {
						expect(test(input, func)).toBe(output);
					}
				});
			});
			describe("Mutable", () => {
				const test = (input: Partial<Coords>, func: TestCase["func"]) => {
					const instance = vector(input.x, input.y, input.z);
					instance.mapSelf(func);
					return instance.toString();
				};

				it("Creates a new Vector instance mapping the vector's components values", () => {
					for (const { input, func, output } of tests) {
						expect(test(input, func)).toBe(output);
					}
				});
			});
		});
	});
});
