import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { MEDIA_BASE_URL } from '../services/api';
import { FaSearch, FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';
import './BlogPage.css';

const DEFAULT_BLOG_IMAGE = 'https://placehold.co/600x400/e9ecef/495057?text=Blog+Image';

const BLOG_CATEGORIES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'tin-tuc', label: 'Tin tức' },
  { value: 'su-kien', label: 'Sự kiện' },
  { value: 'suc-khoe', label: 'Sức khỏe' },
  { value: 'dinh-duong', label: 'Dinh dưỡng' },
  { value: 'benh-hoc', label: 'Bệnh học' },
  { value: 'tu-van', label: 'Tư vấn' }
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt?.toLowerCase().includes(term)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBlogs(filtered);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const featuredBlogs = filteredBlogs.slice(0, 5);
  const otherBlogs = filteredBlogs.slice(5);

  return (
    <div className="blog-page">
      {/* Category Navigation */}
      <div className="category-nav">
        <div className="container">
          <div className="category-list">
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category.value}
                className={`category-item ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>

      <div className="container">
        {/* Featured Section */}
        {featuredBlogs.length > 0 && (
          <div className="featured-section">
            <div className="row">
              {/* Main Featured Article */}
              <div className="col-lg-8">
                <div className="main-featured">
                  <Link to={`/blog/${featuredBlogs[0].id}`} className="featured-card">
                    <div className="image-wrapper">
                      <img
                        src={featuredBlogs[0].featuredImage ? `${MEDIA_BASE_URL}${featuredBlogs[0].featuredImage}` : DEFAULT_BLOG_IMAGE}
                        alt={featuredBlogs[0].title}
                        onError={(e) => { e.target.src = DEFAULT_BLOG_IMAGE }}
                      />
                      <div className="overlay">
                        <span className="category-tag">{BLOG_CATEGORIES.find(cat => cat.value === featuredBlogs[0].category)?.label}</span>
                        <h2>{featuredBlogs[0].title}</h2>
                        <p className="excerpt">{featuredBlogs[0].excerpt}</p>
                        <div className="meta">
                          <span><FaClock /> {formatDate(featuredBlogs[0].createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Side Featured Articles */}
              <div className="col-lg-4">
                <div className="side-featured">
                  {featuredBlogs.slice(1, 5).map((blog) => (
                    <Link key={blog.id} to={`/blog/${blog.id}`} className="side-featured-item">
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            src={blog.featuredImage ? `${MEDIA_BASE_URL}${blog.featuredImage}` : DEFAULT_BLOG_IMAGE}
                            alt={blog.title}
                            onError={(e) => { e.target.src = DEFAULT_BLOG_IMAGE }}
                          />
                        </div>
                        <div className="col-8">
                          <div className="content">
                            <span className="category">{BLOG_CATEGORIES.find(cat => cat.value === blog.category)?.label}</span>
                            <h3>{blog.title}</h3>
                            <div className="meta">
                              <span><FaClock /> {formatDate(blog.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Articles Grid */}
        {otherBlogs.length > 0 && (
          <div className="articles-grid">
            <div className="row">
              {otherBlogs.map((blog) => (
                <div key={blog.id} className="col-md-6 col-lg-4">
                  <Link to={`/blog/${blog.id}`} className="article-card">
                    <div className="image-wrapper">
                      <img
                        src={blog.featuredImage ? `${MEDIA_BASE_URL}${blog.featuredImage}` : DEFAULT_BLOG_IMAGE}
                        alt={blog.title}
                        onError={(e) => { e.target.src = DEFAULT_BLOG_IMAGE }}
                      />
                      <span className="category-tag">{BLOG_CATEGORIES.find(cat => cat.value === blog.category)?.label}</span>
                    </div>
                    <div className="content">
                      <h3>{blog.title}</h3>
                      <p className="excerpt">{blog.excerpt}</p>
                      <div className="meta">
                        <span><FaClock /> {formatDate(blog.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredBlogs.length === 0 && (
          <div className="no-results">
            <h3>Không tìm thấy bài viết nào</h3>
            <p>Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

