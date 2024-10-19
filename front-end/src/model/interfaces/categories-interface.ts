export interface CategoriesResponse {
    _id: string,
    name: string,
}

export interface FetchCategoriesResponse {
    data: CategoriesResponse[],
    loading: boolean,
    error: string
}