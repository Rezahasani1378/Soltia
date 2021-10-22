import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { removeItem, resetHistory, selectHistory } from '@/redux/slices/Search';
import { useAppDispatch } from '@/redux';

const Container = styled.div`
  padding: 15px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 540px) {
    font-size: 16px;
  }
`;

const ClearHistory = styled.span`
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const Tips = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border-bottom: 1px solid #ededed;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px #ededed solid;
  height: 40px;

  @media screen and (max-width: 540px) {
    height: 35px;
  }
`;

const ItemTitle = styled.span`
  @media screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const ItemDate = styled.time`
  margin-left: auto;
  margin-right: 20px;
  color: #d6d6d6;

  @media screen and (max-width: 540px) {
    font-size: 12px;
  }
`;

const RemoveIcon = styled.div`
  cursor: pointer;

  &:after {
    content: ' \\2715';
    font-size: 18px;
    color: grey;
  }
`;

const SearchHistory = () => {
  const dispatch = useAppDispatch();

  const history = useSelector(selectHistory);
  const isHistory = history.length !== 0;

  const handleRemove = (index: number) => {
    dispatch(removeItem(index));
  };

  const removeAll = () => {
    dispatch(resetHistory());
  };

  return (
    <Container>
      <Header>
        <Title>Search history</Title>
        {isHistory && (
          <ClearHistory onClick={() => removeAll()}>
            Clear search history
          </ClearHistory>
        )}
      </Header>
      {isHistory ? (
        <ItemsContainer>
          {history?.map(
            (
              { title, date }: { title: string; date: string },
              index: number,
            ) => (
              <HistoryItem>
                <ItemTitle>{title}</ItemTitle>
                <ItemDate dateTime={date}>{date}</ItemDate>
                <RemoveIcon onClick={() => handleRemove(index)} />
              </HistoryItem>
            ),
          )}
        </ItemsContainer>
      ) : (
        <Tips>Click on the search items to see the history!</Tips>
      )}
    </Container>
  );
};

export default SearchHistory;
