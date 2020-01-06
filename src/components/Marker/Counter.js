import React from "react";

export default function Counter(props) {
	return (
		props.points.length > 1?
			<div className={'counter'}>
				
				{props.points.length > 9 ? '9+': props.points.length}
			</div>
			: null
	);
}
