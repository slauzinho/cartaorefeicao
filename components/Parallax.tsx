import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { connect } from 'react-redux';
import Header from './Header';
import Transactions from './Transactions';
import CardCarousel from './CardCarousel';
import TransactionsList from './TransactionsList';
import { Card } from '../types';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 50;

interface IProps {
  cards: Card[];
  activeIndex: number;
  saldo: string | number;
}

const Parallax = (props: IProps & NavigationInjectedProps) => {
  const { cards, saldo, activeIndex, navigation } = props;
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <ParallaxScrollView
        backgroundColor="white"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        renderStickyHeader={() => (
          <View style={styles.stickySection}>
            <Text style={material.headline}>Saldo:</Text>
            <Text style={material.headline}>{saldo}</Text>
          </View>
        )}
        renderForeground={() => (
          <Header saldo={saldo}>
            <CardCarousel cards={cards} />
          </Header>
        )}
      >
        <View style={{ flex: 1 }}>
          <Transactions
            key={props.activeIndex}
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
          onPress={() => navigation.navigate('Add')}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    saldo: state.index.saldo,
  };
}

export default connect(mapStateToProps)(withNavigation(Parallax));

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
