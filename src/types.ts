import type { Vector } from "./vector";

/**
 * Cartesian vector components.
 */
export type Component = "x" | "y" | "z";

/**
 * Vector state defined in Cartesian coordinate system.
 */
export interface Cartesian {
	x: number;
	y: number;
	z: number;
}

export type CartesianTuple = readonly [ x: number, y?: number, z?: number ];

/**
 * Vector state defined in Polar coordinate system:
 *   - `phi` - the polar angle;
 *   - `theta` - the azimuthal angle;
 */
export interface Polar {
	degrees?: boolean;
	magnitude: number;
	phi: number;
	theta: number;
}

/**
 * Vector state defined in Cylindrical coordinate system:
 * 	- r: radians distance;
 * 	- phi: azimuthal angle;
 * 	- z: height;
 */
export interface Cylindrical {
	degrees?: boolean;
	p: number;
	phi: number;
	z: number;
}

/**
 * Valid user input to build a Vector instance from.
 */
export type UserInput =
	| Partial<Cartesian>
	| Cylindrical
	| Partial<Polar>
	| CartesianTuple;

/**
 * Defines an input for operations where
 * Vector or user input that can be transformed into Vector instance.
 */
export type Input = UserInput | Vector;

/**
 * Defines a string representation of a vector.
 */
export type VectorString = `(${number}, ${number}, ${number})`;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser<T = UserInput> = (input: T) => CartesianTuple | null;
