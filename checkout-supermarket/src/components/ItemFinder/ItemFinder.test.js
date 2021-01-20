import * as React from 'react'
import { create, act } from 'react-test-renderer';

import { ItemFinderUnplugged } from './ItemFinder';


test('render initial component without items to render', () => {
  const mockAddItem = jest.fn();
  const items = [];
  const root = create(<ItemFinderUnplugged onAddItem={mockAddItem} items={items} />).root;
  const elements = root.findAllByType('option');
  expect(elements.length).toBe(1);
});

test('render initial component with items to render', () => {
  const mockAddItem = jest.fn();
  const items = [{
    id: 'mock',
    name: 'Mock name',
  }];
  const root = create(<ItemFinderUnplugged onAddItem={mockAddItem} items={items} selectedItems={[]} />).root;
  const elements = root.findAllByType('option');
  expect(elements.length).toBe(2);
});

test('change the option on select', () => {
  const mockAddItem = jest.fn();
  const items = [{
    id: 'mock',
    name: 'Mock name',
  }];
  const root = create(<ItemFinderUnplugged onAddItem={mockAddItem} items={items} selectedItems={[]} />).root;
  const select = root.find((el) => el.type == 'select');
  act(() => {
    select.props.onChange({
        target: { value: 'mock' }
    });
  });
  const button = root.find((el) => el.type == 'button');
  act(() => {
    button.props.onClick();
});
  expect(mockAddItem).toHaveBeenCalledWith([ { id: 'mock', name: 'Mock name', amount: 1 } ]);
});

test('change the option on select already selected before', () => {
  const mockAddItem = jest.fn();
  const items = [{
    id: 'mock',
    name: 'Mock name',
  }];
  const root = create(<ItemFinderUnplugged
      onAddItem={mockAddItem}
      items={items}
      selectedItems={[ { id: 'mock', name: 'Mock name', amount: 1 } ]}
    />).root;
  const select = root.find((el) => el.type == 'select');
  act(() => {
    select.props.onChange({
        target: { value: 'mock' }
    });
  });
  const button = root.find((el) => el.type == 'button');
  act(() => {
    button.props.onClick();
});
  expect(mockAddItem).toHaveBeenCalledWith([ { id: 'mock', name: 'Mock name', amount: 2 } ]);
});

test('change the option on select to the first option', () => {
  const mockAddItem = jest.fn();
  const items = [{
    id: 'empty-option',
    name: 'Mock name',
  }];
  const root = create(<ItemFinderUnplugged onAddItem={mockAddItem} items={items} />).root;
  const select = root.find((el) => el.type == 'select');

  act(() => {
      select.props.onChange({
        target: { value: 'empty-option' }
    });
  });
  const button = root.find((el) => el.type == 'button');
  expect(button.props.disabled).toBe(true);
});

