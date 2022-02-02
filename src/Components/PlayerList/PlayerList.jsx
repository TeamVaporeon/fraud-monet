import React from 'react';
import './PlayerList.css';
import Button from 'react-bootstrap/Button';


class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      host : [],
      playersList : [],
      spectatorsList : []
    }
    this.sortLobby = this.sortLobby.bind(this);
  }

  componentDidMount() {
    this.sortLobby(this.props.dummyData.viewers);
  }

  sortLobby(arr) {
    var playersArr = arr.filter(player => (player.role === 'player' && player.host === false));
    var specArr = arr.filter(player => player.role === 'spectator');
    var hostArr = arr.filter(player => player.host === true);
    this.setState({
      playersList : playersArr,
      spectatorsList : specArr,
      host : hostArr
    })
  }

  render() {
    return(
      <>
      <div className="total-game-list">
        <div className="players-list">
          <h3 className="player-title">Players:</h3>
          <div className="just-players">
            {this.state.host.map((player, index) =>
            <div className="host" key={index}>
              <div style={{ background: player.color }}>{player.username} 👑</div>
            </div>)}
            {this.state.playersList.map((player, index) =>
            <div className="each-player" key={index}>
              <div style={{ background: player.color}}>{player.username}</div>
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
            <div>Players in Game: {this.state.playersList.length + this.state.host.length}/10</div>
            <div>Number of Spectators: {this.state.spectatorsList.length}</div>
          </div>
          <div className="join-start-buttons">
            <Button variant="success" size="sm">Join</Button>
            <Button variant="success" size="sm">Start</Button>
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