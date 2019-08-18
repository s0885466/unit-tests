/**
 * Запустить отчет о тестах npm test -- --coverage
 **/

/**
 * Тестирование тупого компонента Home
**/
import {Home} from "./Home";
import {shallow} from 'enzyme';
import React from 'react';
/**
 * Тестирование умного компонента ConnectedHome
 **/
import ConnectedHome from  './Home';
import configureStore from 'redux-mock-store';
import {addInputs, subtractInputs} from '../actions/calculatorActions';
/**
 * Тестирование snapshot
 **/
import renderer from 'react-test-renderer';



describe('>>>H O M E --- Shallow Render REACT COMPONENTS',() => {
    let wrapper;
    const output = 10;
//выполнить перед каждым it
    beforeEach(() => {
        wrapper = shallow(<Home output={output}/>)
    });

    it('Количество отрендереных компонентов = 1', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('Внутри #output лежит знаечение output', () => {
        expect(+wrapper.find('#output').text()).toEqual(output);
    });
});


describe('>>>H O M E --- REACT-REDUX (Shallow + passing the {store} directly)',() => {
    const initialState = { output:100 };
    const mockStore = configureStore();
    let store, container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<ConnectedHome store={store} /> );
    });

    it('Количество отрендереных компонентов = 1', () => {
        expect(container.length).toEqual(1);
    });

    it('данные в store совпадают с полученными в prop', () => {
        expect(container.prop('output')).toEqual(initialState.output);
    });

    it('проверка actions', () => {
        let action;
        store.dispatch(addInputs(500));
        store.dispatch(subtractInputs(100));
        action = store.getActions();
        expect(action[0].type).toBe("ADD_INPUTS");
        expect(action[1].type).toBe("SUBTRACT_INPUTS");
    });
});

describe('>>>H O M E --- Snapshot',() => {
    it('+++capturing Snapshot of Home', () => {
        const renderedValue =  renderer.create(<Home output = {10}/>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});

