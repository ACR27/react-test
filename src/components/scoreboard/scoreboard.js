import React, { Component } from 'react';
import GameScore from './gameScore';
import CONFIG from './../../config';
import axios from 'axios';
import _ from "underscore";
import './scoreboard.css';

class Scoreboard extends Component {
    constructor() {
        super();
        this.teamMap = {};
        this.state = {
            gameScores: []
        }
    }

    componentWillMount() {
        this.getTeams();
        this.getScoreboard();
    }

    componentDidMount() {
        this.getScoreboard();
        this.listenForUpdates();
    }

    listenForUpdates() {
        var URL = CONFIG.SOCKET_URL + "/v1/" + this.props.sport;
        console.log(URL);
        var socket = require('socket.io-client')(URL);

        socket.on('scoreboard', function(data) {
            var newScore = data;
            this.addAbbrevsToGameScore(newScore, this.teamMap);

            var scoreIndex;

            _.each(this.state.gameScores, function(score, idx) {
                if(score.game_id === data.game_id) {
                    scoreIndex = idx;
                }
            });

            let gameScores = this.state.gameScores;

            if(scoreIndex !== undefined) {
                gameScores.splice(scoreIndex, 1, newScore);
            } else {
                // TODO REMOVE JUST FOR TESTING
                gameScores = this.state.gameScores.concat(newScore);
            }

            this.setState({
                gameScores: gameScores
            })
        }.bind(this));
    }

    getTeams() {
        var url = CONFIG.API_URL + '/v1/' + this.props.sport + '/teams';
        console.log(url);
        axios.get(url)
            .then(function(response) {
                let teams = response.data.body;
                _.each(teams, function(team) {
                    this.teamMap[team.id] = team;
                }.bind(this))
            }.bind(this)).catch(function(err) {
            console.log(err);
        });
    }

    getScoreboard() {
        var url = CONFIG.API_URL + '/v1/' + this.props.sport + '/scoreboards';
        console.log(url);
        axios.get(url)
            .then(function(response) {
                let gameScores = response.data.body;

                this.addAbbrevsToGameScores(gameScores);
                this.setState({
                    gameScores: gameScores
                });


            }.bind(this))
            .catch(function(err) {
                console.log(err);
            });
    }

    addAbbrevsToGameScore(score) {
        if(score === undefined || this.teamMap === undefined) {
            return;
        }
        var homeTeam = this.teamMap[score.home_team_id];
        var awayTeam = this.teamMap[score.away_team_id]

        if(homeTeam !== undefined) {
            score.home_team_abbrev = homeTeam.abbrev;
        }
        if(awayTeam !== undefined) {
            score.away_team_abbrev = this.teamMap[score.away_team_id].abbrev;
        }
    }

    addAbbrevsToGameScores(gameScores) {
        if(gameScores !== undefined && this.teamMap !== undefined) {

            _.each(gameScores, function(score) {
                this.addAbbrevsToGameScore(score);
            }.bind(this));
        }
    }
    render() {
        let gameScores;
        if(this.state.gameScores) {
            gameScores = this.state.gameScores.map(gameScore => {
                return <GameScore key={gameScore.game_id} gameScore={gameScore} sport={this.props.sport}></GameScore>
            });
        }

        return (
            <div className="scoreboard">
                <h3>{this.props.sport} Scoreboard</h3>
                {gameScores}

            </div>
        );
    }
}

Scoreboard.propTypes = {
    sport: React.PropTypes.string
}

Scoreboard.defaultPorps = {
    sport: "nba"
}

export default Scoreboard;
