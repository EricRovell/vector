import { round, deg2rad } from "../utils";
import { isCartesian, isCylindrical, isPolar, isCartesianTuple } from "./guards";
import type { Parser } from "../types";

/**
 * Parses a coordinates object.
 */
const parseCartesianObject: Parser = Cartesian => {
	if (isCartesian(Cartesian)) {
		const { x = 0, y = 0, z = 0 } = Cartesian;
		return [ x, y, z ];
	}

	return null;
};

/**
 * Parses vector in polar coordinates.
 */
const parsePolar: Parser = Cartesian => {
	if (!isPolar(Cartesian)) {
		return null;
	}

	const { degrees = false, magnitude = 1 } = Cartesian;
	let {
		phi = 0,
		theta = (degrees ? 90 : Math.PI / 2)
	} = Cartesian;

	if ([ magnitude, phi, theta ].some(value => typeof value !== "number" || Number.isNaN(value))) {
		return null;
	}

	if (degrees) {
		phi *= deg2rad;
		theta *= deg2rad;
	}

	return [
		round(magnitude * Math.sin(theta) * Math.cos(phi), 12),
		round(magnitude * Math.sin(theta) * Math.sin(phi), 12),
		round(magnitude * Math.cos(theta), 12),
	];
};

/**
 * Parses vector in cylindrical coordinates.
 */
const parseCylindrical: Parser = Cartesian => {
	if (!isCylindrical(Cartesian)) {
		return null;
	}

	const { degrees = false, p = 1, phi = 0, z = 0 } = Cartesian;
	const angle = degrees ? phi * deg2rad : phi;

	return [
		p * Math.cos(angle),
		p * Math.sin(angle),
		z
	];
};

/**
 * Parses a coordinates tuple.
 */
const parseCartesianTuple: Parser = Cartesian => {
	if (!isCartesianTuple(Cartesian)) {
		return null;
	}

	const [ x = 0, y = 0, z = 0 ] = Cartesian;
	return [ x, y, z ];
};

/**
 * The order is important!
 *
 * The cylindrical interface has intersection with cartesian - `z`,
 * and with spherical - `phi`, that's why all properties there are required
 * and that's why it is above cartesian and spherical.
 *
 * Cartesian and spherical have no intersection, so all properties are optional.
 */
export const parsers: Parser[] = [
	parseCartesianTuple,
	parseCylindrical,
	parsePolar,
	parseCartesianObject
];
