/**
 * Gen 1 mechanics are fairly different to those we know on current gen.
 * Therefor we need to make a lot of changes to the battle engine for this game simulation.
 * This generation inherits all the changes from older generations, that must be taken into account when editing code.
 */

import { consoleips } from "../../../config/config-example";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	init() {
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) {
				console.log(i);
			}
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = Dex.mod('gen6').modData('Moves',i).category;
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
			newCategory = '';
		}
	},
};
