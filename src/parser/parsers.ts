import { round, deg2rad } from "../utils";
import { isCoords, isCoordsPolar, isCoordsTuple } from "./guards";
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
 * Parses a coordinates tuple.
 */
const parseCoordsTuple: Parser = coords => {
	if (!isCoordsTuple(coords)) {
		return null;
	}

	const [ x = 0, y = 0, z = 0 ] = coords;
	return [ x, y, z ];
};

export const parsers: Parser[] = [
	parseCoordsObject,
	parseCoordsTuple,
	parseCoordsPolar
];
