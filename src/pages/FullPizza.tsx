import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pizzas from '/src/pizzas.json';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>(); 
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    function fetchPizza() {
      try {
        const selectedPizza = pizzas.find(p => p.id === id);
        if (selectedPizza) {
          setPizza(selectedPizza);
        } else {
          throw new Error('Pizza not found');
        }
      } catch (error) {
        console.error('Error fetching pizza:', error);
        alert('Помилка при отриманні піци');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

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
