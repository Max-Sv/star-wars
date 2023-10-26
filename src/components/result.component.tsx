import { Component } from 'react';
import { IResult } from '../models/models';
export class ResultComponent extends Component<{ data: IResult }> {
  constructor(props: { data: IResult }) {
    super(props);
  }
  render() {
    const { name, mass, eye_color, skin_color, height, birth_year, gender } = this.props.data;
    return (
      <article>
        <h4>{name}</h4>
        <ul title={name}>
          <li>Gender: {gender}</li>
          <li>Birth year: {birth_year}</li>
          <li>Height: {height}</li>
          <li>Eye color: {eye_color}</li>
          <li>Mass: {mass}</li>
          <li>Skin color: {skin_color}</li>
        </ul>
      </article>
    );
  }
}
