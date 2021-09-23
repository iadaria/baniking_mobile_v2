import { GOOGLE_API } from 'react-native-dotenv';
import { Dimensions } from 'react-native';
import ImageResizer, { Response } from 'react-native-image-resizer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { bathOneImg, bathThreeImg, bathTwoImg } from '~/src/assets';
import { methods } from '../api';
import { sizes } from '../common/constants';
import {
  IDirectionsResponse,
  IDistanceResponse,
  TPartDirectionsParams,
  TPartDistanceParams,
} from '../models/bath';
import { IPersistImage } from '../models/persist';
import { getFileName, replaceExtension } from './common';
import { ISchedule } from '~/src/app/models/bath';
import { logline } from './debug';
import { EXTRA_KEYS, IBathExtraParams } from '../models/filter';

export function checkPhoto(photo: string): string | null {
  const formats = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
  const substring = photo.substr(photo.length - 3);

  logline('', substring);
  return formats.includes(substring) ? photo : null;
}

export function checkPhotos(photos: string[]): string[] {
  const formats = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
  const correctPhotos =
    photos.filter((photo: string) => {
      const substring = photo.substr(photo.length - 3);
      logline('', substring);
      return formats.includes(substring);
    }) || [];

  return correctPhotos;
}

export function formateText(text: string) {
  return `%${text.toLowerCase().replace(/ /g, '%')}%`;
}

export function unformateText(text: string) {
  return text.replace(/%/g, ' ').trim();
}

export function calcFilterCount(params: Partial<IBathExtraParams>): number {
  return Object.keys(params).reduce((sum, key) => {
    if (EXTRA_KEYS.includes(key)) {
      return Array.isArray(params[key]) ? sum + params[key].length : sum + 1;
    }
    return sum;
    //return EXTRA_KEYS.includes(key) ? sum + 1 : sum;
  }, 0);
}

export const getScheduleCurrentWeek = (
  schedule: Partial<ISchedule>,
): [string, string | null] => {
  if (schedule.is_round_the_clock) {
    return ['', null];
  }
  const arrayOfWeekdays = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const arrayOfWeekdaysShort = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  const dateObj = new Date();

  const weekdayNumber = dateObj.getDay();
  const weekdayName = arrayOfWeekdays[weekdayNumber];

  const weekdayShort = arrayOfWeekdaysShort[weekdayNumber];

  const week = `on_${weekdayShort}` as keyof ISchedule;
  const hours_from = `${weekdayShort}_hours_from` as keyof ISchedule;
  const hours_to = `${weekdayShort}_hours_to` as keyof ISchedule;
  const weekDaySchedule = !schedule[week]
    ? null
    : (schedule[hours_from] || '') + ' - ' + (schedule[hours_to] || '');

  return [weekdayName, weekDaySchedule];
};

export const getRandomBathImage = () => {
  const images = [bathOneImg, bathTwoImg, bathThreeImg];
  const randomDigit = Math.floor(Math.random() * 3);
  return images[randomDigit];
};

export const isNonRating = (rating: number) =>
  ['0', '0.0'].indexOf(String(rating)) !== -1;

export const cacheImage = async (
  image: string,
  size?: number,
): Promise<Response> => {
  const width =
    size || Dimensions.get('screen').width - wp(sizes.offset.base) * 2;
  return await ImageResizer.createResizedImage(image, width, width, 'PNG', 100);
};

export const cacheAvatar = async (avatar: string): Promise<Response> => {
  return await ImageResizer.createResizedImage(avatar, 50, 50, 'PNG', 100);
};

// Меняем размер если задан и кэшируем - по умолчаиню размер - это ширина экрана
export const cacheImages = async (
  images: string[],
  set: string[],
  size?: number,
): Promise<IPersistImage[]> => {
  const cachedImages: IPersistImage[] = [];
  for (let i = 0; i < images.length; i++) {
    const fileNameExtension = getFileName(images[i]);
    const fileName = replaceExtension(fileNameExtension, '');
    const indexOf = set.indexOf(fileName);
    if (indexOf === -1) {
      try {
        const response: Response = await cacheImage(images[i], size);
        //logline('[bathUtility/persistImage]', JSON.stringify(response, null, 4));
        //logline('[bathUtility/persistImage]', response.name);
        cachedImages.push({ id: fileName, path: response.uri });
      } catch (error) {
        logline('[bathUtility/persistImage/error]', error);
      }
    }
  }
  return cachedImages;
};

export const isCachedImage = (
  image: string,
  set: string[],
): [boolean, number] => {
  const fileNameExtension = getFileName(image);
  const fileName = replaceExtension(fileNameExtension, '');
  const indexOf = set.indexOf(fileName);
  return [indexOf !== -1, indexOf];
};

export async function getDirections(
  params: TPartDirectionsParams,
): Promise<[number, string]> {
  const newParams = { ...params, key: GOOGLE_API };
  try {
    const {
      geocoded_waypoints,
      routes,
    }: IDirectionsResponse = await methods.getDirections(null, newParams);
    if (
      geocoded_waypoints.length > 1 &&
      geocoded_waypoints[0].geocoder_status === 'OK' &&
      geocoded_waypoints[1].geocoder_status === 'OK'
    ) {
      const { legs, overview_polyline } = routes[0];
      return [legs[0].distance.value, overview_polyline.points];
    }
  } catch (error) {
    logline('[getDirectionsSaga]', error);
  }
  return [0, ''];
}

export async function getPoints(
  params: TPartDirectionsParams,
): Promise<string | null> {
  const newParams = { ...params, key: GOOGLE_API };
  try {
    const {
      geocoded_waypoints,
      routes,
    }: IDirectionsResponse = await methods.getDirections(null, newParams);
    if (
      geocoded_waypoints.length > 1 &&
      geocoded_waypoints[0].geocoder_status === 'OK' &&
      geocoded_waypoints[1].geocoder_status === 'OK'
    ) {
      const { overview_polyline } = routes[0];
      return overview_polyline.points;
    }
  } catch (error) {
    logline('[getDirectionsSaga]', error);
  }
  return null;
}

export async function getDistance(
  params: TPartDistanceParams,
): Promise<number | null> {
  const newParams = { ...params, key: GOOGLE_API, units: 'metric' };
  try {
    const { rows, status }: IDistanceResponse = await methods.getDistance(
      null,
      newParams,
    );
    if (status === 'OK' && rows[0].elements[0].status === 'OK') {
      const { distance } = rows[0].elements[0];
      return distance.value;
    }
  } catch (error) {
    logline('[getDirectionsSaga]', error);
  }
  return null;
}

interface IDistance {
  lant1: number;
  long1: number;
  lant2: number;
  long2: number;
}

var rad = function (x: number) {
  return (x * Math.PI) / 180;
};

export const isLatitude = (num: number) => isFinite(num) && Math.abs(num) <= 90;
export const isLongitude = (num: number) =>
  isFinite(num) && Math.abs(num) <= 180;

export function calculateDistance(props: IDistance) {
  const { lant1, long1, lant2, long2 } = props;
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(lant2 - lant1);
  var dLong = rad(long2 - long1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lant1)) *
      Math.cos(rad(lant2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
  // __DEV__ && console.log('[bathUtility/calculateDisntance]', d / 1000);
}
