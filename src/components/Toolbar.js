import React from "react";
import Button from "./Button";
import { observer } from "mobx-react";

import uuid from "uuid/v4";
import getRandomColor from "../utils/getRandomColor";
import BoxModel from "../stores/models/Box";

function Toolbar({ store }) {
	function handleAddBox() {
		const box = BoxModel.create({
			id: uuid(),
			color: getRandomColor(),
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
		});

		store.addBox(box);
	}

	return (
		<div className="toolbar">
			<Button title="Add Box" onClick={handleAddBox} />
      <Button title="Undo" onClick={store.previousState} />
      <Button title="Redo" onClick={store.nextState} />
			{store.boxes.length > 0 && store.selectedBoxes > 0 && (
				<>
					<Button title={store.selectedBoxes > 1 ? "Remove Boxes" : "Remove Box"}onClick={store.removeBoxes} />
					<input
						type="color"
						onChange={(e) => store.changeBoxesColor(e.target.value)}
						style={{
							marginRight: "20px",
						}}
					/>
					<span>
						{store.selectedBoxes > 1
							? `${store.selectedBoxes} boxes selected`
							: `${store.selectedBoxes} box selected`}
					</span>
				</>
			)}
		</div>
	);
}

export default observer(Toolbar);
