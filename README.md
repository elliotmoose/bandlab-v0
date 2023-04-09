## Running the project

```
npm run start
```

The server will run on :3000, where you can visit http://127.0.0.1:3000/posts or http://127.0.0.1:3000/player

## Project structure

The project structure is as such:

```
|- pages (\*.html)
|-- components (web components \*-view.js)
|--- controllers (\*-controller.js) - state management and data logic
|---- services - interfacing with APIs
```

Not quite familiar with plain html/js development so I decided to go with an MVC like approach

## Implementation notes

### Assumptions

A few assumptions I made during this assignment:

- grouping + sorting are both allowed to be turned on simulataneously
  - in that case, grouping has a higher priority than sorting (because otherwise it would appera that grouping is not working)
- only ascending sort

- no need to display user data (username etc) as this is usually more efficient to be joined on the api side

### Backend

- primarily a frontend assignment, so:
  - sorting, grouping done on frontend (ideally should be backend for when data scales)
  - JSONPlaceholder called directly from client
- used a simple express library to serve web app and resources

### Styling

- regarding styling, I was considering between component styles or page level styles. I settled with page styles as it helped with more consistency across the page (and was more convenient for this assignment), but this might change depending on needs of the project.

## Future Improvements / Roadmap

1. Resource Availability

- Likely would want to use some sort of CDN to distribute the audio files, instead of having them sit on a server.
- That also means we might need to maintain a record of what audio samples are available to be loaded.
- Additionally, we may want to preload audio files in view, especially if we have some sort of list virtualisation.

2. Responsiveness and Portability

- Make the website scale better on different devices or mobile devices (media queries, rem units etc)
- Add more accessibility with keyboard input
- Localisation,

3. State Management and Performance

- managing state can quickly become a complex topic depending on needs and priorities. One thing we lack in this app but face with frontend frameworks would be fine-grained updates to them DOM. We can add re-render optimisations, as the current implementation rerenders the full list.
- list virtualisation, lazy loading of posts/audio

4. ESM

- realised ESM is now supported on most browsers, would use that to better handle modularisation of code.
