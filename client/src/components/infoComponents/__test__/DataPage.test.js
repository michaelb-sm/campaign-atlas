import { render, screen, within, fireEvent, cleanup } from '@testing-library/react';

import DataPage from '../DataPage';

afterEach(() => {
    cleanup();
});

// Simple Display Rendering

const page = 'people/1';
    const data = {
        _id: 1, 
        name: 'testName', 
        status: 'inTest', 
        dataType: 'person',
        infoLinks: {
            allies: [],
            enemies: [],
            places: [],
            events: [],
            items: [],
            other: []
        },
        main: [
            {
                heading: 'Heading1',
                body: 'Testing for body1'
            }
        ]
    };
    const refData = [
        {_id: 10, name: 'ref1', status: 'one', dataType: 'person'},
        {_id: 20, name: 'ref2', status: 'two', dataType: 'place'},
        {_id: 30, name: 'ref3', status: 'three', dataType: 'thing'}
    ];

test("page name should render", () => {
    render(<DataPage page={page} data={data} refData={refData}/>);

    const dataPageElement = screen.getByText('testName');
    expect(dataPageElement).toBeInTheDocument();
});

test("page status should render", () => {
    render(<DataPage page={page} data={data} refData={refData}/>);

    const dataPageElement = screen.getByText('Status: inTest');
    expect(dataPageElement).toBeInTheDocument();
});

test("page paragraph should render", () => {
    render(<DataPage page={page} data={data} refData={refData}/>);

    const paragraphHeading = screen.getByText('Heading1');
    expect(paragraphHeading).toBeInTheDocument();
    const paragraphBody = screen.getByText('Testing for body1');
    expect(paragraphBody).toBeInTheDocument();
});

// Editing Changes //


// Status
describe('status editing', () => {
    test("editing status should change display", () => {
        render(<DataPage page={page} data={data} refData={refData}/>);
    
        const statusContainer = screen.getByTestId('status');
        const btn = within(statusContainer).getByRole('button');
    
        // ** Add checks for button icon
        expect(within(statusContainer).getByText('Status: inTest')).toBeInTheDocument();
        expect(within(statusContainer).queryByDisplayValue('inTest')).not.toBeInTheDocument();
    
        fireEvent.click(btn);
    
        expect(within(statusContainer).queryByText('Status: inTest')).not.toBeInTheDocument();
        expect(within(statusContainer).getByDisplayValue('inTest')).toBeInTheDocument();
    });
});

// Main Paragraphs
describe('main paragraphs editing', () => {
    test("add button renderswith correct display", () => {
        render(<DataPage page={page} data={data} refData={refData}/>);

        const btn = screen.getByTestId('addButton');

        // ** Add checks for button icon
        expect(btn).toBeInTheDocument();
    });

    test("add paragraph button increases number of paragraphs", () => {
        render(<DataPage page={page} data={data} refData={refData}/>);

        const btn = screen.getByTestId('addButton');

        var paragraph1 = screen.queryByTestId('main1');
        expect(paragraph1).not.toBeInTheDocument();

        fireEvent.click(btn);

        paragraph1 = screen.queryByTestId('main1');
        expect(paragraph1).toBeInTheDocument();
    });
});
