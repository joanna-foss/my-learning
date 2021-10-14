import React, {Component} from "react"
import Table from "./Table"

// class App extends Component {
// 	render() {
// 		return (
// 			<div class="container">
// 				<Table />
// 			</div>
// 		);
// 	}
// }

class App extends Component {
	render() {
		const characters = [
			{
				name: 'Charlie',
				job: 'Janitor',
			},
			{
				name: 'Mac',
				job: 'Bouncer',
			},
			{
				name: 'Dee',
				job: 'Actress',
			},
			{
				name: 'Dennis',
				job: 'Bartender',
			},
		]

		return (
			<div className="container">
				<Table characterData={characters} />
			</div>
		)
	}
}

export default App