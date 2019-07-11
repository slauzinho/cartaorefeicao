import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PropTypes from 'prop-types';
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Header from './Header';
import Transactions from './Transactions';
import CardCarousel from './CardCarousel';
import TransactionsList from './TransactionsList';
import { fetchSiteRequest } from '../actions';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 50;

class Parallax extends React.Component {
  render() {
    const { cards, activeIndex } = this.props;
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <ParallaxScrollView
          backgroundColor="white"
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          renderStickyHeader={() => (
            <View style={styles.stickySection}>
              <Text style={material.headline}>Saldo:</Text>
              <Text style={material.headline}>{this.props.saldo}</Text>
            </View>
          )}
          renderForeground={() => (
            <Header saldo={this.props.saldo}>
              <CardCarousel
                changeIndex={this.props.changeIndex}
                cards={this.props.cards}
              />
            </Header>
          )}
        >
          <View style={{ flex: 1 }}>
            <Transactions
              key={this.props.activeIndex}
              cardNumber={cards[activeIndex].cardNumber}
              cardPassword={cards[activeIndex].cardPassword}
              email={cards[activeIndex].email}
              tipo={cards[activeIndex].tipo}
              render={() => <TransactionsList />}
            />
          </View>
        </ParallaxScrollView>
        <View style={styles.settings}>
          <Icon
            raised
            name="plus"
            type="entypo"
            color={cards[activeIndex].cardColor}
            reverse
            onPress={() => this.props.navigation.navigate('Add')}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    saldo: state.index.saldo,
  };
}

export default connect(
  mapStateToProps,
  { fetchSiteRequest }
)(withNavigation(Parallax));

Parallax.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardNumber: PropTypes.string.isRequired,
      cardPassword: PropTypes.string.isRequired,
      cardColor: PropTypes.string.isRequired,
      cardName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  settings: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
