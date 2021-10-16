/**
 * Gen 1 mechanics are fairly different to those we know on current gen.
 * Therefor we need to make a lot of changes to the battle engine for this game simulation.
 * This generation inherits all the changes from older generations, that must be taken into account when editing code.
 */

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	init() {
		const learnset = (mon: string, move: string, sources: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = sources;
			}
		};
	learnset("charmander","honeclaws",["1L16"]);
	}
};