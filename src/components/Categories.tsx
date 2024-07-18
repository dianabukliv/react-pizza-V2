import React, { useEffect } from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategories: (idx: number) => void;
  getCategories: (categories: string[]) => void;
}

const categories = ['Всі', "М'ясні", 'Вегатаріанські', 'Гриль', 'Гострі', 'Закриті'];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategories, getCategories }) => {
  useEffect(() => {
    getCategories(categories);
  }, [getCategories]);

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategories(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

