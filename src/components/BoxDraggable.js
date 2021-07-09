import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import interact from "interactjs";

function BoxDraggable(props) {
	const ref = useRef();
	const [firstRender, setFirstRender] = useState(false);

  // Because when the component is mounted, ref is null, we need
  // a first render to get the reference
	useEffect(() => {
		setFirstRender(true);
	}, [firstRender]);

	if (ref.current) {
		interact(ref.current).draggable({
			modifiers: [
				interact.modifiers.restrictRect({
					restriction: "parent",
					endOnly: true,
				}),
			],
			autoScroll: true,
			listeners: {
				move: dragMoveListener,
				end: props.store.saveSnapshot,
			},
		});
	}

	function dragMoveListener(event) {
		const target = event.target;
    const newX = props.box.x + event.dx;
    const newY = props.box.y + event.dy;
		props.box.setCoords(newX, newY);
		target.style.transform = "translate(" + newX + "px, " + newY + "px)";
	}

	return (
		<div
			id={props.id}
			ref={ref}
			className="box"
			onClick={props.box.toggleSelect}
			style={{
				cursor: "pointer",
				backgroundColor: props.color,
				width: props.width,
				height: props.height,
				zIndex: "1",
				transform: `translate(${props.box.x}px, ${props.box.y}px)`,
				borderRadius: "10px",
				border: props.selected ? "2px solid black" : "2px solid transparent",
			}}
		>
			{props.children}
		</div>
	);
}

export default observer(BoxDraggable);
