import React from 'react';
import { render } from 'react-dom';

import Foo from 'src/foo';

class Main extends React.Component {
	render(){
		return (
			<div>
				Hello world!
				<Foo />
			</div>
		)
	}
}

render(
	<Main />,
	document.getElementById('root')
)
