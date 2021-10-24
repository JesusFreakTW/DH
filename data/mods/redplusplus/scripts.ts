/**
 * Gen 1 mechanics are fairly different to those we know on current gen.
 * Therefor we need to make a lot of changes to the battle engine for this game simulation.
 * This generation inherits all the changes from older generations, that must be taken into account when editing code.
 */

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	init() {
		const learnset = (learnsetChange: object) => {
			let moveChangeArray = [];
			let mon = "";
			let move = "";
			let sources = [];
			for(let i in learnsetChange) {
				moveChangeArray = learnsetChange[i].moveChanges;
				mon = learnsetChange[i].name;
				for(let j = 0; j <  moveChangeArray.length; j++) {
					move = moveChangeArray[j][0];
					sources = moveChangeArray[j][1];
					this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = sources;
				}
			}
		};
		const learnsetChanges = {
			charmander: {
				name: "charmander",
				moveChanges: [
				["honeclaws",["1L16"]]
				]
			}
		};
	}
};



//want to be able to just write charmander one time, then write moves and levels