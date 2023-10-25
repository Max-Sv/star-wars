import { Component } from 'react';
import { IResult } from '../models/models';
export class ResultComponent extends Component<{ data: IResult }> {
  render() {
    return (
      <article>
        <h4>{this.props.data.name}</h4>
        <ul title={this.props.data.name}>
          <li>Gender: {this.props.data.gender}</li>
          <li>Birth year: {this.props.data.birth_year}</li>
          <li>Height: {this.props.data.height}</li>
          <li>Eye color: {this.props.data.eye_color}</li>
          <li>Mass: {this.props.data.mass}</li>
          <li>Skin color: {this.props.data.skin_color}</li>
        </ul>
      </article>
    );
  }
}
