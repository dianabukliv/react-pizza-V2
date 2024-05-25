import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../redux/slices/filterSlice'; // Adjust the path as needed

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 150),
    [dispatch],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <img className={styles.icon} src='/public/search.svg' alt='search icon'/>
      <input 
        ref={inputRef}
        value={value}
        onChange={onChangeInput} 
        className={styles.input} 
        placeholder='Пошук піци...'
      />
      { value &&
        <img onClick={onClickClear} className={styles.clearIcon} src='/public/clear.svg' alt='clear icon'/>}
    </div>
  )
}

export default Search;


