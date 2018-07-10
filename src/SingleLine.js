import React, {Component} from 'react';
import TrainsOnLine from './TrainsOnLine.js';
import Alert from './Alert.js';
import LineMap from './Map.js';

class SingleLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineShow: false
    }
  }

  lineDisplay = () => {
    this.setState({lineShow: true})
  }

  lineHide = () => {
    this.setState({lineShow: false})
  }

  render () {
    console.log(this.props.lineData);
    if(this.state.lineShow){
      return (
        <div className="row">
                <div className="lines col-md-12" style={{background: '#' + this.props.lineData.attributes.color, color: '#'+ this.props.lineData.attributes.text_color}}><div className="line-border">
                  <div className="row">
                    <div className="line-header" onClick={this.lineHide}>
                      <div className="col-md-12">
                        <h3 onClick={this.lineHide}>{this.props.lineData.attributes.long_name}</h3>
                        <h1 onClick={this.lineHide}>-</h1>
                      </div>
                    </div>
                  </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-4"><TrainsOnLine lineId= {this.props.lineData.id} lineDirections={this.props.lineData.attributes.direction_names} /></div>
                      <div className="col-md-8"><Alert lineId= {this.props.lineData.id} /></div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <LineMap lineId= {this.props.lineData.id} color={this.props.lineData.attributes.color} lineDirections={this.props.lineData.attributes.direction_names} />
                      </div>
                    </div>
                  </div></div>

        </div>
      )
    } else {
      return(
        <div>

                <div className="lines col-md-12" style={{background: '#' + this.props.lineData.attributes.color, color: '#'+ this.props.lineData.attributes.text_color}}><div className="line-border">
                  <div className="row">
                  <div className="line-header" onClick={this.lineDisplay}>
<div className="col-md-12">
                      <h3 onClick={this.lineDisplay}>{this.props.lineData.attributes.long_name}</h3>
                      <h1 onClick={this.lineDisplay}>+</h1>
                    </div>
                    </div>
                  </div>
                  </div></div>

        </div>
      )
    }
  }
}

export default SingleLine
