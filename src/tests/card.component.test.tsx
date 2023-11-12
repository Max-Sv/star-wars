import { render, screen, fireEvent } from '@testing-library/react';
import { IResult } from '../models/models';
import { CardComponent } from '../components/card.component';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, // Mock BrowserRouter
    useNavigate: () => vi.fn(), // Mock useNavigate
  };
});

describe('CardComponent', async () => {
  const mockData: IResult = {
    id: 1,
    name: 'Beer Name',
    tagline: 'Tagline',
    abv: 5.0,
    ibu: 20,
    ebc: 10,
    srm: 15,
    ph: 4.5,
  };

  it('renders CardComponent correctly', () => {
    render(
      <MemoryRouter>
        <CardComponent data={mockData} search="exampleSearch" />
      </MemoryRouter>
    );
    expect(screen.getByText('Beer Name')).toBeInTheDocument();
    expect(screen.getByText('Tagline: Tagline')).toBeInTheDocument();
    expect(screen.getByText('ABW: 5%')).toBeInTheDocument();
    expect(screen.getByText('IBU: 20')).toBeInTheDocument();
    expect(screen.getByText('EBC: 10')).toBeInTheDocument();
    expect(screen.getByText('SRM: 15')).toBeInTheDocument();
    expect(screen.getByText('Ph: 4.5')).toBeInTheDocument();
  });

  it('calls navigate when clicked', () => {
    const navigateMock = vi.fn((test) => console.log('-> test', test));

    render(
      <BrowserRouter>
        <CardComponent data={mockData} search="exampleSearch" />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('article'));

    // Ensure that the navigate function is called with the correct arguments
    const expectedArgs = { pathname: '/item/1', search: 'exampleSearch' };
    expect(navigateMock).toHaveBeenCalledWith(expectedArgs);
  });
});
