import orderBy from 'lodash/orderBy';

export const sortDrinks = (drinks) =>
  orderBy(drinks, ['rank', 'createdAt'], ['desc', 'desc']);
