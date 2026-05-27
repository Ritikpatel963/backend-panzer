'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import PageTitle from '@/components/PageTitle';
import { Alert, Button, Card, Spinner, Table } from 'react-bootstrap';
import { api } from '@/lib/apiClient';

const pickList = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.items)) return res.items;
  if (Array.isArray(res.results)) return res.results;
  return [];
};

const EntityListPage = ({ title, subTitle, endpoint, columns, actions }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cols = useMemo(() => columns || [], [columns]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    api
      .get(endpoint)
      .then((res) => {
        if (!mounted) return;
        setRows(pickList(res));
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load data');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return (
    <>
      <PageTitle title={title} subTitle={subTitle} />

      <Card className="mt-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-muted fs-13">Total: {rows?.length ?? 0}</div>
            {actions?.primary ? (
              <Button as={Link} href={actions.primary.href} variant="primary">
                {actions.primary.label}
              </Button>
            ) : null}
          </div>

          {error ? <Alert variant="danger">{error}</Alert> : null}

          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    {cols.map((c) => (
                      <th key={c.key}>{c.label}</th>
                    ))}
                    {actions?.row ? <th className="text-end">Actions</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {rows?.length ? (
                    rows.map((row) => (
                      <tr key={row._id || row.id || JSON.stringify(row)}>
                        {cols.map((c) => (
                          <td key={c.key}>{c.render ? c.render(row) : row?.[c.key] ?? '-'}</td>
                        ))}
                        {actions?.row ? (
                          <td className="text-end">
                            {actions.row.map((a) => (
                              <Button
                                key={a.label}
                                as={Link}
                                href={a.href(row)}
                                size="sm"
                                variant={a.variant || 'outline-secondary'}
                                className="ms-2"
                              >
                                {a.label}
                              </Button>
                            ))}
                          </td>
                        ) : null}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={(cols.length || 1) + (actions?.row ? 1 : 0)} className="text-center py-4">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EntityListPage;

