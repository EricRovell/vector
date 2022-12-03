import { round, deg2rad } from "../utils";
import { isCoords, isCoordsCylindrical, isCoordsPolar, isCoordsTuple } from "./guards";
import type { Parser } from "../types";

/**
 * Parses a coordinates object.
 */
const parseCoordsObject: Parser = coords => {
	if (isCoords(coords)) {
		const { x = 0, y = 0, z = 0 } = coords;
		return [ x, y, z ];
	}

	return null;
};

/**
 * Parses vector in polar coordinates.
 */
const parseCoordsPolar: Parser = coords => {
	if (!isCoordsPolar(coords)) {
		return null;
	}

	const { degrees = false, magnitude = 1 } = coords;
	let {
		phi = 0,
		theta = (degrees ? 90 : Math.PI / 2)
	} = coords;

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
export const parseCoordsCylindrical: Parser = coords => {
	if (!isCoordsCylindrical(coords)) {
		return null;
	}

	const { degrees = false, p = 1, phi = 0, z = 0 } = coords;
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
const parseCoordsTuple: Parser = coords => {
	if (!isCoordsTuple(coords)) {
		return null;
	}

	const [ x = 0, y = 0, z = 0 ] = coords;
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
	parseCoordsTuple,
	parseCoordsCylindrical,
	parseCoordsPolar,
	parseCoordsObject
];
