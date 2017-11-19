
export class SearchFilterState {

    constructor(
        public date: number,            // Filter by date
        public search: string,          // Filter by search query strings
        public viewIndex: number,       // Filter by isFavorite list
        public type: string             // Filter by type (LMHT, YMHT, etc)
    ) {

    }
}
