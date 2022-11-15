export interface Paginate<T = unknown> {
  total: number;
  currentPage: number;
  items: T[];
}
