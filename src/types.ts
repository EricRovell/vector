import type { Vector } from "./vector";

/**
 * Vector components.
 */
export type Component = "x" | "y" | "z";

export interface Coords {
	x: number;
	y: number;
	z: number;
}

export type CoordsTuple = readonly [ x: number, y?: number, z?: number ];

/**
 * Vector defined in polar coordinates:
 *   - `phi` is the polar angle;
 *   - `theta` is the azimuthal angle;
 */
export interface CoordsPolar {
	magnitude: number;
	phi: number;
	theta: number;
	degrees: boolean;
}

/**
 * Vector defined in Cylindrical coordinates:
 * 	- r: radias distance;
 * 	- phi: azimuthal angle;
 * 	- z: height;
 */
export interface CoordsCylindrical {
	degrees?: boolean;
	p: number;
	phi: number;
	z: number;
}

/**
 * Valid user input to build a Vector from.
 */
export type InputUser =
	| Partial<Coords>
	| CoordsCylindrical
	| Partial<CoordsPolar>
	| CoordsTuple;

/**
 * Defines an input for operations where
 * Vector or user input that can be transformed to Vector instance.
 */
export type Input = InputUser | Vector;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser<T = InputUser> = (input: T) => CoordsTuple | null;
