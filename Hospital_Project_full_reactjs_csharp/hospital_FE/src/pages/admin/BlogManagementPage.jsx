import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { getAllBlogsAdmin, createBlog, updateBlog, deleteBlog, MEDIA_BASE_URL } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ImageUploader from '../../components/common/ImageUploader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './BlogManagementPage.css';

const DEFAULT_BLOG_IMAGE = '/images/default-blog.jpg';

const BlogManagementPage = () => {
  const BLOG_CATEGORIES = [
    { value: 'tin-tuc', label: 'Tin tức' },
    { value: 'su-kien', label: 'Sự kiện' },
    { value: 'suc-khoe', label: 'Sức khỏe' },
    { value: 'dinh-duong', label: 'Dinh dưỡng' },
    { value: 'benh-hoc', label: 'Bệnh học' },
    { value: 'tu-van', label: 'Tư vấn' }
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState('Draft');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogsAdmin();
      setBlogs(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const handleShowModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setTitle(blog.title || '');
      setContent(blog.content || '');
      setCategory(blog.category || '');
      setFeaturedImage(blog.featuredImage || '');
      setExcerpt(blog.excerpt || '');
      setStatus(blog.status || 'Draft');
      setSelectedImage(null);
    } else {
      setEditingBlog(null);
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setFeaturedImage('');
    setExcerpt('');
    setStatus('Draft');
    setEditingBlog(null);
    setError(null);
    setSelectedImage(null);
  };

  const handleSubmit = async (e, publishStatus) => {
    if (e) e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('excerpt', excerpt || '');
      
      // Đảm bảo status được gửi đúng
      const finalStatus = publishStatus || status;
      formData.append('status', finalStatus);
      
      // Log để kiểm tra
      console.log('Sending blog with status:', finalStatus);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      if (selectedImage) {
        formData.append('featuredImage', selectedImage);
      }

      let response;
      if (editingBlog) {
        response = await updateBlog(editingBlog.id, formData);
      } else {
        response = await createBlog(formData);
      }

      console.log('API Response:', response);
      handleCloseModal();
      await fetchBlogs();
      
    } catch (err) {
      console.error('Error saving blog:', err);
      setError(err.response?.data?.message || 'Không thể lưu bài viết. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Xác nhận xóa',
      message: 'Bạn có chắc chắn muốn xóa bài viết này không?',
      buttons: [
        {
          label: 'Có',
          onClick: async () => {
            try {
              setDeleting(true);
              await deleteBlog(id);
              await fetchBlogs();
            } catch (err) {
              setError('Failed to delete blog');
            } finally {
              setDeleting(false);
            }
          }
        },
        {
          label: 'Không',
          onClick: () => {}
        }
      ]
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý bài viết</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          <i className="fas fa-plus-circle me-2"></i>Thêm bài viết mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: '80px' }}>Hình ảnh</th>
            <th style={{ width: '30%' }}>Tiêu đề</th>
            <th style={{ width: '15%' }}>Danh mục</th>
            <th style={{ width: '20%' }}>Trạng thái</th>
            <th style={{ width: '15%' }}>Ngày tạo</th>
            <th style={{ width: '15%' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <img
                  src={blog.featuredImage ? `${MEDIA_BASE_URL}${blog.featuredImage}` : 'https://placehold.co/600x400/e9ecef/495057?text=Blog+Image'}
                  alt={blog.title}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/e9ecef/495057?text=Blog+Image';
                  }}
                />
              </td>
              <td>
                <div className="blog-title-cell">
                  <strong>{blog.title}</strong>
                  <div className="row-actions">
                    <span className="edit">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleShowModal(blog); }}>
                        Chỉnh sửa
                      </a> | 
                    </span>
                    <span className="delete">
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDelete(blog.id); }}>
                        Xóa
                      </a>
                    </span>
                  </div>
                </div>
              </td>
              <td>{blog.category}</td>
              <td>
                <span className={`status-badge ${blog.status.toLowerCase()}`}>
                  {blog.status === 'Published' ? 'Đã xuất bản' : 'Bản nháp'}
                </span>
              </td>
              <td>{new Date(blog.createdAt).toLocaleDateString('vi-VN')}</td>
              <td>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowModal(blog)}
                >
                  <i className="fas fa-edit me-1"></i>Sửa
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(blog.id)}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Đang xóa...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash-alt me-1"></i>Xóa
                    </>
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className="blog-editor-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBlog ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="blog-editor-container">
            <div className="editor-main">
              <div className="editor-content">
                <Form.Group className="mb-4">
                  <Form.Label className="required">Tiêu đề bài viết</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề bài viết"
                    className="title-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                  <Editor
                    apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'emoticons'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | image media link emoticons | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      language: 'vi',
                      branding: false,
                      promotion: false,
                      skin: 'oxide',
                      icons: 'thin',
                      file_picker_types: 'image',
                      image_title: true,
                      automatic_uploads: true,
                      images_upload_handler: async (blobInfo, progress) => {
                        try {
                          const formData = new FormData();
                          formData.append('file', blobInfo.blob(), blobInfo.filename());

                          const token = localStorage.getItem('authToken');
                          if (!token) {
                            throw new Error('Không tìm thấy token xác thực');
                          }

                          const response = await fetch(`${import.meta.env.VITE_API_URL}/Image/upload`, {
                            method: 'POST',
                            body: formData,
                            headers: {
                              'Authorization': `Bearer ${token}`
                            }
                          });

                          if (!response.ok) {
                            const errorData = await response.text();
                            throw new Error(`Lỗi từ server: ${errorData}`);
                          }

                          const data = await response.json();
                          return data.location;
                        } catch (error) {
                          console.error('Lỗi khi tải lên hình ảnh:', error);
                          throw new Error(`Lỗi tải lên: ${error.message}`);
                        }
                      }
                    }}
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="editor-sidebar">
              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <h5>Xuất bản</h5>
                </div>
                <div className="sidebar-section-content">
                  <div className="status-radio-group mb-3">
                    <label className={`status-radio-option ${status === 'Draft' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Draft"
                        checked={status === 'Draft'}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      Bản nháp
                    </label>
                    <label className={`status-radio-option ${status === 'Published' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value="Published"
                        checked={status === 'Published'}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      Xuất bản
                    </label>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={(e) => handleSubmit(e, status)}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Đang lưu...
                        </>
                      ) : (
                        <>Lưu {status === 'Published' ? '& Xuất bản' : 'bản nháp'}</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <h5>Hình ảnh đại diện</h5>
                </div>
                <div className="sidebar-section-content">
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    defaultImage={editingBlog?.featuredImage ? `${MEDIA_BASE_URL}${editingBlog.featuredImage}` : null}
                  />
                </div>
              </div>

              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <h5>Danh mục</h5>
                </div>
                <div className="sidebar-section-content">
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="sidebar-section">
                <div className="sidebar-section-header">
                  <h5>Tóm tắt</h5>
                </div>
                <div className="sidebar-section-content">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Nhập tóm tắt bài viết"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BlogManagementPage; 