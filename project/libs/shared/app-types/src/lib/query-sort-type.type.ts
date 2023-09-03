export const QuerySortType = {
 Date: 'date',
 Popular: 'popular',
 Discussed: 'discussed',
 Status: 'status'
}


export type QuerySortType = (typeof QuerySortType)[keyof typeof QuerySortType]
