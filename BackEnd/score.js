/*                 
 * Author: Mohamedamin Mohamed                             
 * Modified: 11/21/2023                    
 * Description: This file defines two asynchronous functions: saveHighScore and getHighScores.
 * The saveHighScore function takes two parameters: initials (a string representing the player's initials) and score (a number representing the player's score). It asynchronously sends a POST request 
 * to the '/saveHighScore' endpoint on the server, including the player's initials and score in the request body. If the request is successful, 
 * it logs a message indicating that the high score was saved successfully. Otherwise, it throws an error with the server's response status and status text.
 * The getHighScores function asynchronously sends a GET request to the '/getHighScores' endpoint on the server. If the request is successful, it parses the JSON data from the response body 
 * and returns an array of high scores objects, each typically containing properties like initials and score. Otherwise, it logs an error message and re-throws the error for the caller to handle.
 */

/**
 * This function saves a high score to the server.
 *
 * @param {string} initials - The player's initials.
 * @param {number} score - The player's score.
 * @throws {Error} If the server request fails.
 * @returns {Promise<void>} A promise that resolves when the high score is saved successfully.
 */
const saveHighScore = async (initials, score) => {
    try {
  
      /* Uses the Fetch API to asynchronously send a POST request to the '/saveHighScore' endpoint.
         The 'await' keyword ensures that the fetch operation completes before moving on.
         The response from the server is stored in the 'response' variable. */
      const response = await fetch('/saveHighScore', {
        method: 'POST',                        // Specify the HTTP method as POST
        headers: { 'Content-Type': 'application/json' },  // Set the content type to JSON
        body: JSON.stringify({ initials, score }),       // Convert data to JSON format and include it in the request body
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save content: ${response.status} - ${response.statusText}`);
      }
      console.log('High score saved successfully.');
    } catch (error) {
      console.error('Error:', error.message);
      throw error; // Re-throw the error for the caller to handle if needed
    }
  };
  
  /**
   * This function retrieves the high scores from the server.
   *
   * @throws {Error} If the server request fails.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of high scores.
   * Each high score object typically contains properties like 'initials' and 'score'.
   */
  
  const getHighScores = async () => {
    /*    Use the Fetch API to asynchronously send a GET request to the '/getHighScores' endpoint.
          The 'await' keyword ensures that the fetch operation completes before moving on.
          The response from the server is stored in the 'response' variable.    */
    let response;
    try {
      response = await fetch('/getHighScores');
  
      // Check if the response status is OK; if not, throw an error indicating a server error.
      if (!response.ok) {
        throw new Error('Server Error');
      }
  
      // Parse the JSON data from the response body.
      const data = await response.json();
      console.log(data[5]); // For testing purpose
  
      // Return the parsed data representing high scores.
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch operation.
      console.error('Could not load High Scores', error);
  
      // Re-throw the error for the caller to handle if needed.
      throw error;
    }
  }
  
  