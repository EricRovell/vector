import { parse } from "./parser";
import type { Component, Input, InputUser } from "./types";
import { clamp, convertAngle } from "./utils";

/**
 * A class to describe a 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export class Vector {
	private readonly parsed: ReturnType<typeof parse>;
	x: number;
	y: number;
	z: number;

	constructor(x?: InputUser | number, y?: number, z?: number) {
		this.parsed = parse(x, y, z);
		const [ vx = 0, vy = 0, vz = 0 ] = this.parsed ?? [];
		this.x = vx;
		this.y = vy;
		this.z = vz;
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
	 * Adds the another `Vector` instance or valid vector input to this vector.
	 */
	addSelf(x: Input | number, y?: number, z?: number): Vector {
		const other = vector(x, y, z);
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;

		return this;
	}

	/**
	 * Calculates the angle between two vectors.
	 */
	angle(input: Input, signed = false, degrees = false): number {
		const other = vector(input);

		const magnitude = this.magnitude;
		const magnitudeOther = other.magnitude;

		if (magnitude === 0 || magnitudeOther === 0) {
			return 0;
		}

		const cosine = clamp(this.dot(other) / magnitude / magnitudeOther, -1, 1);
		const angle = Math.acos(cosine) * (signed ? Math.sign(this.cross(other).z || 1) : 1);
		return convertAngle(angle, degrees);
	}

	/**
	 * Returns a copy of current vector instance.
	 */
	copy(): Vector {
		return new Vector([ this.x, this.y, this.z ]);
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
		return convertAngle(Math.atan2(this.y, this.x), degrees);
	}

	/**
	 * Calculates vector's elevation angle.
	 */
	getTheta(degrees = false): number {
		return convertAngle(Math.acos(this.z / this.magnitude), degrees);
	}

	/**
	 * Returns the inverted `Vector` instance.
	 */
	get inverted(): Vector {
		return this.scale(-1);
	}

	/**
	 * Linearly interpolate the vector to another vector.
	 */
	lerp(input: Input, coef = 0): Vector {
		const other = vector(input);
		const factor = clamp(coef);
		return new Vector([
			this.x + (other.x - this.x) * factor,
			this.y + (other.y - this.y) * factor,
			this.z + (other.z - this.z) * factor
		]);
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
	get magnitude(): number {
		return this.magnitudeSq ** 0.5;
	}

	/**
	 * Calculates the squared magnitude of the vector.
	 * Usefull when the real length is not required, for example to compare vectors.
	 */
	get magnitudeSq(): number {
		return this.x ** 2 + this.y ** 2 + this.z ** 2;
	}

	/**
	 * Makes a new planar vector from a random azimuthal angle.
	 */
	random(random = Math.random): Vector {
		return new Vector({
			phi: 2 * Math.PI * random()
		});
	}

	/**
	 * Makes a new random 3D vector.
	 *
	 * Correct distribution thanks to [wolfram](https://mathworld.wolfram.com/SpherePointPicking.html).
	 */
	random3d(random = Math.random): Vector {
		const u = 2 * (random() - 0.5); // random value in [ -1, 1 ]
		const t = 2 * Math.PI * random();
		const f = (1 - u ** 2) ** 0.5;

		return new Vector([
			f * Math.cos(t),
			f * Math.sin(t),
			u
		]);
	}

	/**
	 * Reflects the vector about a normal line for 2D vector,
	 * or about a normal to a plane in 3D.
	 */
	reflect(input: Input): Vector {
		const surface = vector(input).unit;
		return this.sub(surface.scale(2 * this.dot(surface)));
	}

	/**
	 * Rotates the vector by an azimuthal angle (XOY plane) and returns a new `Vector` instance.
	 */
	rotate(value: number, degrees = false): Vector {
		return this.rotate3d(value, 0, degrees);
	}

	/**
	 * Rotates the current vector by an azimuthal angle (XOY plane).
	 */
	rotateSelf(value: number, degrees = false): Vector {
		return this.rotateSelf3d(value, 0, degrees);
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
	 * Rotates the current vector by an azimuthal and elevation angles.
	 */
	rotateSelf3d(phi = 0, theta = 0, degrees = false): Vector {
		[ this.x, this.y, this.z ] = this.rotate3d(phi, theta, degrees).toArray();
		return this;
	}

	/**
	 * Sets the vector component value and returns a new `Vector` instance.
	 */
	setComponent(component: Component, value: number): Vector {
		if (!this[component]) {
			// @ts-expect-error: mark the vector as invalid
			return vector(null);
		}

		const components = { x: this.x, y: this.y, z: this.z };
		components[component] = value;

		return new Vector(components);
	}

	/**
	 * Sets the current vector's component value.
	 */
	setComponentSelf(component: Component, value: number): Vector {
		if (!this[component]) {
			return this;
		}

		this[component] = value;
		return this;
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
	 * Rotates the current vector to a specific azimuthal angle (OXY plane).
	 */
	setPhiSelf(value: number, degrees = false): Vector {
		[ this.x, this.y, this.z ] = this.setPhi(value, degrees).toArray();
		return this;
	}

	/**
	 * Rotates the vector to a specific elevation angle and returns a new `Vector` instance.
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
	 * Rotates the current vector to a specific elevation angle.
	 */
	setThetaSelf(value: number, degrees = false): Vector {
		[ this.x, this.y, this.z ] = this.setTheta(value, degrees).toArray();
		return this;
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
	 * Scales this vector by a scalar value.
	 */
	scaleSelf(value: number): Vector {
		this.x *= value;
		this.y *= value;
		this.z *= value;

		return this;
	}

	/**
	 * Performs the subtraction and returns the sum as new `Vector` instance.
	 */
	sub(input: Input): Vector {
		return this.add(vector(input).inverted);
	}

	/**
	 * Subtracts another `Vector` instance or valid vector input from this vector.
	 */
	subSelf(x: Input | number, y?: number, z?: number): Vector {
		return this.addSelf(
			vector(x, y, z).scale(-1)
		);
	}

	/**
	 * Returns vector's components packed into array.
	 */
	toArray(): [ x: number, y: number, z: number ] {
		return [ this.x, this.y, this.z ];
	}

	/**
	 * Returns a `Vector` string representation.
	 */
	toString(): `(${number}, ${number}, ${number})` {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}

	/**
	 * Normalizes the original vector and returns the unit vector.
	 */
	get unit(): Vector {
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
	get valid(): boolean {
		return Boolean(this.parsed);
	}

	/**
	 * Converts the vector instance to primitive value - it's magnitude.
	 */
	valueOf(): number {
		return this.magnitude;
	}

	/**
	 * Makes the instance iterable.
	 */
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.z;
	}
}

/**
 * Creates an instance of 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export function vector(x?: Input | number, y?: number, z?: number): Vector {
	if (x instanceof Vector) {
		return x;
	}

	return new Vector(x, y, z);
}
