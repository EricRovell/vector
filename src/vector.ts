import { parse } from "./parser";
import type { InputUser, Input } from "./types";
import { rad2deg } from "./utils";

/**
 * A class to describe a 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export class Vector {
	private readonly parsed: ReturnType<typeof parse>;
	readonly x: number;
	readonly y: number;
	readonly z: number;

	constructor(input?: InputUser) {
		this.parsed = parse(input);
		const [ x = 0, y = 0, z = 0 ] = this.parsed ?? [];
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * Performs the addition and returns the sum as new `Vector` instance.
	 */
	add(input: Input): Vector {
		const other = vector(input);
		return new Vector([
			this.x + other.x,
			this.y + other.y,
			this.z + other.z
		]);
	}

	/**
	 * Calculates the cross product between two vectors and returns a new `Vector` instance.
	 */
	cross(input: Input): Vector {
		const other = vector(input);
		return new Vector([
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		]);
	}

	/**
	 * Calculates the Euclidian distance between two points,
	 * considering a point as a vector.
	 */
	distance(input: Input): number {
		return this.distanceSq(input) ** 0.5;
	}

	/**
	 * Calculates the squared Euclidian distance between two points,
	 * considering a point as a vector.
	 *
	 * Slighty more efficient to calculate, useful to comparing.
	 */
	distanceSq(input: Input): number {
		const other = vector(input);
		return (
			(this.x - other.x) ** 2 +
			(this.y - other.y) ** 2 +
			(this.z - other.z) ** 2
		);
	}

	/**
	 * Calculates the dot product of two vectors.
	 */
	dot(input: Input): number {
		const other = vector(input);
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	/**
	 * Performs an equality check against another vector input or `Vector` instance.
	 */
	equals(input: Input): boolean {
		const other = vector(input);
		return (
			this.x === other.x &&
			this.y === other.y &&
			this.z === other.z
		);
	}

	/**
	 * Calculates vector's azimuthal angle.
	 */
	getPhi(degrees = false): number {
		return Math.atan2(this.y, this.x) * (degrees ? rad2deg : 1);
	}

	/**
	 * Calculates vector's elevation angle.
	 */
	getTheta(degrees = false): number {
		return Math.acos(this.z / this.magnitude) * (degrees ? rad2deg : 1);
	}

	/**
	 * Returns the inverted `Vector` instance.
	 */
	get inverted(): Vector {
		return this.scale(-1);
	}

	/**
	 * Limits the magnitude of the vector and returns a new `Vector` instance.
	 */
	limit(value: number): Vector {
		return this.magnitudeSq < value ** 2
			? this
			: this.setMagnitude(value);
	}

	/**
	 * Calculates the magnitude of the vector.
	 */
	get magnitude() {
		return this.magnitudeSq ** 0.5;
	}

	/**
	 * Calculates the squared magnitude of the vector.
	 * Usefull when the real length is not required, for example to compare vectors.
	 */
	get magnitudeSq() {
		return this.x ** 2 + this.y ** 2 + this.z ** 2;
	}

	/**
	 * Rotates the vector by an azimuthal angle (XOY plane) and returns a new `Vector` instance.
	 */
	rotate(value: number, degrees = false): Vector {
		return this.rotate3d(value, 0, degrees);
	}

	/**
	 * Rotates the vector by an azimuthal and elevation angles and returns a new `Vector` instance.
	 */
	rotate3d(phi = 0, theta = 0, degrees = false): Vector {
		return new Vector({
			degrees,
			phi: this.getPhi(degrees) + phi,
			theta: this.getTheta(degrees) + theta,
			magnitude: this.magnitude
		});
	}

	/**
	 * Sets the magnitude of the vector and returns a new `Vector` instance.
	 */
	setMagnitude(value: number): Vector {
		return this.unit.scale(value);
	}

	/**
	 * Rotates the vector to a specific azimuthal angle (OXY plane) and returns a new `Vector` instance.
	 */
	setPhi(value: number, degrees = false): Vector {
		return new Vector({
			degrees,
			phi: value,
			theta: this.getTheta(degrees),
			magnitude: this.magnitude
		});
	}

	/**
	 * Rotates the vector to a specific angle and returns a new `Vector` instance.
	 */
	setTheta(value: number, degrees = false): Vector {
		return new Vector({
			degrees,
			phi: this.getPhi(degrees),
			theta: value,
			magnitude: this.magnitude
		});
	}

	/**
	 * Performs the scalar multiplication and returns as new `Vector` instance.
	 */
	scale(value: number): Vector {
		return new Vector([
			this.x * value,
			this.y * value,
			this.z * value
		]);
	}

	/**
	 * Performs the subtraction and returns the sum as new `Vector` instance.
	 */
	sub(input: Input): Vector {
		return this.add(vector(input).inverted);
	}

	/**
	 * Returns a `Vector` string representation.
	 */
	toString() {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}

	/**
	 * Normalizes the original vector and returns the unit vector.
	 */
	get unit() {
		const magnitude = this.magnitude;
		if (magnitude) {
			return this.scale(1 / magnitude);
		}

		// @ts-expect-error: mark the resulting vector as invalid
		return vector(null);
	}

	/**
	 * Returns a boolean indicating whether or not a user input was valid.
	 */
	get valid() {
		return Boolean(this.parsed);
	}
}

/**
 * Creates an instance of 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export function vector(input?: Input): Vector {
	if (input instanceof Vector) {
		return input;
	}

	return new Vector(input);
}
