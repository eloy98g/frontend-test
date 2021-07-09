import React from "react";
import { observer } from "mobx-react";
import Box from "../components/Box";

function Canvas({ store }) {
  // Detect click on background to toggle selections
	function handleToggleSelection(e) {
		if (e.target.classList.contains("canva")) {
			store.removeSelection();
		}
	}

	return (
		<div className="canva" onClick={(e) => handleToggleSelection(e)}>
			{store.boxes.map((box, index) => (
				<Box
					id={box.id}
					key={index}
					color={box.color}
					width={box.width}
					height={box.height}
					box={box}
					selected={box.selected}
          store={store}
				/>
			))}
		</div>
	);
}

export default observer(Canvas);
