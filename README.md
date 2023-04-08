## Running the project

```
npm run start
```

The server will run on :3000, where you can visit http://127.0.0.1:3000/posts or http://127.0.0.1:3000/player

## Project structure

The project structure is as such:

```
|- view (\*.html, web components \*-view.js) - rendering focused
|-- controllers (\*-controller.js) - state management and data logic
|--- services - interfacing with APIs
```

Not quite familiar with plain html/js development so I decided to go with an MVC like approach

## Implementation notes

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
- re-render optimisations (currently rerenders the full DOM tree for given list/grid)
