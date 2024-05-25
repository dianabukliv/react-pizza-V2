import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import { clearItems } from '../components/redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Очистити корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            {/* SVG and other elements */}
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            {/* SVG and other elements */}
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {
            items.map(item => <CartItem key={item.id} {...item} />)
          }
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всего пицц: <b>{totalCount} шт.</b> </span>
            <span> Сумма заказа: <b>{totalPrice} грн</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              {/* SVG and other elements */}
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


