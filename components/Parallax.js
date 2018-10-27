import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PropTypes from 'prop-types';
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Header from './Header';
import Transactions from './Transactions';
import CardCarousel from './CardCarousel';
import TransactionsList from './TransactionsList';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 50;

class Parallax extends React.Component {
  state = {
    saldo: null
  };

  _changeSaldo = saldo => this.setState({ saldo });

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
              <Text style={material.headline}>{this.state.saldo}</Text>
            </View>
          )}
          renderForeground={() => (
            <Header saldo={this.state.saldo}>
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
              saldo={this._changeSaldo}
              tipo={cards[activeIndex].tipo}
              render={({ dataSource, loading }) => (
                <TransactionsList dataSource={dataSource} loading={loading} />
              )}
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

export default withNavigation(Parallax);

Parallax.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      cardNumber: PropTypes.string.isRequired,
      cardPassword: PropTypes.string.isRequired,
      cardColor: PropTypes.string.isRequired,
      cardName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  activeIndex: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  settings: {
    position: 'absolute',
    right: 20,
    bottom: 20
  }
});
