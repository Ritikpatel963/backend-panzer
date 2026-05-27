'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Form, Row, Spinner, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFormInput from '@/components/form/TextFormInput';
import { api } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/apiEndpoints';

const schema = yup.object({
  title: yup.string().trim().required('Title is required'),
  excerpt: yup.string().trim().max(300, 'Max 300 characters').nullable(),
  content: yup.string().trim().required('Content is required'),
  tags: yup.string().nullable(),
  status: yup.string().oneOf(['draft', 'published']).required()
});

const toPayload = (values) => {
  const tags =
    values.tags && typeof values.tags === 'string'
      ? values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return {
    title: values.title,
    excerpt: values.excerpt || '',
    content: values.content,
    status: values.status,
    tags
  };
};

const PostEditor = ({ mode, postId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const defaultValues = useMemo(
    () => ({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      status: 'draft'
    }),
    []
  );

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (mode !== 'edit' || !postId) return;
    let mounted = true;
    setLoading(true);
    setError('');

    api
      .get(`${ENDPOINTS.posts}/${postId}`)
      .then((res) => {
        if (!mounted) return;
        const post = res?.data || res?.post || res;
        reset({
          title: post?.title || '',
          excerpt: post?.excerpt || '',
          content: post?.content || '',
          tags: Array.isArray(post?.tags) ? post.tags.join(', ') : '',
          status: post?.status || 'draft'
        });
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load post');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [mode, postId, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setSaving(true);
    setError('');
    try {
      const payload = toPayload(values);
      if (mode === 'create') {
        await api.post(ENDPOINTS.posts, payload);
      } else {
        await api.patch(`${ENDPOINTS.posts}/${postId}`, payload);
      }
      router.push('/posts');
      router.refresh();
    } catch (e) {
      setError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  });

  return (
    <Card className="mt-3">
      <Card.Body>
        {error ? <Alert variant="danger">{error}</Alert> : null}

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Form onSubmit={onSubmit}>
            <Row className="g-3">
              <Col md={8}>
                <TextFormInput
                  control={control}
                  name="title"
                  label="Title"
                  placeholder="Post title"
                  className="bg-light bg-opacity-50 border-light py-2"
                />
              </Col>
              <Col md={4}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        {...field}
                        className="bg-light bg-opacity-50 border-light py-2"
                        isInvalid={Boolean(fieldState.error?.message)}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </Form.Select>
                      {fieldState.error?.message ? (
                        <Form.Control.Feedback type="invalid">{fieldState.error.message}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  )}
                />
              </Col>

              <Col md={12}>
                <TextFormInput
                  control={control}
                  name="excerpt"
                  label="Excerpt (optional)"
                  placeholder="Short summary for listings (max 300 chars)"
                  className="bg-light bg-opacity-50 border-light py-2"
                />
              </Col>

              <Col md={12}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Form.Group>
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={12}
                        placeholder="Write your post content..."
                        className="bg-light bg-opacity-50 border-light"
                        {...field}
                        isInvalid={Boolean(fieldState.error?.message)}
                      />
                      {fieldState.error?.message ? (
                        <Form.Control.Feedback type="invalid">{fieldState.error.message}</Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                  )}
                />
              </Col>

              <Col md={12}>
                <TextFormInput
                  control={control}
                  name="tags"
                  label="Tags (comma separated)"
                  placeholder="e.g. security, vulnerability, pentest"
                  className="bg-light bg-opacity-50 border-light py-2"
                />
              </Col>

              <Col md={12} className="d-flex justify-content-end gap-2">
                <Button variant="outline-secondary" type="button" onClick={() => router.push('/posts')}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostEditor;

