import { Component } from 'react';
import './result.css';
import { IResult } from '../App';
export class ResultComponent extends Component<{ data: IResult }> {
  // constructor(props: IResult) {
  //   console.log('-> 111props', props);
  //   super(props);
  //   // this.state = null;
  // }
  // componentWillUnmount() {
  //   alert('The component named Child is about to be unmounted.');
  // }

  render() {
    return (
      <article>
        <p>Name: {this.props.data.name}</p>
        <p>{this.props.data.gender}</p>
        <p>{this.props.data.birth_year}</p>
        <p>{this.props.data.height}</p>
      </article>
    );
  }
}
