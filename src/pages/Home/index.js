/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatPrice } from '../../util/format';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  List,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <Container>
        <List
          horizontal
          data={products}
          keyExtractor={product => String(product.id)}
          extraData={this.props}
          renderItem={({ item }) => (
            <Product key={item.id}>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <AddButton onPress={() => this.handleAddProduct(item.id)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" color="#fff" size={20} />
                  <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
                </ProductAmount>
                <AddButtonText>ADICIONAR</AddButtonText>
              </AddButton>
            </Product>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
