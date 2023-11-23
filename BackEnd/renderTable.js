/*                 
 * Author: Mohamedamin Mohamed                         
 * Modified: 11/21/2023                    
 * Description:This file is responsible for retrieving high scores from the server, creating a table to display the high scores, 
 * and appending the table to a designated container on the webpage. 
 * It also handles error handling in case there are any issues retrieving or rendering the high scores.
 */

/**
 * This function renders a table dynamically with high scores.
 *
 * @throws {Error} If there is an error retrieving high scores or rendering the table.
 * @returns {Promise<void>} A promise that resolves when the table is rendered successfully.
 */
const renderTable = async () => {
    try {
      // Retrieve high scores
      const highScores = await getHighScores();
      console.log(highScores[4]); // For testing purpose
  
      // Create a table dynamically
      const table = document.createElement('table');
  
      // Create table headers
      const headers = ['Rank', 'Initials', 'Score'];
      const headerRow = document.createElement('tr');
  
      headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.style.color = 'red'; // Set color of headers
        headerRow.appendChild(th);
      });
  
      table.appendChild(headerRow);
  
      // Populate table body
      highScores.forEach((score) => {
        const tr = document.createElement('tr');
  
        /* Iterate over the values of the 'score' object and create a table cell ('td') for each value.
          Set the text content of the cell to the current 'value', then append the cell to the current table row ('tr').
          Finally, append the completed table row to the dynamically created table. */
        Object.values(score).forEach((value) => {
          const td = document.createElement('td');
          td.textContent = value;
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
  
      // Append the table to the container with id 'table-container'
      const tableContainer = document.getElementById('table-container');
      tableContainer.innerHTML = ''; // Clear previous content
      tableContainer.appendChild(table);
    }
    catch (error) {
      console.error('Error rendering table', error);
      throw error; // Re-throw the error for the caller to handle if needed
    }
  };
  