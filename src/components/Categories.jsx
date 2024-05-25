import React from 'react';

function Categories({ value, onChangeCategories }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые','Закрытые' ];
  
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategories(i)} className={value === i ? 'active' : ''} >{categoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
