import React, { useState } from 'react';

const InstagramScraper = () => {
  // State to manage inputs and output
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Function to handle the scraping request
  const handleScrape = async () => {
    setLoading(true);
    setOutput([]);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/scrape_instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          email: email,
          password: password,
          hashtag: hashtag,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response

      if (data.error) {
        setError(data.error);
      } else {
        setOutput(data); // Store the raw data for CSV conversion
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while scraping Instagram.');
    } finally {
      setLoading(false);
    }
  };

  // Convert scraped data to CSV
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    const csvRows = [];

    // Get headers
    const headers = Object.keys(array[0]);
    csvRows.push(headers.join(','));

    // Format rows
    for (const row of array) {
      csvRows.push(headers.map(header => JSON.stringify(row[header] || '')).join(','));
    }

    return csvRows.join('\n');
  };

  // Download CSV of the scraped data
  const downloadCSV = () => {
    const csv = convertToCSV(output);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'scraped_posts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center">
      <h2 className="text-4xl text-center text-blue-950 font-bold mb-8">Instagram Scraper</h2>

      <div className="w-full max-w-lg space-y-4">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Instagram email"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Instagram password"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Hashtag Input */}
        <input
          type="text"
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
          placeholder="Enter the hashtag (without #)"
          className="w-full p-4 text-lg border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Scrape Button */}
        <div className="flex justify-center">
          <button
            onClick={handleScrape}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? 'Scraping...' : 'Start Scraping'}
          </button>
        </div>

      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-lg mt-10 p-4 bg-red-100 text-red-700 border-2 border-red-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Output Box */}
      <div className="w-full max-w-lg mt-10 p-4 bg-white border-2 border-gray-200 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Output:</h3>
        <div className="text-gray-700">
          {output.length > 0 ? (
            <>
              <button 
                className="mb-3 mt-3 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
                onClick={downloadCSV}
              >
                Download CSV
              </button>
              <div className="space-y-4">
                {output.map((post, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p><strong>Username:</strong> {post.Username || 'N/A'}</p>
                    {/* <p><strong>Post Timing:</strong> {post['Post Timing'] || 'N/A'}</p> */}
                    <p><strong>Caption:</strong> {post.Caption || 'No caption'}</p>
                    <p><strong>Image:</strong> <a href={post['Image URL']} target="_blank" rel="noopener noreferrer">View Image</a></p>
                    <p><strong>Post URL:</strong> <a href={post['Post URL']} target="_blank" rel="noopener noreferrer">{post['Post URL']}</a></p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            'No data available. Please enter the required details and scrape.'
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramScraper;
