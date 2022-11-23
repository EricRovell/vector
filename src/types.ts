import type { Vector } from "./vector";

export interface Coords {
	x: number;
	y: number;
	z: number;
}

export type CoordsTuple = readonly [ x: number, y?: number, z?: number ];

/**
 * Valid user input to build a Vector from.
 */
export type InputUser =
	| Partial<Coords>
	| CoordsTuple;

/**
 * Defines an input for operations where
 * Vector or user input that can be transformed to Vector instance.
 */
export type Input = InputUser | Vector;

/**
 * Parser function that attempts to produce a Ratio.
 */
export type Parser<T = Input> = (input: T) => CoordsTuple | null;
