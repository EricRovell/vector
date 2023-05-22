import { parse } from "./parser";
import type { Component, Input, UserInput } from "./types";
import { ceil, clamp, convertAngle, floor, round } from "./utils";

/**
 * A class to describe a 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export class Vector {
	private readonly parsed: ReturnType<typeof parse>;
	x: number;
	y: number;
	z: number;

	constructor(x?: UserInput | number, y?: number, z?: number) {
		this.parsed = parse(x, y, z);
		const [ vx = 0, vy = 0, vz = 0 ] = this.parsed ?? [];
		this.x = vx;
		this.y = vy;
		this.z = vz;
	}

	/**
	 * Performs the addition and returns the sum as new `Vector` instance.
	 */
	add(x?: UserInput | number, y?: number, z?: number): Vector {
		const other = vector(x, y, z);
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
	 * Calculates the angle between the vector instance and another valid vector input.
	 * The angle can be signed if `signed` boolean argument is passed.
	 * 
	 * Note: this method do not accept simple arguments input,
	 * because it is hard to manage angle options and make the code simple.
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
	 * Rounds this vector's components values to the next upper bound with defined precision.
	 */
	ceilSelf(places = 0): Vector {
		return this.mapSelf(value => ceil(value, places));
	}

	/**
	 * Clamps this vector's component values between an upper and lower bound.
	 */
	clamp(min = 0, max = 1): Vector {
		return this.mapSelf(value => clamp(value, min, max));
	}

	/**
	 * Returns a copy of the vector instance.
	 */
	copy(): Vector {
		return new Vector([ this.x, this.y, this.z ]);
	}

	/**
	 * Calculates the cross product between the instance and another valid vector input and returns a new `Vector` instance.
	 */
	cross(x?: UserInput | number, y?: number, z?: number): Vector {
		const other = vector(x, y, z);
		return new Vector([
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		]);
	}

	/**
	 * Sets this vector to the cross product between the original vector and another valid input.
	 */
	crossSelf(x?: UserInput | number, y?: number, z?: number): Vector {
		const other = vector(x, y, z);
		[ this.x, this.y, this.z ] = [
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		];

		return this;
	}

	/**
	 * Calculates the Euclidian distance between the vector
	 * and another valid vector input, considering a point as a vector.
	 */
	distance(x?: UserInput | number, y?: number, z?: number): number {
		return this.distanceSq(x, y, z) ** 0.5;
	}

	/**
	 * Calculates the squared Euclidian distance between the vector
	 * and another valid vector input, considering a point as a vector.
	 *
	 * Slighty more efficient to calculate, useful to comparing.
	 */
	distanceSq(x?: UserInput | number, y?: number, z?: number): number {
		const other = vector(x, y, z);
		return (
			(this.x - other.x) ** 2 +
			(this.y - other.y) ** 2 +
			(this.z - other.z) ** 2
		);
	}

	/**
	 * Calculates the dot product of the vector and another valid vector input.
	 */
	dot(x?: UserInput | number, y?: number, z?: number): number {
		const other = vector(x, y, z);
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	/**
	 * Performs an equality check against another valid vector input.
	 */
	equals(x?: UserInput | number, y?: number, z?: number): boolean {
		const other = vector(x, y, z);
		return (
			this.x === other.x &&
			this.y === other.y &&
			this.z === other.z
		);
	}

	/**
	 * Rounds this vector's components values to the next lower bound with defined precision.
	 */
	floorSelf(places = 0): Vector {
		return this.mapSelf(value => floor(value, places));
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
	 * 
	 * Note: this method do not accept simple arguments input.
	 */
	lerp(input: Input, coef = 1): Vector {
		const other = vector(input);
		const factor = clamp(coef);
		return new Vector([
			this.x + (other.x - this.x) * factor,
			this.y + (other.y - this.y) * factor,
			this.z + (other.z - this.z) * factor
		]);
	}

	/**
	 * Limits the magnitude of the vector and returns the result as new `Vector` instance.
	 */
	limit(value: number): Vector {
		if (value <= 0) {
			return this.setMagnitude(0);
		}

		return this.magnitudeSq < value ** 2
			? this
			: this.setMagnitude(value);
	}

	/**
	 * Limits the magnitude of this vector and returns itself.
	 */
	limitSelf(value: number): Vector {
		if (value <= 0) {
			return this.setMagnitudeSelf(0);
		}

		if (this.magnitudeSq < value ** 2) {
			return this;
		}

		return this.setMagnitudeSelf(value);
	}

	/**
	 * Calculates the magnitude of the vector.
	 */
	get magnitude(): number {
		return this.magnitudeSq ** 0.5;
	}

	/**
	 * Calculates the squared magnitude of the vector.
	 * It may be useful and faster where the real value is not that important.
	 * For example, to compare two vectors' length.
	 */
	get magnitudeSq(): number {
		return this.x ** 2 + this.y ** 2 + this.z ** 2;
	}

	/**
	 * Calls a defined callback on every vector component and returns a new `Vector` instance.
	 */
	map(fn: (value: number) => number): Vector {
		const components = this
			.toArray()
			.map(value => fn(value));

		return new Vector(...components);
	}

	/**
	 * Calls a defined callback on each of this vector component and returns itself.
	 */
	mapSelf(fn: (value: number) => number): Vector {
		[ this.x, this.y, this.z ] = this
			.toArray()
			.map(value => fn(value));

		return this;
	}

	/**
	 * Normalizes the vector and returns a new `Vector` instance as [unit vector](https://en.wikipedia.org/wiki/Unit_vector):
	 */
	normalize(): Vector {
		return this.scale(this.magnitude, true);
	}

	/**
	 * Makes the current vector a [unit vector](https://en.wikipedia.org/wiki/Unit_vector).
	 */
	normalizeSelf(): Vector {
		return this.scaleSelf(this.magnitude, true);
	}

	/**
	 * Creates a new planar vector from a random azimuthal angle.
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
	reflect(x?: UserInput | number, y?: number, z?: number): Vector {
		const surface = vector(x, y, z).normalize();
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
	 * Rounds this vector's component values to the closest bound with defined precision.
	 */
	roundSelf(places = 0): Vector {
		return this.mapSelf(value => round(value, places));
	}

	/**
	 * Performs the scalar multiplication and returns as new `Vector` instance.
	 * 
	 * The second parameter turns the passed `value` into reciprocal, in other words the division will be performed.
	 * Although the same effect can be obtained just with `.scale(0.5)`, it is useful when the variable may have zero value.
	 * In case of zero division the zero vector will be returned and marked as invalid.
	 */
	scale(value: number, inverse = false): Vector {
		if (inverse && !value) {
			console.warn("Division by zero!");
			// @ts-expect-error return vector marked as invalid
			return vector(null);
		}

		if (inverse) {
			value = 1 / value;
		}

		return this.map(item => item * value);
	}

	/**
	 * Scales this vector by a scalar value.
	 * 
	 * The second parameter turns the passed `value` into reciprocal, in other words the division will be performed.
	 * It is useful when the variable may have zero value.
	 * In this case the vector components won't change.
	 */
	scaleSelf(value: number, inverse = false): Vector {
		if (inverse && !value) {
			console.warn("Division by zero!");
			return this;
		}

		if (inverse) {
			value = 1 / value;
		}

		return this.mapSelf(item => item * value);
	}

	/**
	 * Set's the current vector state from another `Vector` instance or valid vector input.
	 */
	setSelf(x: Input | number, y?: number, z?: number): Vector {
		[ this.x, this.y, this.z ] = vector(x, y, z).toArray();
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
		return this.normalize().scale(value);
	}

	/**
	 * Sets the magnitude of this vector and returns itself.
	 */
	setMagnitudeSelf(value: number): Vector {
		return this
			.normalizeSelf()
			.scaleSelf(Math.abs(value));
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
	 * Performs the subtraction and returns the sum as new `Vector` instance.
	 */
	sub(x: Input | number, y?: number, z?: number): Vector {
		return this.add(vector(x, y, z).inverted);
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

	[Symbol.toPrimitive](hint: "number" | "string" | "default") {
		if (hint === "string") {
			return this.toString();
		}

		return this.valueOf();
	}

	get [Symbol.toStringTag]() {
		return "Vector";
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
