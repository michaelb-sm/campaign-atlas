import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import DataCard from '../DataCard';

afterEach(() => {
    cleanup();
});

// Simple Display Rendering

test("card name should render", () => {
    const data = {_id: 1, name: 'testName', status: 'inTest', dataType: 'person'};
    render(<DataCard data={data}/>);

    const dataCardElement = screen.getByText('testName');
    expect(dataCardElement).toBeInTheDocument();
});

test("card status should render", () => {
    const data = {_id: 1, name: 'testName', status: 'inTest', dataType: 'person'};
    render(<DataCard data={data}/>);

    const dataCardElement = screen.getByText('Status: inTest');
    expect(dataCardElement).toBeInTheDocument();
});

test("card status should be blank", () => {
    const data = {_id: 1, name: 'testName', status: '', dataType: 'person'};
    render(<DataCard data={data}/>);

    const status = screen.queryByText('Status: ');
    expect(status).not.toBeInTheDocument();
});

// Button Functionality

describe("button click", () => {
    test("button should trigger method and pass id and datatype", () => {
        const data = {_id: 1, name: 'testName', status: 'inTest', dataType: 'person'};
        const onClicked = jest.fn();
        render(<DataCard data={data} onClicked={onClicked}/>);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(onClicked).toHaveBeenCalledTimes(1);
        expect(onClicked).toHaveBeenCalledWith(1, 'person');
    });
});