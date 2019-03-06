import React from 'react';
import renderer from 'react-test-renderer';
import Modal from './Modal';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Modal visible>Facebook</Modal>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
