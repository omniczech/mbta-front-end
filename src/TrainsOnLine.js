import React, {Component} from 'react';
// import TimerMixin from 'react-timer-mixin';

class TrainsOnLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: "",
      direction0: "",
      direction1: ""
    }
  }
  // mixins() {[TimerMixin]}

  apiCall = (e) => {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this
    // fetch a poem
    let mbtaApi = 'https://api-v3.mbta.com/vehicles?route=' + this.props.lineId + '&api_key=84a7d614ab4e4ef6b1623578a2e9fb09';

    fetch(mbtaApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          // base.setState({
          let linesArr = json.data.map(function(route, index){
              return route
          })
          let dir0 = json.data.filter(train => train.attributes.direction_id === 0)
          let dir1 = json.data.filter(train => train.attributes.direction_id === 1)
          console.log('Trains for this line', linesArr.length)
          base.setState({ trains: linesArr });
          base.setState({ direction0: dir0 });
          base.setState({ direction1: dir1 });
          // });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  componentDidMount() {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this
    // fetch a poem
    let mbtaApi = 'https://api-v3.mbta.com/vehicles?route=' + this.props.lineId + '&api_key=84a7d614ab4e4ef6b1623578a2e9fb09';

    fetch(mbtaApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          // base.setState({
          let linesArr = json.data.map(function(route, index){
              return route
          })
          let dir0 = json.data.filter(train => train.attributes.direction_id === 0)
          let dir1 = json.data.filter(train => train.attributes.direction_id === 1)
          // console.log('Trains for this line', linesArr.length)
          base.setState({ trains: linesArr });
          base.setState({ direction0: dir0 });
          base.setState({ direction1: dir1 });
          // });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })


    this.interval = setInterval(() => {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this
    // fetch a poem
    let mbtaApi = 'https://api-v3.mbta.com/vehicles?route=' + this.props.lineId;

    fetch(mbtaApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          // base.setState({
          let linesArr = json.data.map(function(route, index){
              return route
          })
          let dir0 = json.data.filter(train => train.attributes.direction_id === 0)
          let dir1 = json.data.filter(train => train.attributes.direction_id === 1)
          console.log('Trains for this line', linesArr.length)
          base.setState({ trains: linesArr });
          base.setState({ direction0: dir0 });
          base.setState({ direction1: dir1 });
          // });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
    }, 30000)
  }



  render () {
    console.log(this.state.trains);
    return (
      <div>
        <p>Total Trains: {this.state.trains.length}</p>
        <p>Trains on this line {this.props.lineDirections[0]}: {this.state.direction0.length}</p>
        <p>Trains on this line {this.props.lineDirections[1]}: {this.state.direction1.length}</p>

      </div>
    )
  }
}

export default TrainsOnLine
