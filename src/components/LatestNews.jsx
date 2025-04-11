import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

const LatestNews = () => {
    const [news, setNews] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
    const [error, setError] = React.useState(null); // State for error handling

    const API_KEY = "52f0dd7f328b41e094f13691e93202f3"; // actual api key

    const fetchLatestNewsData = async () => {
        if (!searchTerm.trim()) return; // Check if searchTerm is empty

        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                setNews(data.articles); // Set news articles
                setError(null); 
            } else {
                setError("No articles found."); // Set error message if no articles
                setNews([]); 
            }
        } catch (error) {
            console.error("Error fetching news data:", error);
            setError("Failed to fetch news data."); // Set error message
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLatestNewsData();
    };

    return (
        <>
            <div className="min-h-screen bg-gray-300 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto md:max-w-2xl">
                    <div className="text-center p-4">
                        <h1 className="text-4xl font-semibold">Latest News</h1>
                    </div>
                </div>
                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-4 mb-8 max-w-5xl mx-auto">
                    <div className="flex">
                        <input
                            type="text"
                            value={searchTerm} // Use searchTerm for input value
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
                            placeholder="Search"
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type='submit'
                            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg disabled:bg-blue-400 transition duration-200'
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Error Message */}
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                {/* Cards */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {news.length > 0 ? (
                        news.map((newsItem, index) => (
                            <div key={index} className="bg-white shadow rounded-lg h-[450px] overflow-hidden">
                                <img
                                    src={newsItem.urlToImage || "https://placehold.co/100x100"}
                                    alt={newsItem.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className='p-4'>
                                    <h2 className="mt-4 text-lg font-semibold line-clamp-2">{newsItem.title}</h2>
                                    <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                        {newsItem.description || "No description available."}
                                    </p>
                                </div>
                                <div className='link flex justify-between p-4'>
                                    <h4 className='text-gray-600'>The Verge</h4>
                                    <a href={newsItem.url} className='text-blue-700 flex items-center gap-1 hover:text-blue-900'>
                                        Read more <ArrowRight size={10} />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        !error && <div className="text-gray-600 max-w-md mx-auto md:max-w-2xl text-center">No news articles to display.</div> // error message
                    )}
                </div>
            </div>
        </>
    );
}

export default LatestNews;