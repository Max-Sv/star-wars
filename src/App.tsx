import { Component } from 'react';

import './App.css';
import { HttpService } from './services/http.service';
import { SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { OBJECT_NUMBER, PaginationComponent } from './components/pagination.component';

const httpService = new HttpService();
export interface IResult {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: [];
  species: [];
  starships: [];
  vehicles: [];
  url: string;
  created: string;
  edited: string;
}

interface IProps {}

export interface IState {
  results: IResult[] | null;
  count: number;
  next: string | null;
  previous: string | null;
}

const initState = {
  results: null,
  count: 0,
  next: null,
  previous: null,
};
export class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...initState };
  }

  async componentDidMount() {
    await this.getStateValue(httpService.getData);
  }
  async onQueryChange({ value }: { value: string }) {
    if (!value) {
      return;
    }

    await this.getStateValue(httpService.search, value);
  }
  async onPaginationClick(url: string) {
    await this.getStateValue(httpService.getData, url);
  }

  async getStateValue(callback: (url?: string) => Promise<IState>, value?: string) {
    this.setState({ ...initState });
    const res = await callback(value);
    this.setState({ ...res });
  }

  render() {
    return (
      <div>
        <section className="search-section">
          <SearchComponent onInputChange={this.onQueryChange.bind(this)}></SearchComponent>
        </section>
        <section className="result-section">
          {this.state.results ? (
            this.state.results.map((data, index) => {
              return <ResultComponent key={index} data={data}></ResultComponent>;
            })
          ) : (
            <span>loading...</span>
          )}
        </section>
        {this.state.results && this.state.count > OBJECT_NUMBER ? (
          <PaginationComponent
            data={this.state}
            paginationClick={this.onPaginationClick.bind(this)}
          ></PaginationComponent>
        ) : null}
      </div>
    );
  }
}
