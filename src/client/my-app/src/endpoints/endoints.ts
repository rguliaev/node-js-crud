import axios, { AxiosResponse } from "axios";

const host = "http://localhost:3000";
const api = host + "/api/v1";

const client = axios.create({
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export function list<R>(path: string): Promise<R[]> {
  return client.get(api + path).then((res) => res.data);
}

export function retrieve<R>(path: string, id: string): Promise<R> {
  return client.get(api + path + `/${id}`).then((res) => res.data);
}

export function update<R>(path: string, id: string, data: any): Promise<R> {
  return client.put(api + path + `/${id}`, data).then((res) => res.data);
}

export function create<R>(path: string, data: any): Promise<R> {
  return client.post(api + path, data).then((res) => res.data);
}

export function remove(path: string, id: string): Promise<AxiosResponse> {
  return client.delete(api + path + `/${id}`).then((res) => res.data);
}
