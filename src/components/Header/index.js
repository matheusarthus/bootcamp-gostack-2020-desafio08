import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  BasketImage,
  Logo,
  BasketContainer,
  ItemCount,
} from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Wrapper>
      <BasketImage onPress={() => navigation.navigate('Home')}>
        <Logo />
      </BasketImage>
      <BasketContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <ItemCount>{cartSize || 0}</ItemCount>
      </BasketContainer>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  cartSize: state.cart.length,
});

export default connect(mapStateToProps)(Header);
