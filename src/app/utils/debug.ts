export const log = (title = '', toShow: any, ...others: any[]) =>
  __DEV__ &&
  console.log(title, JSON.stringify(toShow, null, 4), others.join(','));
export const logline = (title = '', toShow: any, ...others: any[]) =>
  __DEV__ && console.log(title, toShow, others.join(','));
