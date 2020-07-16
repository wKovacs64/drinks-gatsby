import orderBy from 'lodash/orderBy';

export function sortDrinks(drinks) {
  return orderBy(drinks, ['rank', 'createdAt'], ['desc', 'desc']);
}
