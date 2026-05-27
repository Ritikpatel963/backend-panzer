import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Header Settings' }

const HeaderSettingsPage = () => {
  return (
    <>
      <PageTitle title="Header" subTitle="Setting" />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Header Settings</h5>
          <p className="text-muted mb-0">Manage logo, top header visibility, and header content from here.</p>
        </div>
      </div>
    </>
  )
}

export default HeaderSettingsPage
