import { IResult } from '../models/models';
import React from 'react';
import Link from 'next/link';
import './card-list.css';
import useQueryParams from "@/hooks/useQueryParams";

export function CardComponent({ data }: { data: IResult }) {
  const { queryParams } = useQueryParams<{
    search?: string;
    page?: string;
    per_page?: string;
  }>();

  const page = queryParams?.get('page')
  const perPage =queryParams?.get('per_page')
  return (
    <Link href={{ pathname: `/${data.id}`, query: `page=${page}&per_page=${perPage}` }}>
      <article className="card">
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
    </Link>
  );
}
