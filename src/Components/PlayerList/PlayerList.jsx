import React from 'react';
import './PlayerList.css';
// import dummyList from './dummyList.js';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      players : [],
      spectatorsList : [],
      playersCount : null
    }
    this.countPlayers = this.countPlayers.bind(this);
    // this.getPlayers = this.getPlayers.bind(this);
  }

  componentDidMount() {
    this.setState({
      list : this.props.data.viewers,
      playersCount : this.countPlayers(this.props.data.viewers)
      // players : this.getPlayers(dummyList)
    })
  }

  countPlayers(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      var eachPlayerObj = arr[i];
      if (eachPlayerObj.role !== 'spectator') {
        count++;
      }
    }
    return count;
  }

  // getPlayers(arr) {
  //   var playersArr = arr.map(player => {
  //     if (player.role !== 'spectator') {
  //       playersArr.push(player);
  //     }
  //     return playersArr;
  //   })
  // }

  render() {
    return(
      <>
      <h3>Players List</h3>
      <div className="players-list">
        {this.state.list.map((player, index) =>
        (player.role !== 'spectator' ?
        <div className="each-player" key={index}>
          <div>{player.username}</div>
          {/* <div>Color: {player.color}</div> */}
          <div>Score: {player.score}</div>
        </div> :
        <div className="each-spectator" key={index}>
          <div>{player.username} (Spectating)</div>
        </div>))}
      </div>
      <div>
        Players in Game {this.state.playersCount}/10
      </div>
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