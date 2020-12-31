import React, { Component }  from 'react'
import Table from './baseComponents/Table'


export default class App extends Component {
  constructor(props){
      super(props);
  }
  render() {
      return  <div>
          <Table Pagenation="10" CurrentSize="5" Thead = "postId,id,name,email,arr" Harf="test.json"></Table>
      </div>
  }
}
