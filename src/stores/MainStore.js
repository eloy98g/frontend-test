import { types, applySnapshot, getSnapshot } from "mobx-state-tree";
import BoxModel from "./models/Box";

// states is used to save the states of the store
var states = [];

// Before anything, we look for data in the local storage 
if (localStorage.getItem("MainStore")) {
	states = [JSON.parse(localStorage.getItem("MainStore"))];
}

// currentFrame is used to make movement easier between the states history
var currentFrame = states.length - 1;

const MainStore = types
	.model("MainStore", {
		boxes: types.array(BoxModel),
	})
	.actions((self) => {
		function saveSnapshot() {
			currentFrame++;

			// We identify if we are in a "past" state so that, if a new 
      // action "x" is carried out in said past, all "future" actions
      // that happened after action "x" would be deleted
			if (currentFrame < states.length) {
				states.splice(currentFrame);
			}
      
      // New state added and saved locally
			states.push(getSnapshot(self));
			localStorage.setItem("MainStore", JSON.stringify(getSnapshot(self)));
		}
		return {
			addBox(box) {
				self.boxes.push(box);
				saveSnapshot();
			},
			removeBoxes() {
				self.boxes = self.boxes.filter((e) => e.selected === false);
				saveSnapshot();
			},
			removeSelection() {
				self.boxes.forEach(
					(box) => box.selected === true && box.toggleSelect()
				);
			},
			changeBoxesColor(color) {
				self.boxes.forEach(
					(box) => box.selected === true && box.setColor(color)
				);
				saveSnapshot();
			},
			previousState() {
				// Detect possible undo error when trying to go beyond created states
				if (currentFrame <= 0) return;

				// Get previous snapshot state and apply it as the current state
				currentFrame--;
				applySnapshot(self, states[currentFrame]);

				// Save state locally
				localStorage.setItem("MainStore", JSON.stringify(states[currentFrame]));
			},
			nextState() {
				// detect possible redo error when trying to go beyond created states
				if (currentFrame === states.length - 1) return;

        // Get nest snapshot state and apply it as the current state
				currentFrame++;
				applySnapshot(self, states[currentFrame]);

				// Save state locally
				localStorage.setItem("MainStore", JSON.stringify(states[currentFrame]));
			},
			saveSnapshot,
		};
	})
	.views((self) => ({
		get selectedBoxes() {
			return self.boxes.filter((box) => box.selected === true).length;
		},
	}));

const store = MainStore.create(states[0]);

export default store;
