import React, {useState} from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые','Закрытые' ]
  function onClickCategories(index) {
    setActiveIndex(index)
  }
  return (
    <div className="categories">
    <ul>
      {categories.map((value, i) => (
        <li onClick={() => onClickCategories(i)} className={activeIndex === i ? 'active' : ''} >{value}</li>
      ))}
    </ul>
  </div>
  )
}

export default Categories;