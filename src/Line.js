import React, {Component} from 'react';
import TrainsOnLine from './TrainsOnLine.js';
import Alert from './Alert.js';
import SingleLine from './SingleLine.js';

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineShow: true
    }
  }
  render () {
    console.log(this.props.allLines);
    return (
      <div>
          {
            this.props.allLines.map(function(line, index){
            if(line){
              return <SingleLine lineData= {line} />
            }
          })}
      </div>
    )
  }
}

export default Line
