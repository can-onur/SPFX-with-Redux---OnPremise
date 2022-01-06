export interface ISearchProps {
  className?: string;
  search?(username: string): void;
  searchText?: string;
}
