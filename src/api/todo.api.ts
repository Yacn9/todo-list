import { ITodo } from "types";
import { APIService } from "services";
import { AxiosResponse } from "axios";

const ENTITY = "/todo";

const list = (): Promise<AxiosResponse<ITodo[]>> => APIService.get(`${ENTITY}`);

const update = (id: number): Promise<ITodo> =>
  APIService.patch(`${ENTITY}/${id}`);

const changeStatus = (id: number, status: boolean): Promise<ITodo> =>
  APIService.put(`${ENTITY}/${id}`);

const del = (id: number): Promise<AxiosResponse> =>
  APIService.delete(`${ENTITY}/${id}`);

export const TodoAPI = {
  list,
  update,
  changeStatus,
  del,
};
