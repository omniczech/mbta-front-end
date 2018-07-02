import React, {Component} from 'react';
import TrainsOnLine from './TrainsOnLine.js';

class Line extends Component {
  render () {
    console.log(this.props.allLines);
    return (
      <div>
          {this.props.allLines.map(function(line, index){
            if(line){
              return <div className="lines" key={ index } style={{background: '#' + line.attributes.color, color: '#'+ line.attributes.text_color}}>
                <h3>Line Name: {line.attributes.long_name}</h3>
                <TrainsOnLine lineId= {line.id} lineDirections={line.attributes.direction_names} />
                </div>;
            }
          })}
      </div>
    )
  }
}

export default Line
