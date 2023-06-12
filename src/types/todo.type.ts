export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export enum EStatus {
  loading,
  error,
  success,
  init,
}
