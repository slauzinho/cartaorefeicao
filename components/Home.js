import React from 'react';
import { connect } from 'react-redux';
import Parallax from './Parallax';

class Home extends React.Component {
  state = {
    activeIndex: 0,
  };

  _changeIndex = index => this.setState({ activeIndex: index });

  render() {
    return (
      <Parallax
        cards={this.props.cards}
        changeIndex={this._changeIndex}
        activeIndex={this.state.activeIndex}
      />
    );
  }
}

export default connect(
  state => ({ ...state.cards }),
  {}
)(Home);
