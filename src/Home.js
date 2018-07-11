import React, {Component} from 'react';
import Line from './Line.js';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this

    // fetch a poem
    let mbtaApi = 'https://api-v3.mbta.com/routes' + '?api_key=84a7d614ab4e4ef6b1623578a2e9fb09';
    fetch(mbtaApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          // base.setState({
          let linesArr = json.data.map(function(route, index){
            if (route.attributes.type === 1 || route.attributes.type === 0) {
              return route
            }
          })
          linesArr.sort((linea, lineb) => linea.attributes.color -lineb.attributes.color)
          // console.log(
          //   linesArr
          // );
          base.setState({ routes: linesArr.sort((linea, lineb) => linea.attributes.color -lineb.attributes.color)
 });
          // });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  render() {
    let routes = this.state.routes;
    return (
      <div className="container">
        <h1 className="header">MBTA Train Tracker</h1>
        <Line allLines= {this.state.routes} />
        <div className="pseudo-bg"></div>
      </div>
     )
  }
}
export default Home;
