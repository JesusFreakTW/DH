/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

export const Moves: {[k: string]: ModdedMoveData} = {
	karatechop: {
		inherit: true,
		type: "Fighting",
	},
	razorwind: {
		inherit: true,
		accuracy: 100,
	},
	gust: {
		inherit: true,
		type: "Flying",
	},
	wingattack: {
		inherit: true,
		basePower: 60,
	},
	whirlwind: {
		inherit: true,
		accuracy: 100,
	},
	fly: {
		inherit: true,
		basePower: 90,
	},
	bind: {
		inherit: true,
		accuracy: 85,
	},
	vinewhip: {
		inherit: true,
		basePower: 45,
		pp: 25,
	},
	jumpkick: {
		inherit: true,
		basePower: 100,
		pp: 10,
	},
	sandattack: {
		inherit: true,
		type: "Ground",
	},
	tackle: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
	},
	wrap: {
		inherit: true,
		accuracy: 90,
	},
	thrash: {
		inherit: true,
		basePower: 120,
		pp: 10,
	},
	doubleedge: {
		inherit: true,
		basePower: 120,
	},
	pinmissile: {
		inherit: true,
		basePower: 25,
		accuracy: 95,
	},
	bite: {
		inherit: true,
		type: "Dark",
	},
	disable: {
		inherit: true,
		accuracy: 100,
	},
	acid: {
		inherit: true,
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
				spa: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Special by 1 stage.",
		shortDesc: "33% chance to lower the target's Special by 1.",
	},
	flamethrower: {
		inherit: true,
		basePower: 90,
	},
	hydropump: {
		inherit: true,
		basePower: 110,
	},
	surf: {
		inherit: true,
		basePower: 90,
	},
	icebeam: {
		inherit: true,
		basePower: 90,
	},
	blizzard: {
		inherit: true,
		basePower: 110,
		accuracy: 70,
	},
	absorb: {
		inherit: true,
		pp: 25,
	},
	megadrain: {
		inherit: true,
		pp: 15,
	},
	growth: {
		inherit: true,
		desc: "Raises the user's Attack and Special by 1 stage.",
		shortDesc: "Raises the user's Attack and Special by 1.",
		pp: 20,
		boosts: {
			spa: 1,
			spd: 1,
			atk: 1,
		},
	},
	solarbeam: {
		inherit: true,
		basePower: 200,
	},
	petaldance: {
		inherit: true,
		basePower: 120,
	},
	firespin: {
		inherit: true,
		basePower: 35,
		accuracy: 85,
	},
	thunderbolt: {
		inherit: true,
		basePower: 90,
	},
	thunderwave: {
		inherit: true,
		accuracy: 90,
	},
	thunder: {
		inherit: true,
		basePower: 110,
	},
	rockthrow: {
		inherit: true,
		accuracy: 90,
	},
	dig: {
		inherit: true,
		basePower: 80,
	},
	toxic: {
		inherit: true,
		accuracy: 90,
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	minimize: {
		inherit: true,
		pp: 10,
	},
	barrier: {
		inherit: true,
		pp: 20,
	},
	metronome: {
		inherit: true,
		noMetronome: ["Metronome", "Struggle","Dive"],
	},
	selfdestruct: {
		inherit: true,
		basePower: 200,
	},
	lick: {
		inherit: true,
		basePower: 30,
	},
	smog: {
		inherit: true,
		basePower: 30,
	},
	fireblast: {
		inherit: true,
		basePower: 110,
	},
	clamp: {
		inherit: true,
		accuracy: 85,
		pp: 15,
	},
	skullbash: {
		inherit: true,
		basePower: 130,
		pp: 10,
	},
	hijumpkick: {
		inherit: true,
		basePower: 130,
		pp: 10,
	},
	glare: {
		inherit: true,
		accuracy: 100,
	},
	poisongas: {
		inherit: true,
		accuracy: 90,
	},
	leechlife: {
		inherit: true,
		basePower: 80,
		pp: 10,
	},
	skyattack: {
		inherit: true,
		basePower: 200,
	},
	bubble: {
		inherit: true,
		basePower: 40,
	},
	dizzypunch: {
		inherit: true,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	flash: {
		inherit: true,
		accuracy: 100,
	},
	psywave: {
		inherit: true,
		accuracy: 100,
	},
	acidarmor: {
		inherit: true,
		pp: 20,
	},
	crabhammer: {
		inherit: true,
		basePower: 100,
		accuracy: 90,
	},
	explosion: {
		inherit: true,
		basePower: 250,
	},
	rockslide: {
		inherit: true,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
	},
	honeclaws: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
};
