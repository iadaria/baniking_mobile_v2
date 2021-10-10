import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { Bath } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
import { Sorter } from './components/Sorter';
import { Searcher } from './components/Searcher';
import { SelectedCity } from './components/SelectedCity';
import {
  clearBathes as clearBathesAction,
  fetchBathes as fetchBathesAction,
  selectBath,
} from '~/src/features/bathes/store/bathActions';
import { resetPage as resetPageAction } from '~/src/features/filters/store/flterActions';
import { FilterButton } from './components/FilterButton';
import { BathesList } from './components/BathesList';
import { useDetectLocation } from '~/src/app/hooks/useDetectLocation';
import { IBathBaseParams } from '~/src/app/models/filter';
import { Location } from '~/src/app/models/map';
/*
import { ParamListBase } from '@react-navigation/native';
import { logline } from '~/src/app/utils/debug';
 */
interface IProps {
  loading: boolean;
  bathes: Bath[];
  params: Partial<IBathBaseParams> & { page: number };
  location: Location | null;
  fetchBathes: () => void;
  clearBathes: () => void;
  resetPage: () => void;
}

export function BathesScreenContainer({
  params,
  location,
  fetchBathes,
  clearBathes,
  resetPage,
}: IProps) {
  // for test
  /* const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectBath(1066));
  }, []); */

  useEffect(() => {
    fetchBathes();
  }, [fetchBathes, params]);

  useEffect(() => {
    clearBathes();
    resetPage();
  }, [clearBathes, location, resetPage]);

  useDetectLocation();

  return (
    <Block safe full padding={[0, 8, 0, 4]}>
      <Block margin={[4, 0, 0, 4]}>
        <Header />
      </Block>

      <SelectedCity />

      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>

      <Block padding={[0, 0, 0, 4]} center row>
        <Searcher />
        <FilterButton />
      </Block>

      <Sorter />
      <BathesList />
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath, filter, map }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
    params: filter.params,
    location: map.location,
  }),
  {
    fetchBathes: fetchBathesAction,
    clearBathes: clearBathesAction,
    resetPage: resetPageAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
