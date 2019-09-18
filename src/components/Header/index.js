import React from 'react';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ButtonHome, Logo, CartContainer, Badge } from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <ButtonHome onPress={() => navigation.navigate('Main')}>
        <Logo />
      </ButtonHome>

      <CartContainer onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <Badge amount={2}>{cartSize}</Badge>
      </CartContainer>
    </Container>
  );
}
