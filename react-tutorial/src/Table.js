import React, {Component} from 'react'

const Tableheader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  )
}

const Tablebody = (props) => {
    const rows = props.characters.map((row, index) => {
        return (
            <tr key ={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
}

class Table extends Component {
  render() {
    const {characterData} = this.props
    return (
      <table>
        <Tableheader />
        <Tablebody characterData={characterData}/>
      </table>
    )
  }
}

export default Table