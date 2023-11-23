/*                 
 * Author: Mohamedamin Mohamed                             
 * Modified: 11/21/2023                    
 * Description: This express application manages high scores for the game using a JSON file. It has routes to save and retrieve high scores. 
 * The application uses the 'fs' module to read and write high scores from a JSON file. It also uses the 'bodyParser' module to parse request bodies, and the 'express.json()' and 'express.static()' 
 * middlewares to handle JSON requests and serve static files, respectively.
 */

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an Express application
const app = express();

// Middleware to parse URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Set the port for the server to listen on
const port = 5500;

// Route to serve the main game HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game.html');
});

// Middleware to parse JSON request bodies
app.use(express.json());

/*
 *  Route to handle POST requests for saving high scores. When a user submits a high score, the application extracts the score data from the request body, 
*   reads the existing high scores from the JSON file, appends the new score to the array, sorts the high scores based on score, assigns ranks to users, 
*   reformats the data, updates the JSON file with the formatted scores, and returns a success response   */
app.post('/saveHighScore', (req, res) => {
  // Extract the request body
  const body = req.body;
  console.log(body);

  // Read high scores from file
  fs.readFile('high_scores.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }

    let scores;

    try {
      scores = JSON.parse(data);
    } catch (err) {
      console.error('JSON Error', err);
      return res.status(500).send('JSON error');
    }

    // Add new high score to the array
    scores.highScores.push(body);

    // Sort the high scores array based on score in descending order
    scores.highScores.sort((a, b) => b.score - a.score);

    // Assign ranks to users
    scores.highScores.forEach((user, index) => {
      user.rank = index + 1;
    });

    // Create a new array with the desired structure(RANK, INITIALS AND SCORE)
    const newScores = scores.highScores.map((user) => ({
      rank: user.rank,
      initials: user.initials,
      score: user.score,
    }));

    // Update scores object with the new formatted array
    scores.highScores = newScores;

    /*  
    *  Write the updated high scores back to the file. Below 2 is used as the number of spaces to use for indentation. In this case, 2 spaces are used, 
    *  making the resulting JSON string more human-readable with proper indentation.  */
    fs.writeFile('high_scores.json', JSON.stringify(scores, null, 2), (err) => {
      if (err) {
        return res.status(500).send('File write error');
      }

      res.status(201).send('Success');
    });
  });
});

/*  Route to handle GET requests for retrieving high scores.  When a request is made to retrieve high scores, 
*   the application reads the JSON file containing the high scores, parses the JSON data, 
*   and returns the high scores as a JSON response.  */
app.get('/getHighScores', (req, res) => {
  // Read high scores from file
  fs.readFile('high_scores.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Cannot read from file');
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData.highScores);
    } catch (err) {
      res.status(500).send('Parse error');
    }
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://locahost:${port}`);
});
