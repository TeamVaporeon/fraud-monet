import React from 'react';
import './PlayerList.css';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      playersList : [],
      spectatorsList : []
    }
    this.sortLobby = this.sortLobby.bind(this);
  }

  componentDidMount() {
    this.sortLobby(this.props.data.viewers);
  }

  sortLobby(arr) {
    var playersArr = arr.filter(player => player.role !== 'spectator');
    var specArr = arr.filter(player => player.role === 'spectator');
    this.setState({
      playersList : playersArr,
      spectatorsList : specArr
    })
  }

  render() {
    return(
      <>
      <div className="total-game-list">
        <div className="players-list">
          <h3>Players</h3>
          <div className="just-players">
            {this.state.playersList.map((player, index) =>
            <div className="each-player" key={index}>
              <div>{player.username}</div>
            </div>)}
          </div>
          <h3>Spectating</h3>
          <div className="just-specs">
            {this.state.spectatorsList.map((spec, index) =>
            <div className="each-spectator" key={index}>
              <div>{spec.username} (Spectating)</div>
            </div>)}
          </div>
        </div>
        <div>Players in Game: {this.state.playersList.length}/10</div>
        <div>Number of Spectators: {this.state.spectatorsList.length}</div>
        <div>
          <button>Join</button>
          <button>Start</button>
        </div>
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