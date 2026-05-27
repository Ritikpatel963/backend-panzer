'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Badge, Button, Card, Form, Spinner } from 'react-bootstrap';
import { api } from '@/lib/apiClient';
import { ENDPOINTS } from '@/lib/apiEndpoints';

const LeadDetails = ({ leadId }) => {
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    api
      .get(`${ENDPOINTS.leads}/${leadId}`)
      .then((res) => {
        if (!mounted) return;
        const item = res?.data || res?.lead || res;
        setLead(item);
        setStatus(item?.status || 'new');
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load lead');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [leadId]);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      await api.patch(`${ENDPOINTS.leads}/${leadId}`, { status });
      router.refresh();
    } catch (e) {
      setError(e?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="mt-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h4 className="mb-1">{lead?.name || lead?.fullName || 'Lead'}</h4>
            <div className="text-muted">{lead?.email || '-'}</div>
          </div>
          <Badge bg="secondary" className="text-uppercase">
            {lead?.status || 'new'}
          </Badge>
        </div>

        <hr />

        <div className="mb-2">
          <div className="text-muted fs-13">Message</div>
          <div>{lead?.message || lead?.note || '-'}</div>
        </div>

        <div className="mb-2">
          <div className="text-muted fs-13">Created</div>
          <div>{lead?.createdAt ? new Date(lead.createdAt).toLocaleString() : '-'}</div>
        </div>

        <hr />

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
            <option value="spam">Spam</option>
          </Form.Select>
        </Form.Group>

        {error ? <Alert variant="danger">{error}</Alert> : null}

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => router.push('/leads')}>
            Back
          </Button>
          <Button variant="primary" disabled={saving} onClick={save}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LeadDetails;

