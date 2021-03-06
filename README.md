## This is a working model of my Puzlr App.

**Puzlr connects to the Unsplash API and turns every one of their photos into an NxN Grid puzl where N can be anything from 2 to 9.** 

Current features:
  - tracks favorites
  - search feature for types of photos
  - search by user => user:username
    - or click on their name on the puzl page
  - high score tracking on the puzl
  - random puzl
  - copy puzlID to clipboard
  - cheat mode
  - user profiles (have to be logged in to see)
  - timer and time tracking
  - refresh same puzle
  
TODO (short term): 

 - [x] ** Important ** With the current system of shuffling it's possible to end up with two tiles switched on the
 3x3 board, which is an impossible solve!
 - [x] engine rebuild also fixed cheatmode bug where it would incorrectly highlight wrong tiles
 - [x] rebuild game engine to track moves in an in-memory array instead of the current method which just keeps track of the portion of the background image showing in each tile (this will also fix that first problem)
 - [x] move API keys to backend
 - [x] add a user profile page
   - [x] favorites
   - [x] records
   - [x] history
   - [x] ~~if the person looking at the profile page is the user, then also display options for customizing their avatar~~
- [ ] ~~allow customization of avatar~~
   - [ ] ~~switch between [Robohash](https://robohash.org/) sets~~

    (cancelled this because all the sets at Robohash weren't complete)

- [x] Add a landing page for first-timers (right now it goes straight to the search page)

- [x] Add scoring system. It already tracks number of moves, but now it'll award a $score based on number of moves and grid size
    
- [x] add search by puzl ID (added copypuzlIDToClipboard so you can paste into url)

TODO (long term):

 - allow user to return to same puzl after logging in
 - allow user to login after a win and still save the win
 - [x] allow following a link to a specific puzl from an external source to maintain your logged-in state

Sheesh...that's great, but what're we gonna do _after_ lunch?