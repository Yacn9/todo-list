import { ITodo } from "types";
import { APIService } from "services";
import { AxiosResponse } from "axios";

const ENTITY = "/todo";

const list = (): Promise<AxiosResponse<ITodo[]>> => APIService.get(`${ENTITY}`);

const changeStatus = (data: ITodo): Promise<AxiosResponse> =>
  APIService.put(`${ENTITY}/${data.id}`, {
    ...data,
    completed: !data.completed,
  });

const del = (id: number): Promise<AxiosResponse> =>
  APIService.delete(`${ENTITY}/${id}`);

export const TodoAPI = {
  list,
  changeStatus,
  del,
};
