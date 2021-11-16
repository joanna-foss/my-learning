import React, {Component} from "react"
import Table from "./Table"

class App extends Component {
	state = {
		characters: [
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
		],
	}

	removeCharacter = (index) => {
		const {characters} = this.state
		this.setState({
			characters: characters.filters((character, i) => {
				return i !== index
			}),
		})
	}

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