import React, { Component } from 'react';
import './App.css';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

const romanNums = ["I", "II", "III", "IV", "V", "VI", "VII"]

class App extends Component {
  constructor() {
    super()

    this.state = {
      films: null
    }
  }

  componentDidMount() {
    this.fetchFilms()
  }

  fetchFilms() {
    return fetch("https://swapi.co/api/films/")
    .then(response => response.json())
    .then(json => {
      this.setState({
        films: json.results
      })
    })
  }

  makeParagraphs() {
    return this.state.films.sort((a,b) =>
      a.episode_id - b.episode_id).map(film =>
        film.opening_crawl.split("\r\n\r")
      )
  }

  makeCrawls() {
    return this.makeParagraphs().map(crawl => crawl.join("\r\n"))
  }

  render() {
    if(!this.state.films) {
      return null;
    }

    const crawlLengths = this.makeCrawls().map((crawl, i) =>
      ({episode: i+ 1, count: crawl.split("\r\n").join(" ").split(" ").length})
    )

    return (
      <div>
        <VictoryChart domainPadding={15}>
          <VictoryAxis tickValues={romanNums} label="Episodes" />
          <VictoryAxis dependentAxis label="Word Count" style={{axisLabel: {padding: 35 } }} />
          <VictoryBar
            data={crawlLengths}
            x="episode"
            y="count"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
