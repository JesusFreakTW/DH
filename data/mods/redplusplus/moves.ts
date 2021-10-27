/**
 * A lot of Gen 1 moves have to be updated due to different mechanics.
 * Some moves have had major changes, such as Bite's typing.
 */

export const Moves: {[k: string]: ModdedMoveData} = {
	karatechop: {
		inherit: true,
		type: "Fighting",
	},
	firepunch: {
		inherit: true,
		category: "Physical",
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
	triattack: {
		inherit: true,
		desc: "10% chance to paralyze or burn or freeze target.",
		shortDesc: "10% chance to paralyze or burn or freeze target.",
		secondary: {
			chance: 10,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
	},
	struggle: {
		inherit: true,
		desc: "If this move was successful, the user takes damage equal to 1/2 the HP lost by the target, rounded down, but not less than 1 HP. This move is automatically used if none of the user's known moves can be selected.",
		onModifyMove(move, pokemon, target) {
			move.type = '???';
			this.add('-activate', pokemon, 'move: Struggle');
		},
	},
	metalclaw: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	// ensure priority working properly
	bulletpunch: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	flashcannon: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
				spa: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's special by 1 stage.",
		shortDesc: "33% chance to lower the target's Special by 1.",
	},
	irontail: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	meteormash: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 90,
		accuracy: 90,
	},
	crunch: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 33,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Defense by 1 stage.",
		shortDesc: "33% chance to lower the target's Defense by 1.",
	},
	darkpulse: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
	},
	faintattack: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	nightslash: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	moonblast: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
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
	dracometeor: {
		inherit: true, 
		isNonstandard: null,
		gen: 1,
		basePower: 130,
		self: null,
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
	dragonbreath: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 10,
			status: 'par',
		},
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
	},
	dragonclaw: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	dragonpulse: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 85,
	},
	twister: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to flinch the target.",
		shortDesc: "10% chance to flinch the target.",
	},
	//3-4 or two to three turns? 3-4 for now for gen 1 consistency
	outrage: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 120,
		pp: 10,
		shortDesc: "Lasts 3-4 turns. Confuses the user afterwards.",
		desc: "Whether or not this move is successful, the user spends three or four turns locked into this move and becomes confused immediately after its move on the last turn of the effect, even if it is already confused. If the user is prevented from moving, the effect ends without causing confusion. During the effect, this move's accuracy is overwritten every turn with the current calculated accuracy including stat stage changes, but not to less than 1/256 or more than 255/256.",
	},
	shadowclaw: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	steelwing: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	irondefense: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	airslash: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		pp: 15,
	},
	firefang: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	flareblitz: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		recoil: [25, 100],
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		shortDesc: "Has 1/4 recoil.",
	},
	blastburn: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	icefang: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	thunderfang: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	waterpulse: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	aquatail: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 100,
	},
	hydrocannon: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	frenzyplant: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	// check priority
	suckerpunch: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 70,
		priority: 1,
	},
	shadowball: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
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
	flamewheel: {
		inherit: true,
		isNonstandard:null,
		gen: 1,
	},
	moonlight: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		type: "Fairy",
		desc: "The user restores 1/2 of its maximum HP, rounded down.",
		shortDesc: "Heals the user by 50% of its max HP.",
	},
	hex: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 65,
	},
	shadowpunch: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	aerialace: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	acrobatics: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 110,
		basePowerCallback() {},
	},
	aircutter: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 60,
		accuracy: 100,
	},
	icywind: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	iceshard: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	sheercold: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	electroball: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 80,
		basePowerCallback(pokemon, target) {
			let ratio = pokemon.getStat('spe') / target.getStat('spe');
			if (!isFinite(ratio)) ratio = 0;
			if(ratio < 1) {
				let ind = 0;
			} else if (ratio = 1) { 
				let ind = 1;
			} else {
				let ind = 2;
			}
			const bp = [60, 80, 120][ind];
			this.debug(`${bp} bp`);
			return bp;
		},
		desc: "The power of this move depends on the user's speed relative to the target. If the user is slower than the target, the base power is 120. If the speeds are equal, the base power is 80, and if the user is slower than the target, the base power is 60.",
	},
	nuzzle: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	discharge: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 10,
			status: 'par',
		},
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
	},
	volttackle: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		recoil: [25, 100],
		secondary: {
			chance: 10,
			status: 'par',
		},
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage. Has a 10% chance to paralyze target.",
		shortDesc: "Has 25% recoil. 10% chance to paralyze target.",
	},
	muddywater: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 33,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Accuracy by 1 stage.",
		shortDesc: "33% chance to lower the target's Accuracy by 1.",
	},
	whirlpool: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 35,
		accuracy: 85,
		volatileStatus: 'partiallytrapped',
		self: {
			volatileStatus: 'partialtrappinglock',
		},
		// FIXME: onBeforeMove(pokemon, target) {target.removeVolatile('mustrecharge')}
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['partiallytrapped']) {
				if (source.volatiles['partialtrappinglock'] && source.volatiles['partialtrappinglock'].duration > 1) {
					target.volatiles['partiallytrapped'].duration = 2;
				}
			}
		},
	},
	gigadrain: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 75,
		pp: 10,
	},
	petalblizzard: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	leafblade: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 90,
	},
	woodhammer: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		recoil: [25, 100],
		desc: "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded down, but not less than 1 HP. If this move breaks the target's substitute, the user does not take any recoil damage.",
		shortDesc: "Has 1/4 recoil.",
	},
	poisonjab: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 40,
			status: 'psn',
		},
		desc: "Has a 40% chance to poison the target.",
		shortDesc: "40% chance to poison the target.",
	},
	gunkshot: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 80,
		secondary: {
			chance: 40,
			status: 'psn',
		},
		desc: "Has a 40% chance to poison the target.",
		shortDesc: "40% chance to poison the target.",
	},
	poisonfang: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 40,
			status: 'psn',
		},
		desc: "Has a 40% chance to poison the target.",
		shortDesc: "40% chance to poison the target.",
	},
	sludgewave: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		pp: 15,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	bugbuzz: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
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
	megahorn: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	xscissor: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	earthpower: {
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
	mudslap: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 33,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Accuracy by 1 stage.",
		shortDesc: "33% chance to lower the target's Accuracy by 1.",
	},
	mudbomb: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		secondary: {
			chance: 33,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Accuracy by 1 stage.",
		shortDesc: "33% chance to lower the target's Accuracy by 1.",
	},
	extrasensory: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		pp: 20,
	},
	zenheadbutt: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 100,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
	},
	psychocut: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	hypervoice: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	extremespeed: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		priority: 1,
	},
	gigaimpact: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	powergem: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 80,
	},
	rockblast: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 95,
	},
	rockpolish: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	rocktomb: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 60,
		accuracy: 95,
		pp: 15,
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		shortDesc: "33% chance to lower the target's Speed by 1.",
	},
	dynamicpunch: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 60,
		accuracy: 90,
	},
	//check crit ratio for stormthrow (supposed to always crit)
	//check crit
	crosschop: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 85,
	},
	lowsweep: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 65,
	},
	hurricane: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		basePower: 110,
		accuracy: 85,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	babydolleyes: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		priority: 1,
	},
	bonerush: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 90,
	},
	// check crit
	aeroblast: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
		accuracy: 100,
	},
	ancientpower: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
	},
	dive: {
		inherit: true,
		isNonstandard: 'Illegal',
		gen: 1,
		basePower: 80,
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: null,
		gen: 1,
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
	mindblast: {
		num: 827,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		isNonstandard: null,
		name: "Mind Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
};