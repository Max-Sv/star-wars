export interface IResult {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  description: string;
  first_brewed: string;
  abv: number;
  ibu: number;
  ebc: number;
  srm: number;
  ph: number;
  food_pairing: string[];
}

export interface IState {
  results: IResult[] | null;
  count: number;
  next: string | null;
  previous: string | null;
  currentPage: number | null;
  itemPerPage: number | null;
}
