import React, { useCallback, useEffect, FC, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  fetchCities as fetchCitiesAction,
  selectCity as selectCityAction,
} from '~/src/features/cities/store/cityActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { City } from '~/src/app/models/city';
import { CitySearcher } from './CitySearcher';
import { upFirstLetter } from '~/src/app/utils/string';
import { colors } from '~/src/app/common/constants';
import { styles as s } from '../styles';

interface IProps {
  closeList: () => void;
  // state
  cities: City[];
  // actions
  fetchCities: () => void;
  selectCity: (cityId: number) => void;
}

const CitiesListContainer: FC<IProps> = ({
  closeList,
  cities,
  fetchCities,
  selectCity,
}) => {
  const [showCities, setShowCities] = useState<City[]>([]);

  // init all cities
  useEffect(() => {
    if (!cities.length) {
      fetchCities();
    } else {
      setShowCities(cities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities, fetchCities]);

  const keyExtractor = useCallback((city: City) => String(city.id), []);

  const renderItem = useCallback(
    ({ item: cityItem }: { item: City }) => {
      const { id, name } = cityItem;

      function handleSelectCity() {
        closeList();
        selectCity(id);
      }

      return (
        <TouchableOpacity style={s.cityItem} onPress={() => handleSelectCity()}>
          <AppText primary size={4}>
            {upFirstLetter(name)}
          </AppText>
        </TouchableOpacity>
      );
    },
    [closeList, selectCity],
  );

  const emptyList = (
    <Block margin={[10, 0]} middle center>
      <AppText color={colors.caption}>Город не найден</AppText>
    </Block>
  );

  return (
    <>
      <CitySearcher allCities={cities} setCities={setShowCities} />
      <Block style={s.citiesList}>
        <FlatList
          data={showCities}
          initialNumToRender={8}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          getItemLayout={(data, index) => ({
            length: 45,
            offset: 45 * index,
            index,
          })}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={emptyList}
        />
      </Block>
    </>
  );
};

const CitiesListConnected = connect(
  ({ city }: IRootState) => ({
    cities: city.cities,
  }),
  {
    fetchCities: fetchCitiesAction,
    selectCity: selectCityAction,
  },
)(CitiesListContainer);

export { CitiesListConnected as CitiesList };
