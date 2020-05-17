import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

export default class Home extends Component {

  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Covid-19',
          data: [],
          backgroundColor:'#35F1F1',
          hoverBackgroundColor: 'green',
          hoverBorderColor: 'green',
          borderWidth: 4,
          responsive: true,
        }
      ],
    },
    news: {}
  }

  async componentDidMount() {
    this.getDataSet();
  }

  getDataSet = async () => {
    const res = await axios.get("https://covid.ourworldindata.org/data/ecdc/total_cases.csv");
    const dataSet = res.data;
    let xData = [];
    let yData = [];

    const table = dataSet.split('\n').slice(1)
    table.forEach(row => {
      const columns = row.split(',');
      const date = columns[0];
      xData.push(date)
      const total_cases = columns[1]
      yData.push(total_cases);
    });

    let object = this.state;
    object.chartData.labels = xData.slice(30);
    object.chartData.datasets[0].data = yData.slice(30);
    this.setState(object);
  }

  getDateClicked = async (elems) => {
    if(elems[0]){
      const dateSelected = elems[0]._model.label
      const res = await axios.post("http://localhost:4000/api/news/get-news", {fromDate:dateSelected, toDate:dateSelected});
      this.setState({news: res.data.response.articles})
    }

  }

  render() {
    return (
      <div className="container">
        <div><Bar onElementsClick={this.getDateClicked} data={this.state.chartData}/></div>

          <hr/>
          {this.state.news[0] ? this.state.news.map((news, index) => (
            <div className="card mb-3" key={index}>
              <img className="card-img-top" src={news.urlToImage} alt={"Author: " + news.author}/>
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">{news.description}</p>
                <p className="card-text"><small className="text-muted">{news.publishedAt}</small></p>
                <p className="card-text"><small className="text-muted"><a href={news.url} rel="noopener noreferrer" target="_blank">Link to news</a></small></p>
              </div>
            </div>
          )):
           <div><h1>Click a bar up to a month old to get news!</h1></div>}

           <footer><a href="https://newsapi.org/" rel="noopener noreferrer" target="_blank">Powered by NewsAPI.org</a></footer>

      </div>

    )
  }
}
