## This is a working model of my Puzlr App.

**Puzlr connects to the Unsplash API and turns every one of their photos into an NxN Grid Puzzle where N can be anything from 2 to 9.** 

Current features:
  - tracks favorites
  - search feature for types of photos
  - search by user => user:username
    - or click on their name on the puzzle page
  - high score tracking on the puzzle
  - random puzzle
  - cheat mode

TODO (short term): 

 - [x] ** Important ** With the current system of shuffling it's possible to end up with two tiles switched on the
 3x3 board, which is an impossible solve!
 - [x] engine rebuild also fixed cheatmode bug where it would incorrectly highlight wrong tiles
 - [x] rebuild game engine to track moves in an in-memory array instead of the current method which just keeps track of the portion of the background image showing in each tile (this will also fix that first problem)
 - [x] move API keys to backend
 - [ ] add a user profile page
   - [ ] favorites
   - [ ] records
   - [ ] history
   - [ ] if the person looking at the profile page is the user, then also display options for customizing their avatar
- [ ] allow customization of avatar
   - [ ] switch between [Robohash](https://robohash.org/) sets
- [ ] add search by puzzle ID

TODO (long term):

 - allow user to return to same puzzle after logging in
 - allow user to login after a win and still save the win
 - allow following a link to a specific puzzle from an external source to maintain your logged-in state

Sheesh...that's great, but what're we gonna do _after_ lunch?