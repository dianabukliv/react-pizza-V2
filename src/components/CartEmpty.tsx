import React from 'react'
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <>
    <div className="cart cart--empty">
            <h2>Корзина пуста</h2>
            <p>
              Скоріш за все, ви не замовили ще піццу.<br />
              Для того, щоб замовити піццу, перейди на головну сторінку.
            </p>
            <img src="src/assets/img/empty-cart.png" alt="Empty cart" />
            <Link to="/" className="button button--black">
              <span>Повернутися назад</span>
            </Link>
          </div>
          </>
  )
}

export default CartEmpty;