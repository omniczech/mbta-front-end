import React, {Component} from 'react';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet'

class LineMap extends Component {
  constructor() {
    super()
    this.state = {
      lat: 42.3216215,
      lng: -71.0900097,
      zoom: 11,
      trains: [],
      direction0: [],
      direction1: [],
    }
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
    }, 30000)
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const color = "#" + this.props.color
    const direction0Name = this.props.lineDirections[0]
    const direction1Name = this.props.lineDirections[1]
    let trainsLocDir0 = this.state.direction0.map(function(train, index){
        return [train.attributes.latitude, train.attributes.longitude, train.id]
    })
    let trainsLocDir1 = this.state.direction1.map(function(train, index){
        return [train.attributes.latitude, train.attributes.longitude, train.id]
    })
    return (
      <div>
        <div className="map-header"><i className="fas fa-map-marked-alt"></i><h3>Live Map</h3></div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {trainsLocDir0.map(function(trainPosition, index){
            return <CircleMarker center={[trainPosition[0],trainPosition[1]]} fillColor="black" fillOpacity="1" color={color} radius={5}>
              <Popup>
                Direction: {direction0Name}
                <br />
                Train ID: {trainPosition[2]}
              </Popup>
            </CircleMarker>
          })}
          {trainsLocDir1.map(function(trainPosition, index){
            return <CircleMarker center={[trainPosition[0],trainPosition[1]]} fillColor="white" fillOpacity="1" color={color} radius={5}>
              <Popup>
                Direction: {direction1Name}
                <br />
                Train ID: {trainPosition[2]}
              </Popup>
            </CircleMarker>
          })}
        </Map>
      </div>
    )
  }
}

export default LineMap
