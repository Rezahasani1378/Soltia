import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '@/components/Common/Input';
import SearchResult from '@/components/Search/SearchResult';
import SearchHistory from '@/components/Search/SearchHistory';
import { useAppDispatch } from '@/redux';
import { fetchSearch, resetResults, selectSearch } from '@/redux/slices/Search';
import { useSelector } from 'react-redux';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 500px;
  margin: 30px auto;
  padding: 7px;
  background-color: #f5f5f5;

  @media screen and (max-width: 540px) {
    width: 92.8vw;
  }
`;

let delayTimer: NodeJS.Timeout;

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  const searchResults = useSelector(selectSearch);

  useEffect(() => {
    if (searchResults.words) dispatch(resetResults());

    clearTimeout(delayTimer);
    delayTimer = setTimeout(function () {
      if (inputValue) dispatch(fetchSearch(inputValue));
      else dispatch(resetResults());
    }, 500);
  }, [inputValue]);

  return (
    <Container>
      <Input
        focus
        placeholder="Enter the word to start!"
        id="searchInput"
        setData={(value) => setInputValue(value)}
      />
      <SearchResult inputValue={inputValue} />
      <SearchHistory />
    </Container>
  );
};

export default SearchBox;
