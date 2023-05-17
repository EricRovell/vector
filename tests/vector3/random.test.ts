import { describe, expect, it } from "vitest";
import { vector } from "../../src";

describe("Randomness", () => {
	describe("Vector 2D", () => {
		it("Should generate a random 2D vector", () => {
			for (let i = 0; i < 10; i++) {
				for (const component of vector().random().toArray()) {
					expect(component).lessThanOrEqual(1);
					expect(component).greaterThanOrEqual(-1);
				}
			}
		});
	});
	describe("Vector 3D", () => {
		it("Should generate a random 3D vector", () => {
			for (let i = 0; i < 10; i++) {
				for (const component of vector().random3d().toArray()) {
					expect(component).lessThanOrEqual(1);
					expect(component).greaterThanOrEqual(-1);
				}
			}
		});
	});
});
