import { RAD } from "./consts";
import { round } from "./utils";
import type { Cartesian, CartesianTuple, Cylindrical, ParseOutput, Polar } from "./types";
import { isValidNumber } from "./validators";

/**
 * Parses a cartesian coordinates object.
 */
export function parseCartesian(input: Cartesian): ParseOutput {
	const { x = 0, y = 0, z = 0 } = input;
	const valid = (
		isValidNumber(x) &&
		isValidNumber(y) &&
		isValidNumber(z)
	);

	return {
		input,
		output: [ x, y, z ],
		valid
	};
}

/**
 * Parses vector in polar coordinates.
 */
export function parsePolar(input: Polar): ParseOutput {
	const { degrees = false, magnitude = 1 } = input;
	let {
		phi = 0,
		theta = (degrees ? 90 : Math.PI / 2)
	} = input;

	if (degrees) {
		phi *= RAD;
		theta *= RAD;
	}

	const valid = (
		isValidNumber(magnitude) &&
		isValidNumber(phi) &&
		isValidNumber(theta)
	);

	return {
		input,
		output: [
			round(magnitude * Math.sin(theta) * Math.cos(phi), 12),
			round(magnitude * Math.sin(theta) * Math.sin(phi), 12),
			round(magnitude * Math.cos(theta), 12),
		],
		valid
	};
}

/**
 * Parses vector in cylindrical coordinates.
 */
export function parseCylindrical(input: Cylindrical): ParseOutput {
	const { degrees = false, p = 1, phi = 0, z = 0 } = input;
	const angle = degrees ? phi * RAD : phi;

	const valid = (
		isValidNumber(p) &&
		isValidNumber(phi) &&
		isValidNumber(z)
	);

	return {
		input,
		output: [
			p * Math.cos(angle),
			p * Math.sin(angle),
			z
		],
		valid
	};
}

/**
 * Parses a coordinates tuple.
 */
export function parseCartesianTuple(input: CartesianTuple): ParseOutput {
	const [ x = 0, y = 0, z = 0 ] = input;

	const valid = (
		isValidNumber(x) &&
		isValidNumber(y) &&
		isValidNumber(z)
	);

	return {
		input,
		output: [ x, y, z ],
		valid
	};
}

/**
 * Parses a coordinates tuple.
 */
export function parseCartesianArgs(x: number, y = 0, z = 0): ParseOutput {
	const valid = (
		isValidNumber(x) &&
		isValidNumber(y) &&
		isValidNumber(z)
	);

	return {
		input: [ x, y, z ],
		output: [ x, y, z ],
		valid
	};
}
