import React from 'react';
import Foo from 'components/foo';

export default class App extends React.Component {
	render(){
		return (
			<div>
				<h1>Hello world!</h1>

				<Foo/>
			</div>
		)
	}
}