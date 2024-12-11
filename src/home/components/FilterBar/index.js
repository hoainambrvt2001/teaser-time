import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Select from 'antd/lib/select';

import classes from './index.module.scss';
import { filterTypes } from '../../utils/constants';

const { Option } = Select;

const SelectionBar = ({ filterType, handleChange, title }) => {
  return (
    <div className={classes.ComponentWrapper}>
      <h3>{title}</h3>
      <Select
        style={{ width: '200px' }}
        size={'large'}
        onChange={handleChange}
        placeholder="- All -"
      >
        <Option value="">- All -</Option>
        {filterType.map((filerElement, index) => {
          return (
            <Option value={filerElement.id} key={index}>
              {filerElement.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

const FilterBar = () => {
  const [filterValue, setFilterValue] = useState({
    genre: '',
    country: '',
    year: '',
    sortType: 'popularity.desc',
  });
  const router = useRouter();

  console.log('rerendering');

  useEffect(() => {
    let queryString = '';
    if (filterValue.genre) {
      queryString += '/home?' + `genre=${filterValue.genre}`;
    }
    if (filterValue.country) {
      queryString +=
        (!queryString ? '/home?' : '&') + `country=${filterValue.country}`;
    }
    if (filterValue.year) {
      queryString +=
        (!queryString ? '/home?' : '&') + `year=${filterValue.year}`;
    }
    if (filterValue.sortType) {
      queryString +=
        (!queryString ? '/home?' : '&') + `sortType=${filterValue.sortType}`;
    }
    if (queryString) {
      router.replace(queryString);
    }
  }, [filterValue]);

  const handleFilterGenre = (value) => {
    setFilterValue({
      ...filterValue,
      genre: value,
    });
  };

  const handleFilterCountry = (value) => {
    setFilterValue({
      ...filterValue,
      country: value,
    });
  };

  const handleFilterYear = (value) => {
    setFilterValue({
      ...filterValue,
      year: value,
    });
  };

  const handleSortCondition = (value) => {
    setFilterValue({
      ...filterValue,
      sortType: value,
    });
  };

  return (
    <div className={classes.SectionWrapper}>
      {filterTypes.map((filterType, index) => {
        switch (index) {
          case 0:
            return (
              <SelectionBar
                filterType={filterType}
                key={index}
                handleChange={handleFilterGenre}
                title={'Genre'}
              />
            );
          case 1:
            return (
              <SelectionBar
                filterType={filterType}
                key={index}
                handleChange={handleFilterCountry}
                title={'Country'}
              />
            );
          case 2:
            return (
              <SelectionBar
                filterType={filterType}
                key={index}
                handleChange={handleFilterYear}
                title={'Year'}
              />
            );
          case 3:
            return (
              <SelectionBar
                filterType={filterType}
                key={index}
                handleChange={handleSortCondition}
                title={'Sort'}
              />
            );
          default:
            return;
        }
      })}
    </div>
  );
};

export default FilterBar;
