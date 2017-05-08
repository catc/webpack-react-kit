import React from 'react';
import { render } from 'react-dom';

class Main extends React.Component {
	render(){
		return (
			<div>Hello world!</div>
		)
	}
}

render(
	<Main />,
	document.getElementById('root')
)
