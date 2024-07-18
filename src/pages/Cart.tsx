import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartEmpty from '../components/CartEmpty';
import { clearItems, selectCart } from '../components/redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

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
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <span>Очистити корзину</span>
          </div>
        </div>
        <div className="content__items">
          {
            items.map((item: any) => <CartItem key={item.id} {...item} />)
          }
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всього піц: <b>{totalCount} шт.</b> </span>
            <span> Сума замовлення: <b>{totalPrice} грн</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>Поернутися назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатити зараз</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


