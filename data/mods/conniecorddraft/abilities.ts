export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	chickenout: {
		shortDesc: "When its HP reaches 0, this Pokémon retreats to the party, and then...",
		name: "Chicken Out",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.headless) {
				pokemon.setAbility('wonderguard');
				pokemon.baseAbility = 'wonderguard';
				pokemon.ability = 'wonderguard';
				pokemon.headless = false;
				pokemon.switchedIn = undefined;
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.baseSpecies === 'Poultergeist' && !pokemon.transformed && !pokemon.headless && this.canSwitch(pokemon.side)) {
				if (pokemon.formeChange('Poultergeist-Headless', this.effect, true)) {
					this.add('-ability', pokemon, 'Chicken Out');
					this.add('-message', `${pokemon.name} ran off somewhere...`);
					pokemon.headless = true;
					pokemon.maxhp = 1;
					pokemon.hp = 1;
				}
			}
		},
		isUnbreakable: true,
		isPermanent: true,
		rating: 5,
		num: -1001,
	},
	dialogue: {
		name: "Dialogue",
		num: -1002,
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				const additionalBannedAbilities = [
					'noability', 'contrary', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'wonderguard',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) continue;
				const oldAbility = target.setAbility('contrary');
				if (oldAbility) {
					this.add('-ability', target, 'Contrary', '[from] Ability: Dialogue', '[of] ' + pokemon);
					return;
				}
			}
		},
		shortDesc: "On entry, changes the Abilities of all adjacent Pokémon to Contrary.",
	},
	frozenpower: {
		name: "Frozen Power",
		num: -1003,
		onBoost(boost, target, source, effect) {
			if (!this.field.isWeather('hail')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Frozen Power", "[of] " + target);
			}
		},
		shortDesc: "In Hail, this Pokémon's stats cannot be lowered.",
	},
	permafrost: {
		name: "Permafrost",
		num: -1004,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Permafrost', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		shortDesc: "On switch-in, this Pokémon lowers the Speed of adjacent opponents by 1 stage.",
	},
	grampandemonium: { // have yet to account for sacrificial KOs
		name: "Grampandemonium",
		num: -1005,
		onStart(pokemon) {
			console.log("Allies: " + pokemon.side.pokemon);
			console.log("Fainted allies: " + pokemon.side.pokemon.filter(ally => ally.fainted));
			console.log("NFE allies: " + pokemon.side.pokemon.filter(ally => ally.baseSpecies.nfe));
			let allies = pokemon.side.pokemon.filter(ally => ally.fainted && ally.baseSpecies.nfe);
			console.log("Fainted NFE allies: " + allies);
			console.log("Stages to boost: " + allies.length);
			if (allies.length) {
				console.log("Should be boosting by that many stages");
				this.boost({spa: allies.length}, pokemon);
			} else {
				console.log("No fainted NFE allies");
			}
		},
		desc: "On switch-in, this Pokemon gets +1 SpA for every NFE ally that is KOed. Self-KOs, e.g. Life Orb recoil or sacrificial moves such as Explosion or Memento, do not trigger this.",
		shortDesc: "+1 SpA on switch-in for every fainted NFE in the party.",
	},
	stonilate: {
		name: "Stonilate",
		num: -1006,
		shortDesc: "Normal attacks become Rock; 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Rock';
				move.refrigerateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.refrigerateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
	},
	shpeedforce: {
		name: "Shpeed Force",
		num: -1007,
		shortDesc: "Electric power 1.5x. At the end of each turn, +1 Spe.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
	},
	viciousjaw: {
		name: "Vicious Jaw",
		num: -1008,
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onSourceHit(target, source, move) {
			if (!move || !target || !target.hp) return;
			if (target !== source && move.flags['bite']) {
				target.addVolatile('viciousjaw');
			}
		},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name}'s bite is bleeding!`);
				this.add('-start', pokemon, 'ability: Vicious Jaw', '[silent]');
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
			},
			onEnd(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
				this.add('-end', pokemon, 'ability: Vicious Jaw', '[silent]');
			},
		},
		shortDesc: "Biting moves: 1.25x damage, inflict Bleed (1/16 max HP for 4 turns).",
	},
	playtime: {
		name: "Playtime",
		num: -1009,
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) {
				return this.chainModify(0.25);
				this.add('-message', "Koda wants to play too!");
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		desc: "This Pokémon's damaging moves become multi-hit moves that hit twice. The second hit has its damage quartered. Does not affect multi-hit moves or moves that have multiple targets.",
		shortDesc: "This Pokémon's damaging moves hit twice. The second hit has its damage quartered.",
	},
	inversionwarp: {
		name: "Inversion Warp",
		num: -1010,
		onStart(source) {
			this.field.addPseudoWeather('inversionwarp');
		},
		condition: {
			duration: 5,
			onEffectiveness(typeMod, target, type, move) {
				if (move && this.dex.getImmunity(move, type) === false) return 1;
				return typeMod * -1;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Inversion Warp', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('inversionwarp');
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Inversion Warp');
			},
		},
		shortDesc: "5 turns: Type effectiveness is inverted.",
	},
	damagewarp: {
		name: "Damage Warp",
		num: -1011,
		onStart(source) {
			this.field.addPseudoWeather('damagewarp');
		},
		condition: {
			duration: 5,
			onStart(target, source) {
				this.add('-fieldstart', 'move: Damage Warp', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('damagewarp');
			},
			onModifyAtk(atk, pokemon) {
				return pokemon.getStat('def', false, true);
			},
			onModifyDef(def, pokemon) {
				return pokemon.getStat('atk', false, true);
			},
			onModifySpA(spa, pokemon) {
				return pokemon.getStat('spd', false, true);
			},
			onModifySpD(spd, pokemon) {
				return pokemon.getStat('spa', false, true);
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Damage Warp');
			},
		},
		shortDesc: "5 turns: Atk is swapped for Def, Sp. Atk for Sp. Def.",
	},
	epipelagicdeity: {
		name: "Epipelagic Deity", 
		num: -1012,
		onModifySpe(spe, pokemon) {
			const action = this.queue.willMove(pokemon);
			const move = action?.choice === 'move' ? action.move : null;
			if (move && move.type === 'Water') {
				return spe * 1.1;
			}
		},
		shortDesc: "This Pokémon's Spe is 1.1x on a turn where it selects a Water-type move.",
	},
	bathypelagicdeity: {
		name: "Bathypelagic Deity",
		num: -1013,
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Bathypelagic Deity boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		shortDesc: "This Pokémon's attacks have 1.3x power if it is the last to move in a turn.",
	},
	mesopelagicdeity: {
		name: "Mesopelagic Deity",
		num: -1014,
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if ((defender.hp <= defender.maxhp / 2) && (move.type === 'Water')) {
				this.debug('Mesopelagic Deity boost');
				return this.chainModify(1.2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if ((defender.hp <= defender.maxhp / 2) && (move.type === 'Water')) {
				this.debug('Mesopelagic Deity boost');
				return this.chainModify(1.2);
			}
		},
		shortDesc: "This Pokémon's attacks have 1.2x power against foes under 1/2 health.",
	},
	venomdrain: {
		name: "Venom Drain",
		num: -1015,
		onAnyDamage(damage, target, source, effect) {
			if (effect && (effect.id === 'tox' || effect.id === 'psn')) {
				if (damage > 0) {
					this.heal(damage / 2, this.effectData.target, target);
				}
			}
		},
		desc: "If another Pokémon is poisoned, heals 1/2 the damage taken from that poison.",
	},
	
	//Misc
	returnfire: {
		name: "Return Fire",
		num: -1016,
		desc: "When this Pokemon is targeted by a ballistic move, attacker loses 1/8 max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['bullet']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
	},
	thorngrowth: {
		name: "Thorn Growth",
		num: -1018,
		desc: "On entry, summons a room that turns contact moves into 1/4 recoil moves for 5 turns.",
		pseudoWeather: 'thorngrowth',
		onStart(source) {
			this.field.addPseudoWeather('thorngrowth');
		},
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'ability: Thorn Growth', '[of] ' + source);
			},
			onModifyMove(move) {
				if (move.flags['contact'] && !move.recoil) {
					move.recoil = [25, 100];
				}
			},
			onEnd() {
				this.add('-fieldend', 'ability: Thorn Growth');
			},
		},
	},
	arborous: {
		name: "Arborous",
		num: -1019,
		desc: "This Pokemon is immune to Bug and Flying when over 1/2 max HP.",
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Bug' || move.type === 'Flying') && (target.hp > target.maxhp/2)) {
				this.add('-immune', target, '[from] ability: Arborous');
				return null;
			}
		},
	},
	figurehead: {
		desc: "This Pokémon moves first in its priority bracket when it is the target of a super effective attack.",
		shortDesc: "Moves first in its priority bracket when targeted with a super effective attack.",
		onUpdate(pokemon) { // if this doesn't work, replace with onUpdate - trying to avoid checking 500 times since it shouldn't need to change mid-turn
			for (const attacker of pokemon.side.foe.active) {
				if (!attacker || attacker.fainted) continue;
				const action = this.queue.willMove(attacker);
				if (!action) return;
				const move = this.dex.getMove(action.move);
				if (move.category === 'Status') continue;
				const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
				if (!target) return; // unfortunately not sure how to make this play nice with doubles ._. that feels like the biggest obstacle
				const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
				if (
					this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
					move.ohko
				) {
					pokemon.addVolatile('figurehead');
					return;
				}
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				const action = this.queue.willMove(pokemon);
				if (action) {
					this.add('-ability', pokemon, 'Figurehead');
					this.add('-message', `${pokemon.name} prepared to move immediately!`);
				}
			},
			onModifyPriority(priority) {
				return priority + 0.1;
			},
		},
		name: "Figurehead",
		rating: 3,
		num: -1020,
	},
	saturation: {
		name: "Saturation",
		num: -1021,
		shortDesc: "Takes 1/2 damage from poisoned foes.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (source && (source.status === 'psn' || source.status === 'tox')) {
				mod /= 2;
			}
			return this.chainModify(mod);
		},
	},
	jester: {
		name: "Jester",
		desc: "Moves of 60 or less power: +1 priority. Dark-types are immune.",
		num: -1022,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.category !== 'Status' && move.basePower <= 60) {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	bananatrap: {
		name: "Banana Trap",
		desc: "Prevents adjacent opposing Grass-types from choosing to switch.",
		num: -1023,
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Grass') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Grass')) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	trickster: {
		name: "Trickster",
		desc: "Status moves have -1 priority but are used twice.",
		num: -1024,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				return priority - 1;
			}
		},
		onBeforeMove(target, source, move) {
			if (move.category === 'Status') {
				//this.add('-activate', source, 'ability: Trickster');
				this.useMove(move, target, source);
			}
		},
	},
	arcaneswitch: {
		name: "Arcane Switch",
		desc: "If Cobroom: Changes to Alchemist form before using Poison move; to Sorcerer before using Dark move.",
		num: -1025,
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Cobroom' || attacker.transformed) return;
			if (move.type !== 'Poison' && move.type !== 'Dark') return;
			const targetForme = (move.type === 'Poison' ? 'Cobroom' : 'Cobroom-Sorcerer');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
		},
		isPermanent: true,
	},
	truegrowth: {
		name: "True Growth",
		isPermanent: true,
		desc: "If Cozminea: Changes to True form after using Hyperspace Hole.",
		num: -1026,
		onSourceAfterMoveSecondary(target, source, move) {
			if (move.id !== 'hyperspacehole' || source.species.baseSpecies !== 'Cozminea' || source.transformed) return;
			if (source.species.name !== 'Cozminea-True') { 
				source.formeChange('Cozminea-True', this.effect, true, '[silent]');
				this.add('-message', `${source.name} revealed its true forme!`);
				const species = this.dex.getSpecies(source.species.name);
				const abilities = species.abilities;
				const baseStats = species.baseStats;
				const type = species.types[0];
				if (species.types[1]) {
					const type2 = species.types[1];
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				} else {
					this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
				}
			}
		},
	},
	//thanks Kero!
	befriend: {
		name: "Befriend",
		isPermanent: true,
		desc: "If Fauxrend: Changes to Nightmare form before using SE move; to Daydream before using NVE move or switching out.",
		num: -1027,
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Fauxrend' || attacker.transformed) return;
			if (defender.runEffectiveness(move) == 0) return;
			const targetForme = (defender.runEffectiveness(move) < 0 ? 'Fauxrend' : 'Fauxrend-Nightmare');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
	},
	
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging', 'abysseelgulping', 'abysseelgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping' || target.species.id === 'abysseelgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange(target.species.baseSpecies, move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpmissile') &&
				(source.species.name === 'Cramorant' || source.species.name === 'Abysseel') && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'gorging' : 'gulping';
				source.formeChange(source.species.name + forme, effect);
			}
		},
	},
	
	twopressured: {
		name: "Two Pressured",
		desc: "This Pokemon's water moves have -1 priority, but hit twice at 2/3 power.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Water') {
				return priority - 1;
			}
		},
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.type === 'Water' && !move.isZ && !move.isMax) {
				move.multihit = 2;
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Water') return this.chainModify(2/3);
		},
	},

	pounce: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it lowers the Defense of adjacent opponents.",
		shortDesc: "Hazard immunity. Lowers adjacent opponents' Defense by 1 stage if switched in on them.",
		onSwitchIn(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !this.isAdjacent(target, pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({def: -1}, target, pokemon, null, true);
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Pounce",
		rating: 4,
		num: -1029,
	},
};
