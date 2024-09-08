import { ApiRes, MultiItem, SingleItem } from '@/types';
import { Option, OptionExterior, Product } from '@/types/product';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY;
const CLIENT = process.env.NEXT_CLIENT_ID;

export async function fetchProducts(): Promise<Product[]> {
  const params = new URLSearchParams();
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/products?${params.toString()}`;
  // const url = `${SERVER}/products`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<MultiItem<Product>> = await res.json();
  if (!resJson.ok) {
    throw new Error('상품 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchVehicles(): Promise<Product[]> {
  const params = new URLSearchParams();
  const custom = JSON.stringify({ 'extra.category': 'vehicle' });
  const sort = JSON.stringify({ _id: 1 });
  params.set('custom', custom);
  params.set('sort', sort);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/products?${params.toString()}`;
  // const url = `${SERVER}/products`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<MultiItem<Product>> = await res.json();
  if (!resJson.ok) {
    throw new Error('상품 목록 조회 실패');
  }
  return resJson.item;
}


export async function fetchOptions(): Promise<Option[]> {
  const params = new URLSearchParams();
  const custom = JSON.stringify({ 'extra.category': 'option' });
  const sort = JSON.stringify({ _id: 1 });
  params.set('custom', custom);
  params.set('sort', sort);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);
  const url = `${SERVER}/products?${params.toString()}`;
  // const url = `${SERVER}/products`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 0 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<MultiItem<Option>> = await res.json();
  if (!resJson.ok) {
    throw new Error('상품 목록 조회 실패');
  }
  return resJson.item;
}

export async function fetchProduct(_id: string) {
  const url = `${SERVER}/products/${_id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<SingleItem<Product>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

export async function fetchOptionExterior(category: string) {
  const params = new URLSearchParams();
  const custom = JSON.stringify({ 'extra.category': category });
  const sort = JSON.stringify({ _id: 1 });
  params.set('custom', custom);
  params.set('sort', sort);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);

  const url = `${SERVER}/products?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<SingleItem<OptionExterior[]>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}

export async function fetchOption(category: string) {
  const params = new URLSearchParams();
  const custom = JSON.stringify({ 'extra.category': category });
  const sort = JSON.stringify({ _id: 1 });
  params.set('custom', custom);
  params.set('sort', sort);
  params.set('limit', LIMIT!);
  params.set('delay', DELAY!);

  const url = `${SERVER}/products?${params.toString()}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': CLIENT,
    },
    next: { revalidate: 10 }, // Revalidate every 60 seconds
  });
  const resJson: ApiRes<SingleItem<Option[]>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}
