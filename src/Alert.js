import React, {Component} from 'react';
import TrainsOnLine from './TrainsOnLine.js';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      alertsShow: false
    }
  }

  componentDidMount() {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this
    // fetch a poem
    let mbtaApi = 'https://api-v3.mbta.com/alerts?route=' + this.props.lineId + '&api_key=84a7d614ab4e4ef6b1623578a2e9fb09';

    fetch(mbtaApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          // base.setState({
          let linesArr = json.data.map(function(route, index){
              return route
          })
          base.setState({alerts: linesArr})
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })


    this.interval = setInterval(() => {
      // save a reference to `this` because the value of `this` will change
      // inside the different callback functions.
      var base = this
      // fetch a poem
      let mbtaApi = 'https://api-v3.mbta.com/alerts?route=' + this.props.lineId;

      fetch(mbtaApi)
        .then((response) => {
          return response.json()
        }).then((json) => {
            // base.setState({
            let linesArr = json.data.map(function(route, index){
                return route
            })
            console.log(linesArr);

            // });
        }).catch((ex) => {
          console.log('An error occured while parsing!', ex)
        })
    }, 30000)
  }

  render () {
    let alertshow
    if (this.state.alerts.length >= 1){
      alertshow = <AlertLoop lineId= {this.props.lineId} alerts = {this.state.alerts} />
    } else {
      alertshow = <h4>No alerts to report!</h4>
    }
    // console.log(this.props.lineId);
      return (
        <div>
                  <div>
                  <i class="fas fa-exclamation-triangle"></i>
                  {alertshow}
                  </div>

        </div>
      )

  }
}

class AlertLoop extends Component {
  render () {
    return(
      <div>
        <h4>Alerts for {this.props.lineId}</h4>
        <ul>
          {this.props.alerts.map(function(alert, index){
              return <li key= {index}>{alert.attributes.header} <br /> <a href={alert.attributes.url} target="_blank">More Info</a></li>
          })}
        </ul>
      </div>
      )
  }
}

export default Alert
