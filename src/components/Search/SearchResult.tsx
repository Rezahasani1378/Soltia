import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectHistory, selectSearch, setHistory } from '@/redux/slices/Search';
import { useAppDispatch } from '@/redux';
import { toast } from 'react-toastify';

const ResultBox = styled.div<{ isResultsOpen: boolean }>`
  width: 100%;
  margin-top: 2px;
  background-color: #ffffff;
  border: ${({ isResultsOpen }) => (isResultsOpen ? '1px' : '0')} solid #d1d1d1;
  padding: ${({ isResultsOpen }) => (isResultsOpen ? '10px' : '0')} 0;
`;

const Loading = styled.div`
  text-align: center;
  margin: 3px;
  border: 1px solid black;
`;

const ResultItem = styled.p`
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: 0.2s background-color ease;
  cursor: pointer;
  margin: 0;
  height: 40px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SearchResult = ({ inputValue }: { inputValue: string }) => {
  const dispatch = useAppDispatch();

  const searchResults = useSelector(selectSearch);
  const history = useSelector(selectHistory);

  const isSearchResult = searchResults.words.length !== 0;

  const addToHistory = (title: string) => {
    const isTitleExists = history.find((item) => item.title === title);

    if (isTitleExists)
      return toast.warn(`'${title}' is already in your history!`, {
        position: 'top-center',
      });

    let currentDate = new Date();

    let noonOrNight = currentDate.getHours() > 12 ? 'PM' : 'AM';
    let convertedMinute = `${
      currentDate.getMinutes() < 10 ? '0' : ''
    }${currentDate.getMinutes()}`;

    let date =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate() +
      ', ' +
      (currentDate.getHours() % 12) +
      ':' +
      convertedMinute +
      ' ' +
      noonOrNight;

    dispatch(setHistory({ title, date }));
  };

  const boldText = (text: string, shouldBeBold: string) => {
    const textArray = text.split(shouldBeBold);
    return (
      <span>
        {textArray.map((item, index) => (
          <>
            {item}
            {index !== textArray.length - 1 && <b>{shouldBeBold}</b>}
          </>
        ))}
      </span>
    );
  };

  return (
    <ResultBox isResultsOpen={isSearchResult}>
      {searchResults.isLoading && inputValue && <Loading>Loading...</Loading>}
      {searchResults.words?.map((result: { word: string }, index: number) => (
        <ResultItem onClick={() => addToHistory(result.word)} key={index}>
          {boldText(result.word, inputValue)}
        </ResultItem>
      ))}
    </ResultBox>
  );
};

export default SearchResult;
