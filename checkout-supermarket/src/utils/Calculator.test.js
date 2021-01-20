import { create } from 'react-test-renderer';
import {
  calculateTotal,
  calculateTotalPayable,
  calculateBasedPriceOverride,
  calculateBuyXGetYFree,
  calculateFlatPercent,
  handlePromotion,
} from './Calculator';

test('test calculate total using one item', () => {
  const items = [
    {
      price: 100,
      amount: 1,
    }
  ];
  const result = calculateTotal(items);
  expect(result).toBe(1)
});

test('test calculate total using more than one item', () => {
  const items = [
    {
      price: 100,
      amount: 3,
    }
  ];
  const result = calculateTotal(items);
  expect(result).toBe(3);
});

test('test calculate total payable without promos', () => {
  const result = calculateTotalPayable(100, []);
  expect(result).toBe(100);
});

test('test calculate total payable with one promo', () => {
  const promos = [{
    isReducible: true,
    value: 1,
  }];
  const result = calculateTotalPayable(100, promos);
  expect(result).toBe(99);
});


test('test calculate total payable with one promo, but not reducible', () => {
  const promos = [{
    isReducible: false,
    value: 1,
  }];
  const result = calculateTotalPayable(100, promos);
  expect(result).toBe(100);
});

test('test calculate promo based price override', () => {
  const promotion = {
    required_qty: 2,
    price: 1000,
    type: 'QTY_BASED_PRICE_OVERRIDE',
  };

  const item = {
    amount: 2,
    price: 600,
  };
  const result = calculateBasedPriceOverride(promotion, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe('QTY_BASED_PRICE_OVERRIDE');
  expect(result.value).toBe(2);
});

test('test calculate promo buy X get Y free', () => {
  const promotion = {
    required_qty: 2,
    type: 'BUY_X_GET_Y_FREE',
  };

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };
  const result = calculateBuyXGetYFree(item, promotion);
  expect(result.isReducible).toBe(false);
  expect(result.type).toBe('BUY_X_GET_Y_FREE');
  expect(result.item).toBe('Burger');
  expect(result.free).toBe(1);
  expect(result.value).toBe(10);
});

test('test calculate promo flat percent', () => {
  const promotion = {
    required_qty: 2,
    type: 'FLAT_PERCENT',
    amount: 10,
  };

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };
  const result = calculateFlatPercent(item, promotion);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe('FLAT_PERCENT');
  expect(result.value).toBe(2);
});

test('test handle promo based price override', () => {
  const promotion = {
    required_qty: 2,
    price: 1000,
    type: 'QTY_BASED_PRICE_OVERRIDE',
  };

  const item = {
    amount: 2,
    price: 600,
  };
  const result = handlePromotion(promotion, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe('QTY_BASED_PRICE_OVERRIDE');
  expect(result.value).toBe(2);
});

test('test handle promo based price override, but without amount enough', () => {
  const promotion = {
    required_qty: 2,
    price: 1000,
    type: 'QTY_BASED_PRICE_OVERRIDE',
  };

  const item = {
    amount: 1,
    price: 600,
  };
  const result = handlePromotion(promotion, item);
  expect(result).toBe(null);
});

test('test handle promo buy X get Y free', () => {
  const promotion = {
    required_qty: 2,
    type: 'BUY_X_GET_Y_FREE',
  };

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };
  const result = handlePromotion(promotion, item);
  expect(result.isReducible).toBe(false);
  expect(result.type).toBe('BUY_X_GET_Y_FREE');
  expect(result.item).toBe('Burger');
  expect(result.free).toBe(1);
  expect(result.value).toBe(10);
});

test('test handle promo buy X get Y free, but without amount enough', () => {
  const promotion = {
    required_qty: 2,
    type: 'BUY_X_GET_Y_FREE',
  };

  const item = {
    amount: 1,
    price: 1000,
    name: 'Burger',
  };
  const result = handlePromotion(promotion, item);
  expect(result).toBe(null);
});

test('test handle promo flat percent', () => {
  const promotion = {
    required_qty: 2,
    type: 'FLAT_PERCENT',
    amount: 10,
  };

  const item = {
    amount: 2,
    price: 1000,
    name: 'Burger',
  };
  const result = handlePromotion(promotion, item);
  expect(result.isReducible).toBe(true);
  expect(result.type).toBe('FLAT_PERCENT');
  expect(result.value).toBe(2);
});

test('test handle unknown promo', () => {
  const promotion = {
    type: 'unknown',
  };

  const item = {
    amount: 1,
    price: 1000,
    name: 'Burger',
  };
  const result = handlePromotion(promotion, item);
  expect(result).toBe(null);
});
