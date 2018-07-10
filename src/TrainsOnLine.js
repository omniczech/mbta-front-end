import React, {Component} from 'react';
// import TimerMixin from 'react-timer-mixin';

class TrainsOnLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: "",
      direction0: "",
      direction1: "",
      trainsShow: false
    }
  }
  // mixins() {[TimerMixin]}

  trainsDisplay = () => {
    this.setState({trainsShow: true})
  }

  trainsHide = () => {
    this.setState({trainsShow: false})
  }

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
          // console.log('Trains for this line', linesArr.length)
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
          // console.log('Trains for this line', linesArr.length)
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
    let trains
    if(this.state.trainsShow) {
      trains = <div><div onClick={this.trainsHide} className="trains-header"><i className="fas fa-subway"></i><h3 className="open">Trains Running</h3></div><TrainsSingle trains={this.state.trains} lineDirections={this.props.lineDirections} direction0={this.state.direction0} direction1={this.state.direction1} /></div>
    } else {
      trains = <div onClick={this.trainsDisplay} className="trains-header"><i className="fas fa-subway"></i><h3>Trains Running</h3></div>
    }
    return (
      <div>

        {trains}
      </div>
    )
  }
}

class TrainsSingle extends Component {
  render() {
    return (
      <div>
      <h4>Total Trains: <strong>{this.props.trains.length}</strong></h4>
        <h4>Trains on this line {this.props.lineDirections[0]}: <strong>{this.props.direction0.length}</strong></h4>
        <h4>Trains on this line {this.props.lineDirections[1]}: <strong>{this.props.direction1.length}</strong></h4>
      </div>
    )
  }
}

export default TrainsOnLine
