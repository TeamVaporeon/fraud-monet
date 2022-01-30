import React from 'react';
import dummyList from './dummyList.js';
// import Players from './Players.jsx';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : []
    }
  }

  componentDidMount() {
    this.setState({
      list : dummyList
    })
  }

  // countPlayers() {
  //   var count = 0;
  //   dummyList.map(player =>
  //     if (player.role !== 'spectator') {
  //       count++;
  //     }
  //     return count;
  //   )
  // }

  render() {
    return(
      <>
      <h3>Players List</h3>
      {this.state.list.map(player =>
      <div className="each-player">
        <div>Name: {player.username}</div>
        <div>Color: {player.color}</div>
        <div>Score: {player.score}</div>
      </div>
      )}
      <div>
        <button>Join</button>
        <button>Start</button>
      </div>
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