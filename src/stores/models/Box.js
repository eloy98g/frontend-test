import { types } from "mobx-state-tree";

const BoxModel = types
	.model("Box", {
		id: types.identifier,
		width: 200,
		height: 100,
		color: "#FFF000",
		x: types.number,
		y: types.number,
		selected: false,
	})
	.views((self) => ({}))
	.actions((self) => {
		return {
			toggleSelect() {
				self.selected = !self.selected;
			},
			setColor(newColor) {
				self.color = newColor;
			},
			setCoords(x, y) {
				self.x = x;
				self.y = y;
			},
		};
	});

export default BoxModel;
