Not quite familiar with plain html/js development so I decided to go with an MVC like approach

The project structure is as such:

|- view (\*.html, web components) - rendering focused
|-- controllers - state management and logic
|--- services - interfacing with APIs

A few assumptions I made during this assignment:

- grouping + sorting are both allowed to be turned on simulataneously
  - in that case, grouping has a higher priority than sorting (because otherwise it would appera that grouping is not working)
- only ascending sort
- primarily a frontend assignment, so:
  - sorting, grouping done on frontend (ideally should be backend for when data scales)
  - JSONPlaceholder called directly from client

Future improvements:

- mobile friendly
- accessibility
- rem units
- re-render optimisations (currently rerenders the full list)
