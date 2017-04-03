import React from "react";

import ReactTable from 'react-table'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { ControlLabel } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'

export default class EditableList extends React.Component {

  constructor() {
    super();
    this.state = {
      listStyle : {overflowY : "scroll", maxHeight: "400px"},
      tableStyle : {border: "1px solid LightGray", borderRadius: "5px", padding : "0%", background: "White"},

    };
  }

  removeItem = (index) => { this.props.removeItem(index)}


 render() {

   let data = [...Array(this.props.data.length).keys()].map(i => {return {data: this.props.data[i], index : i.toString()}})

   let removeButton = (index) => {
     if(this.props.showRemoveButton) {
       return <Button
               bsStyle="danger"
               href="#"
               onClick={() => { this.removeItem(index) }}>Remove</Button>
     }
     else {
       return ''
     }
   }

   let tableRows = data.map( item => {
     return  <ButtonGroup style={{padding : "0%"}} key={item.index} justified>
                {removeButton(item.index)}
                <Button href="#">{item.data.name}</Button>
             </ButtonGroup>

   })

    return (
      <div>
        <Col md={this.props.tableSize} style={this.state.tableStyle}>

          <h4 class="text-center">{this.props.listName}</h4>

          {tableRows}
        </Col>

      </div>
    );
  }


}
