import { parse } from "./parser";
import type { InputUser, Input } from "./types";

/**
 * A class to describe a 2 or 3-dimensional vector,
 * specifically a Euclidean (also known as geometric) vector.
 */
export class Vector {
	private readonly parsed: ReturnType<typeof parse>;
	readonly x: number;
	readonly y: number;
	readonly z: number;
	private readonly planar: boolean;

	constructor(input?: InputUser) {
		this.parsed = parse(input);
		const [ x = 0, y = 0, z = 0 ] = this.parsed ?? [];
		this.x = x;
		this.y = y;
		this.z = z;
		this.planar = (z === 0);
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
	 * Returns a `Vector` string representation.
	 */
	toString() {
		return `(${this.x}, ${this.y}, ${this.z})`;
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
