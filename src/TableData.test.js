import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableData from './Components/TableData';
import Api from './Api';  

jest.mock('./Api', () => ({
  get: jest.fn(),
}));

test('loads next 4 page numbers on ">" button click', async () => {
  const mockData = [
    { "s.no": 1, "percentage.funded": "50", "amt.pledged": "1000" },
    { "s.no": 2, "percentage.funded": "60", "amt.pledged": "1200" },
    { "s.no": 3, "percentage.funded": "70", "amt.pledged": "1400" },
    { "s.no": 4, "percentage.funded": "80", "amt.pledged": "1600" },
    { "s.no": 5, "percentage.funded": "90", "amt.pledged": "1800" },
    { "s.no": 6, "percentage.funded": "100", "amt.pledged": "2000" },
    { "s.no": 7, "percentage.funded": "40", "amt.pledged": "800" },
    { "s.no": 8, "percentage.funded": "30", "amt.pledged": "600" },
    { "s.no": 9, "percentage.funded": "20", "amt.pledged": "400" },
    { "s.no": 10, "percentage.funded": "10", "amt.pledged": "200" },
  ];

  // Mock the API call to return mockData
  Api.get.mockResolvedValueOnce({ data: mockData });

  render(<TableData />);

  await waitFor(() => screen.getByText("1"));

  // Check the initial page numbers
  let pageNumbers = screen.getAllByRole('button');
  expect(pageNumbers).toHaveLength(5);  
  expect(pageNumbers[1]).toHaveTextContent('1');  
  expect(pageNumbers[2]).toHaveTextContent('2');  
  expect(pageNumbers[3]).toHaveTextContent('3');  
  expect(pageNumbers[4]).toHaveTextContent('4');  

  const nextButton = screen.getByText('>');
  fireEvent.click(nextButton);

  await waitFor(() => screen.getByText("5"));

  // Check the updated page numbers
  pageNumbers = screen.getAllByRole('button');
  expect(pageNumbers).toHaveLength(5); 
  expect(pageNumbers[1]).toHaveTextContent('5');  
  expect(pageNumbers[2]).toHaveTextContent('6');  
  expect(pageNumbers[3]).toHaveTextContent('7');  
  expect(pageNumbers[4]).toHaveTextContent('8');  
});
