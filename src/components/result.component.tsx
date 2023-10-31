import { IResult } from '../models/models';
export function ResultComponent({ data }: { data: IResult }) {
  // constructor(props: { data: IResult }) {
  //   super(props);
  // }
  // render() {
  //   const { name, mass, eye_color, skin_color, height, birth_year, gender } = this.props.data;
  return (
    <article>
      <h4>{data.name}</h4>
      <ul title={data.name}>
        <li>Gender: {data.gender}</li>
        <li>Birth year: {data.birth_year}</li>
        <li>Height: {data.height}</li>
        <li>Eye color: {data.eye_color}</li>
        <li>Mass: {data.mass}</li>
        <li>Skin color: {data.skin_color}</li>
      </ul>
    </article>
  );
  // }
}
