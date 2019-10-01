import orderBy from 'lodash/orderBy';

const sortDrinks = drinks =>
  orderBy(drinks, ['rank', 'createdAt'], ['desc', 'desc']);

export default sortDrinks;
