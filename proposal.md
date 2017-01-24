#Fruitswap

## Background
Fruitswap is a web game inspired by Bejeweled. This game is a type of
match 3 game where the player swaps two fruits in adjacent squares. If
the swap produces a match of at least three in a row of the same fruit,
the fruits get removed and more fruit fall down from the top of the
screen to fill the empty space. Otherwise, the move is invalid and the
two fruits are automatically swapped back. The player's goal is to match
as many fruits as possible within a given time period to get the highest
score possible.

## Functionality and MVP
In the Fruitswap game, players will be able to:
* Start, pause, and reset the game board
* Swap two fruits using drag and drop
* Keep track of their high scores

In addition, this project will include:
* An About modal describing the background and rules of the game
* A production Readme

## Wireframes

![Fruitswap layout](./Fruitswap.png)

## Architecture and Technologies

`board.js`: this script will handle the logic for creating and updating
the necessary element and rendering them to the DOM. This will include
the fruit object which has a type.

`game.js`: this script will be responsible for the logic behind the game.
It will check the board for any matches and will tell the board if
it needs to be updated.

## Implementation Timeline

**Day 1:** Set up all the necessary files. Create webpack.config.js as
well as package.json. Set up a starting board filled with fruit objects.
Also make sure the starting board has no matches.

**Day 2:** Implement drag and drop for the fruit using javascript's
built in functions. Start writing the logic for handling matching fruit,
such as 3, 4, and 5 in a row, T, and L matches.

**Day 3:** Finish matching fruit logic and replacing the matched fruit
with new fruit. Add a scoring system which adds the score based on the
type of match made.

**Day 4:** Install controls for starting and pausing the game. Style
the frontend, making it polished and professional. Add music and sound
effects to go with the game.

## Bonus Features
* Add options for different game modes
