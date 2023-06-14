export type WhereQueryBuilder = {
  searchString: string
  searchCriteria: { q: string }
}

export type WhereUsingQueryBuilder = WhereQueryBuilder[]
