import React from 'react';
import ReactDOM from 'react-dom';
import {store} from 'store/index';
import {configure, shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({adapter: new Adapter()});

describe('Component LoginForm', () => {
  const buildComponentMount = () => {
    return mount(
      <Provider store={store}>
        <App/>
      </Provider>)
  };
  it('renders component', () => {
    const component = buildComponentMount()
    expect(component).toHaveLength(1);
  });
})