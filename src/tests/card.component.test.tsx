import { render, screen, fireEvent } from '@testing-library/react';
import { IResult } from '@/models/models';
import { CardComponent } from '@/components/card.component';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual: NonNullable<unknown> = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    useNavigate: () => mockedNavigate,
  };
});
const mockedNavigate = vi.fn();

describe('CardComponent', async () => {
  const mockData = {
    id: 1,
    name: 'Beer Name',
    tagline: 'Tagline',
    abv: 5.0,
    ibu: 20,
    ebc: 10,
    srm: 15,
    ph: 4.5,
  } as unknown as IResult;

  test('renders CardComponent correctly', () => {
    render(<CardComponent data={mockData} search="exampleSearch" />);
    expect(screen.getByText('Beer Name')).toBeInTheDocument();
    expect(screen.getByText('Tagline: Tagline')).toBeInTheDocument();
    expect(screen.getByText('ABW: 5%')).toBeInTheDocument();
    expect(screen.getByText('IBU: 20')).toBeInTheDocument();
    expect(screen.getByText('EBC: 10')).toBeInTheDocument();
    expect(screen.getByText('SRM: 15')).toBeInTheDocument();
    expect(screen.getByText('Ph: 4.5')).toBeInTheDocument();
  });

  test('calls navigate when clicked', () => {
    render(<CardComponent data={mockData} search="exampleSearch" />);
    fireEvent.click(screen.getByRole('article'));

    const expectedArgs = { pathname: '/item/1', search: 'exampleSearch' };
    expect(mockedNavigate).toHaveBeenCalledWith(expectedArgs);
  });
});
