import React, {Component} from 'react';
import TrainsOnLine from './TrainsOnLine.js';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      alertsShow: true
    }
  }

  alertsDisplay = () => {
    this.setState({alertsShow: true})
  }

  alertsHide = () => {
    this.setState({alertsShow: false})
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
    if (!this.state.alertsShow) {
      alertshow = <div className="alerts-header" onClick={this.alertsDisplay}><i className="fas fa-exclamation-triangle"></i><h3>Alerts</h3></div>
    } else if (this.state.alerts.length >= 1){
      alertshow = <div><div className="alerts-header" onClick={this.alertsHide}><i className="fas fa-exclamation-triangle"></i><h3 className="open">Alerts</h3></div><AlertLoop lineId= {this.props.lineId} alerts = {this.state.alerts} /></div>
    } else {
      alertshow = <div><div className="alerts-header" onClick={this.alertsHide}><i className="fas fa-exclamation-triangle"></i><h3 className="open">Alerts</h3></div><h4>No alerts to report!</h4></div>
    }
    // console.log(this.props.lineId);
      return (
        <div>
                  <div>
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
        <ul>
          {this.props.alerts.map(function(alert, index){
              return <AlertSingle alert= {alert} index= {index} />
          })}
        </ul>
      </div>
      )
  }
}

class AlertSingle extends Component {
  render () {
    if (this.props.alert.attributes.url){
      return(
        <li key= {this.props.index}>{this.props.alert.attributes.header} <br /> <a href={this.props.alert.attributes.url} target="_blank">More Info</a></li>
      )
    } else {
      return (
        <li key= {this.props.index}>{this.props.alert.attributes.header}</li>
      )
    }
  }
}

export default Alert
