import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import CreditCard from './CreditCard';

function renderItem({ item, index }, navigate, updateState) {
  return (
    <View>
      <CreditCard
        number={item.cardNumber}
        cvc={item.cardPassword}
        bgColor={item.cardColor}
        nome={item.cardName}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon
            raised
            name="trash"
            type="font-awesome"
            color="black"
            onPress={() => navigate('MyModal', { item, updateState })}
          />
        </View>
      </CreditCard>
    </View>
  );
}

export class CardCarousel extends React.Component {
    state = {
      activeSlide: 0
    }
  
    get pagination() {
      const { activeSlide } = this.state;
      return (
        <Pagination
          dotsLength={this.props.cards.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'white' }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    }
  
    render() {
      return (
        <View>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.props.cards}
            renderItem={(args) => renderItem(args, this.props.navigate, this.props.updateState)}
            sliderWidth={350}
            itemWidth={300}
            onSnapToItem={index => {
              this.props.changeIndex(index);
              this.setState({ activeSlide: index });
            }}
          />
          {this.pagination}
        </View>
      );
    }
}

CardCarousel.propTypes = {
  changeIndex: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default CardCarousel;
