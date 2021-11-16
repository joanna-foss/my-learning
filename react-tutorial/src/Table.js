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

const Tablebody = () => {
  return (
    <tbody />
  )
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