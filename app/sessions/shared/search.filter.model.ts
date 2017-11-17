
export class SearchFilterState {

    constructor(
        public date: number,            // Filter by date
        public search: string,          // Filter by search query strings
        public viewIndex: number        // Filter by isFavorite/MySchedule list
    ) {

    }
}
