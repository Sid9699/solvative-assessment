export interface IData<T> {
  data: Array<T>;
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}
