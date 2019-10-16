import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import Header from './Header';
import CardCarousel from './CardCarousel';
import TransactionsList from './TransactionsList';
import { AppState } from '../types';

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 50;

const Parallax = props => {
    const { navigation } = props;
    const activeCardColor = useSelector<AppState, string>(
        state => state.cards.cards[state.index.activeIndex].cardColor,
    );
    const saldo = useSelector<AppState, string>(state => state.index.saldo);
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
                        <CardCarousel />
                    </Header>
                )}
            >
                <View style={{ flex: 1 }}>
                    <TransactionsList />
                </View>
            </ParallaxScrollView>
            <View style={styles.settings}>
                <Icon
                    raised
                    name="plus"
                    type="entypo"
                    color={activeCardColor}
                    reverse
                    onPress={() => navigation.navigate('Add')}
                />
            </View>
        </View>
    );
};

export default withNavigation<NavigationInjectedProps>(Parallax);

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
