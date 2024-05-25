import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setSortType, setFilters, sortList } from '../components/redux/slices/filterSlice';
import { fetchPizzas } from '../components/redux/slices/pizzasSlice'; 
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategories = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeSort = (sortOption) => {
    dispatch(setSortType(sortOption));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortType,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  const getPizzas = async () => {
    dispatch(fetchPizzas({
      sortType,
      currentPage,
      categoryId,
    }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategories={onChangeCategories} />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Помилка</h2>
          <p>Скоріш за все, ви не замовили піцу. Для того, щоб замовити, поверніться на головну сторінку.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;










