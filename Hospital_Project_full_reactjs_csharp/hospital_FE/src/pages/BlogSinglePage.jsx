import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BlogSinglePage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog post');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blog) return <div className="alert alert-warning">Blog post not found</div>;

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">{blog.title}</h1>
            <span className="item">
              <Link to="/" className="">
                Trang chủ
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">
              <Link to="/blog" className="">
                Tin tức
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;{" "}
            <span className="item">{blog.title}</span>
          </div>
        </div>
      </section>

      <section id="blog-single" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="post-header mb-5">
                <div className="meta-post">
                  <span className="post-date">
                    {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="meta-divider">|</span>
                  <span className="post-category">{blog.category}</span>
                  <span className="meta-divider">|</span>
                  <span className="post-author">By {blog.author.fullName}</span>
                </div>
              </div>

              {blog.featuredImage && (
                <div className="featured-image mb-5">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="img-fluid rounded"
                  />
                </div>
              )}

              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSinglePage;
