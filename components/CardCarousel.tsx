import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveIndex } from '../actions';
import { AppState, Card } from '../types';
import CarouselItem from './CarouselItem';

const CardCarousel = () => {
    const cards = useSelector<AppState, Card[]>(state => state.cards.cards);
    const activeIndex = useSelector<AppState, number>(state => state.index.activeIndex);
    const dispatch = useDispatch();
    const pagination = () => (
        <Pagination
            dotsLength={cards.length}
            activeDotIndex={activeIndex}
            containerStyle={{ backgroundColor: 'white' }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
    );

    return (
        <View>
            <Carousel
                data={cards}
                renderItem={({ item }: { item: Card }) => <CarouselItem item={item} />}
                sliderWidth={350}
                itemWidth={300}
                onSnapToItem={index => dispatch(changeActiveIndex(index))}
            />
            {pagination()}
        </View>
    );
};

export default withNavigation(CardCarousel);
