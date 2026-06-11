'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import PageTitle from '@/components/PageTitle'
import { MOCK_SOLUTIONS, type Solution } from '@/data/panzer/mock'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import styles from './SolutionsPanel.module.scss'

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = ['Security', 'Data Protection', 'Backup', 'Monitoring', 'Identity']
const PAGE_SIZES = [5, 10, 25, 50]

const EMPTY: Omit<Solution, 'id'> = {
  title: '',
  subtitle: '',
  description: '',
  category: 'Security',
  image: '',
  slug: '',
  order: 1,
  status: 'active',
}

// ── Add / Edit Modal ──────────────────────────────────────────────────────────

interface ModalProps {
  mode: 'add' | 'edit'
  initial: Omit<Solution, 'id'>
  onSave: (data: Omit<Solution, 'id'>) => void
  onClose: () => void
}

const SolutionModal = ({ mode, initial, onSave, onClose }: ModalProps) => {
  const [form, setForm] = useState(initial)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (!form.description.trim()) { toast.error('Description is required'); return }
    onSave(form)
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── Modal header ── */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <span className={styles.modalTitleIcon}>
              <IconifyIcon icon={mode === 'add' ? 'tabler:circle-plus' : 'tabler:pencil'} />
            </span>
            <h3>{mode === 'add' ? 'Add New Solution' : 'Edit Solution'}</h3>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <IconifyIcon icon="tabler:x" />
          </button>
        </div>

        {/* ── Modal form ── */}
        <form onSubmit={submit} className={styles.modalForm}>
          <div className={styles.formGrid}>

            <label className={styles.field}>
              <span>TITLE <em>*</em></span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Scoped DLP with UEBA"
                autoFocus
              />
            </label>

            <label className={styles.field}>
              <span>SUBTITLE</span>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
                placeholder="e.g. Data Leak Prevention"
              />
            </label>

            <label className={styles.field}>
              <span>SLUG</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="custom-slug-here"
              />
            </label>

            <div className={styles.fieldRow}>
              <label className={styles.field}>
                <span>CATEGORY</span>
                <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className={styles.field}>
                <span>ORDER</span>
                <input
                  type="number"
                  min={1}
                  value={form.order}
                  onChange={(e) => set('order', Number(e.target.value))}
                />
              </label>
              <label className={styles.field}>
                <span>STATUS</span>
                <select value={form.status} onChange={(e) => set('status', e.target.value as Solution['status'])}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>DESCRIPTION <em>*</em></span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Short description shown on the solution card..."
              />
            </label>

            <label className={styles.field}>
              <span>IMAGE PATH</span>
              <input
                type="text"
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                placeholder="/assets/images/service/..."
              />
            </label>

          </div>

          {/* ── Modal footer ── */}
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              <IconifyIcon icon={mode === 'add' ? 'tabler:circle-plus' : 'tabler:device-floppy'} />
              {mode === 'add' ? 'Create Solution' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────

const DeleteModal = ({ title, onConfirm, onClose }: { title: string; onConfirm: () => void; onClose: () => void }) => (
  <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
    <div className={clsx(styles.modal, styles.modalSm)} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <div className={styles.modalTitle}>
          <span className={clsx(styles.modalTitleIcon, styles.modalTitleIconDanger)}>
            <IconifyIcon icon="tabler:alert-triangle" />
          </span>
          <h3>Delete Solution</h3>
        </div>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <IconifyIcon icon="tabler:x" />
        </button>
      </div>
      <div className={styles.deleteBody}>
        <p>Are you sure you want to delete <strong>&ldquo;{title}&rdquo;</strong>?<br />This action cannot be undone.</p>
        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="button" className={styles.deleteBtn} onClick={onConfirm}>
            <IconifyIcon icon="tabler:trash" />
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)

// ── Main Panel ────────────────────────────────────────────────────────────────

const SolutionsPanel = () => {
  const [solutions, setSolutions] = useState<Solution[]>(MOCK_SOLUTIONS)
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; solution?: Solution } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Solution | null>(null)

  // Table state
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<keyof Solution>('order')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Derived filtered + sorted + paginated data
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return solutions
      .filter((s) =>
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const cmp = String(a[sortKey] ?? '').localeCompare(String(b[sortKey] ?? ''), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
  }, [solutions, search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const handleSort = (key: keyof Solution) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortIcon = ({ col }: { col: keyof Solution }) => (
    <span className={styles.sortIcon}>
      <IconifyIcon
        icon={sortKey === col
          ? (sortDir === 'asc' ? 'tabler:chevron-up' : 'tabler:chevron-down')
          : 'tabler:selector'}
      />
    </span>
  )

  // Save (add or edit)
  const handleSave = (data: Omit<Solution, 'id'>) => {
    if (modal?.mode === 'edit' && modal.solution) {
      setSolutions((prev) => prev.map((s) => s.id === modal.solution!.id ? { ...s, ...data } : s))
      toast.success('Solution updated successfully')
    } else {
      setSolutions((prev) => [...prev, { ...data, id: `s${Date.now()}` }])
      toast.success('Solution added successfully')
    }
    setModal(null)
  }

  // Delete
  const handleDelete = () => {
    if (!deleteTarget) return
    setSolutions((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    setDeleteTarget(null)
    toast.success('Solution deleted')
  }

  return (
    <>
      <PageTitle title="Solutions & Services" subTitle="Panzer IT" />

      {/* ── Full-width table card ── */}
      <div className={styles.card}>

        {/* Card header: title left, button right */}
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <IconifyIcon icon="tabler:shield-check" />
            <h3>Solutions List</h3>
            <span className={styles.totalBadge}>{solutions.length}</span>
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => setModal({ mode: 'add' })}
          >
            <IconifyIcon icon="tabler:plus" />
            Add New Solution
          </button>
        </div>

        {/* Table controls: page size left, search right */}
        <div className={styles.tableControls}>
          <div className={styles.pageSizeWrap}>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
              aria-label="Entries per page"
            >
              {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>entries per page</span>
          </div>
          <div className={styles.searchWrap}>
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              aria-label="Search solutions"
            />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thSort} onClick={() => handleSort('order')}># <SortIcon col="order" /></th>
                <th className={styles.thSort} onClick={() => handleSort('title')}>TITLE <SortIcon col="title" /></th>
                <th className={styles.thSort} onClick={() => handleSort('category')}>CATEGORY <SortIcon col="category" /></th>
                <th className={styles.thSort} onClick={() => handleSort('slug')}>SLUG <SortIcon col="slug" /></th>
                <th className={styles.thSort} onClick={() => handleSort('status')}>STATUS <SortIcon col="status" /></th>
                <th className={styles.thCenter}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? (
                paginated.map((s) => (
                  <tr key={s.id}>
                    <td className={styles.tdNum}>{s.order}</td>
                    <td>
                      <span className={styles.tdName}>{s.title}</span>
                      {s.subtitle && <span className={styles.tdSub}>{s.subtitle}</span>}
                    </td>
                    <td><span className={styles.catChip}>{s.category}</span></td>
                    <td><code className={styles.slugCode}>{s.slug || '—'}</code></td>
                    <td>
                      <span className={clsx(styles.badge, s.status === 'active' ? styles.badgeActive : styles.badgeInactive)}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.btnEdit}
                          onClick={() => setModal({ mode: 'edit', solution: s })}
                          title="Edit solution"
                        >
                          <IconifyIcon icon="tabler:pencil" />
                        </button>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => setDeleteTarget(s)}
                          title="Delete solution"
                        >
                          <IconifyIcon icon="tabler:trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.emptyRow}>
                    <IconifyIcon icon="tabler:shield-off" />
                    <span>No solutions found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            {filtered.length === 0
              ? 'No entries'
              : `Showing ${(page - 1) * pageSize + 1} to ${Math.min(page * pageSize, filtered.length)} of ${filtered.length} entries`}
          </span>
          <div className={styles.pageBtns}>
            <button type="button" onClick={() => setPage(1)} disabled={page === 1}>«</button>
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...')
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === '...'
                  ? <span key={`e${i}`} className={styles.ellipsis}>…</span>
                  : (
                    <button
                      key={p}
                      type="button"
                      className={clsx(styles.pageNum, page === p && styles.pageNumActive)}
                      onClick={() => setPage(p as number)}
                    >
                      {p}
                    </button>
                  )
              )}
            <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
            <button type="button" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
          </div>
        </div>

      </div>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <SolutionModal
          mode={modal.mode}
          initial={modal.solution ? { ...modal.solution } : { ...EMPTY, order: solutions.length + 1 }}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  )
}

export default SolutionsPanel
