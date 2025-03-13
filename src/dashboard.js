// dashboard.js

// Function to fetch feedback data from feedback.json
async function fetchFeedback() {
    try {
      const response = await fetch('../data/feedback.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching feedback data:', error);
      return [];
    }
  }
  
  // Function to prioritize feedback based on criteria
  function prioritizeFeedback(feedbackData) {
    // Calculate a simple score (50% urgency + 50% impact)
    feedbackData.forEach(item => {
      item.score = (item.urgency * 0.5) + (item.impact * 0.5);
    });
    // Sort feedback items in descending order by score
    feedbackData.sort((a, b) => b.score - a.score);
    // Return the top 5 feedback items
    return feedbackData.slice(0, 5);
  }
  
  // Function to render feedback into the table
  function renderDashboard(feedbackItems) {
    const tableBody = document.querySelector('#feedbackTable tbody');
    tableBody.innerHTML = '';
    feedbackItems.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.feedback}</td>
        <td>${item.urgency}</td>
        <td>${item.impact}</td>
        <td>${item.category}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Initialize the dashboard on DOM load
  async function initDashboard() {
    const feedbackData = await fetchFeedback();
    const topFeedback = prioritizeFeedback(feedbackData);
    renderDashboard(topFeedback);
  }
  
  document.addEventListener('DOMContentLoaded', initDashboard);  