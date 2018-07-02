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
    let mbtaApi = 'https://api-v3.mbta.com/routes';
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
          console.log(
            linesArr
          );
          base.setState({ routes: linesArr });
          // });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  render() {
    let routes = this.state.routes;
    return (
      <div>
        <h1>MBTA Tracker</h1>
        <Line allLines= {this.state.routes} />
      </div>
     )
  }
}
export default Home;
