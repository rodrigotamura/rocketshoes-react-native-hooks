import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ContainerProduct,
  ProductImg,
  ProductTitle,
  ProductPrice,
  ButtonAdd,
  ProductAmount,
  ProductAmountText,
  ButtonAddText,
  LoadingProducts,
} from './styles';

export default function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const amount = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      setLoading(true);

      const resp = await api.get('/products');

      const data = resp.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setLoading(false);
      setProducts(data);
    }

    getProducts();
  }, []);

  const handleAddProduct = id => {
    dispatch(CartActions.addToCartRequest(id));
  };

  const renderItem = ({ item }) => (
    <ContainerProduct>
      <ProductImg
        source={{
          uri: item.image,
        }}
        alt={item.title}
        resizeMode="stretch"
      />
      <ProductTitle numberOfLines={2}>{item.title}</ProductTitle>
      <ProductPrice>{item.priceFormatted}</ProductPrice>
      <ButtonAdd onPress={() => handleAddProduct(item.id)}>
        <ProductAmount>
          <Icon name="add-shopping-cart" color="#FFF" size={20} />
          <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
        </ProductAmount>
        <ButtonAddText>Add cart</ButtonAddText>
      </ButtonAdd>
    </ContainerProduct>
  );

  return (
    <Container>
      {loading ? (
        <LoadingProducts>
          <ActivityIndicator color="#FFF" size={50} />
        </LoadingProducts>
      ) : (
        <FlatList horizontal data={products} renderItem={renderItem} />
      )}
    </Container>
  );
}
