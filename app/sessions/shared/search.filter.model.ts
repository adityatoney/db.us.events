
export class SearchFilterState {

    constructor(
        public date: number,            // Filter by date
        public search: string,          // Filter by search query strings
        public viewIndex: number,       // Filter by isFavorite list (0: favorites; 1: sessions)
        public type: string             // Filter by type (LMHT, YMHT, etc)
    ) {

    }
}
