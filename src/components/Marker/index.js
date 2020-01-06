import React from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import {mushrooms} from "../../store/static";


class Marker extends React.PureComponent {
  render() {
    return (
      <div className={'marker'}>
        <img src={mushrooms['white-mushroom'].icon}/>
        <Counter points={this.props.points}/>
      </div>
    );
  }
}

export default Marker;
