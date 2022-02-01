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
          <h3>Players:</h3>
          <div className="just-players">
            {this.state.playersList.map((player, index) =>
            <div className="each-player" key={index}>
              <div style={{ color: player.color}}>{player.username}</div>
            </div>)}
          </div>
          <h3>Spectators:</h3>
          <div className="just-specs">
            {this.state.spectatorsList.map((spec, index) =>
            <div className="each-spectator" key={index}>
              <div>{spec.username}</div>
            </div>)}
          </div>
        </div>
        <div className="playercount-and-buttons">
          <div className="players-spec-count">
            <div>Players in Game: {this.state.playersList.length}/10</div>
            <div>Number of Spectators: {this.state.spectatorsList.length}</div>
          </div>
          <div className="join-start-buttons">
            <button>Join</button>
            <button>Start</button>
          </div>
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