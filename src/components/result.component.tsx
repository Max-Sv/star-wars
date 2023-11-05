import { IResult } from '../models/models';
import { useNavigate } from 'react-router-dom';
import React from 'react';
export function ResultComponent({ data, search }: { data: IResult; search: string }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate({ pathname: `/item/${data.id}`, search });
  }

  return (
    <article onClick={handleClick}>
      <h4>{data.name}</h4>

      <ul title={data.name}>
        <li>Tagline: {data.tagline}</li>
        <li>ABW: {data.abv}%</li>
        <li>IBU: {data.ibu}</li>
        <li>EBC: {data.ebc}</li>
        <li>SRM: {data.srm}</li>
        <li>Ph: {data.ph}</li>
      </ul>
    </article>
  );
}
