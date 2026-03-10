import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { MEDIA_BASE_URL } from '../services/api';
import './BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await getBlogById(id);
      setBlog(response);
    } catch (err) {
      setError(err.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blog) return <div className="alert alert-warning">Blog not found</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <article>
            <h1 className="text-center mb-4">{blog.title}</h1>
            <div className="text-center mb-4">
              <span className="text-muted me-3">
                <i className="fas fa-user me-1"></i>
                {blog.authorName}
              </span>
              <span className="text-muted me-3">
                <i className="fas fa-calendar me-1"></i>
                {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
              </span>
              <span className="text-muted">
                <i className="fas fa-folder me-1"></i>
                {blog.category}
              </span>
            </div>
            
            {blog.excerpt && (
              <div className="lead mb-4 text-muted">
                {blog.excerpt}
              </div>
            )}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage; 