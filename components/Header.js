import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { material } from 'react-native-typography';

const Header = props => (
  <View style={styles.header}>
    <View style={{ flex: 1 }}>{props.children}</View>
    <View style={styles.textContainer}>
      <Text style={material.headline}>Saldo:</Text>
      <Text style={material.headline}>{props.saldo}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column'
  },
  textContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  }
});

Header.defaultProps = {
  saldo: ''
};

Header.propTypes = {
  saldo: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default Header;
