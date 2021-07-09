import React from "react";

function Button ({ onClick, title }) {
	return (
		<div
			className="button"
			style={{
				padding: "10px",
				background: "white",
				border: "1px solid #000000",
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '20px'
			}}
      onClick={onClick}
		>
			{title}
		</div>
	);
};

export default Button;
