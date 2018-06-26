import React from 'react';
import Parallax from '../components/Parallax';

const ParallaxScreen = props => {
  const { params } = props.navigation.state;
  const cards = params ? params.cards : null;
  const updateState = params ? params.updateState : null;
  return cards ? (
    <Parallax
      cards={cards}
      navigate={props.navigation.navigate}
      updateState={updateState}
    />
  ) : null;
};

export default ParallaxScreen;
