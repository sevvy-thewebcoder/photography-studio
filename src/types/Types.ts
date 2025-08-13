export interface PortfolioImage {
  id: number;
  title: string;
  url: string;
  category: string;
};

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}