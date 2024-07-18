import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>(); 
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6642356d3d66a67b3436a308.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Помилка при отриманні піци');
        navigate('/')
      }
    }
    fetchPizza();
  }, [id]); 

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className='container'>
      <img className='pizza-block__image' src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн.</h4>
    </div>
  );
};

export default FullPizza;
