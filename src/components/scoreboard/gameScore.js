import React, { Component } from 'react';
import './gameScore.css';

class GameScore extends Component {
    constructor() {
        super();
        this.goToGame = this.goToGame.bind(this);
    }
    goToGame() {
        window.open('http://live.numberfire.com/' + this.props.sport + "/" + this.props.gameScore.game_id);
    }
    render() {
        return (
            <div className="gameScore" onClick={this.goToGame}>
                <div>{this.props.gameScore.game_id}</div>
                <div>{this.props.gameScore.away_team_abbrev}: {this.props.gameScore.away_team_score}</div>
                <div>{this.props.gameScore.home_team_abbrev}: {this.props.gameScore.home_team_score}</div>
            </div>
        );
    }
}

GameScore.propTypes = {
    gameScore: React.PropTypes.object,
    sport: React.PropTypes.string
}

export default GameScore;
