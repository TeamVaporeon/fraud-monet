import React from 'react';
import dummyList from './dummyList.js';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : {}
    }
  }

  componentDidMount() {
    this.setState({
      list : dummyList
    })
  }

  render() {
    return(
      <>
      <h3>Players List</h3>
      </>
    )
  }
}

export default PlayerList;














// import React, {useState, useEffect} from 'react';

// const PlayerList = (props) => {

//   return (
//     <>
//     <h3>Players List</h3>
//     </>
//   )
// }

// export default PlayerList;