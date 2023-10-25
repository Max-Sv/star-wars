import { Component } from 'react';
import './App.css';
import { HttpService } from './services/http.service';
import { ISearchState, SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { PaginationComponent } from './components/pagination.component';
import { PAGE_OBJECT_NUMBER } from './config';
import { LocalStorageService } from './services/local-storage.service';
import { IState } from './models/models';
import { ErrorBoundaryComponent } from './components/error-boundary.component';

interface IProps {}

const initState = {
  results: null,
  count: 0,
  next: null,
  previous: null,
};
export default class App extends Component<IProps, IState> {
  constructor(
    props: IProps,
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {
    super(props);
    this.httpService = new HttpService();
    this.localStorageService = new LocalStorageService();
    this.state = { ...initState };
  }

  async componentDidMount() {
    if (this.localStorageService.data) {
      await this.updateStateValue(this.httpService.search, this.localStorageService.data);
      return;
    }
    await this.updateStateValue(this.httpService.getData);
  }
  async onQueryChange({ value }: ISearchState) {
    await this.updateStateValue(this.httpService.search, value);
    if (value) {
      this.localStorageService.setData(value);
    }
  }
  async onPaginationClick(url: string) {
    await this.updateStateValue(this.httpService.getData, url);
  }

  async updateStateValue(callback: (url?: string) => Promise<IState>, value?: string) {
    this.setState({ ...initState });
    const res = await callback(value);
    this.setState({ ...res });
  }

  render() {
    return (
      <div>
        <section className="search-section">
          <ErrorBoundaryComponent>
            <SearchComponent
              queryChanged={this.onQueryChange.bind(this)}
              initQuery={this.localStorageService.data}
            />
          </ErrorBoundaryComponent>
        </section>
        <section className="result-section">
          {this.state.results ? (
            this.state.results.length ? (
              this.state.results.map((data, index) => {
                return <ResultComponent key={index} data={data}></ResultComponent>;
              })
            ) : (
              <span>No data 😞</span>
            )
          ) : (
            <span>loading...</span>
          )}
        </section>
        {this.state.results && this.state.count > PAGE_OBJECT_NUMBER ? (
          <PaginationComponent
            data={this.state}
            paginationClick={this.onPaginationClick.bind(this)}
          ></PaginationComponent>
        ) : null}
      </div>
    );
  }
}
