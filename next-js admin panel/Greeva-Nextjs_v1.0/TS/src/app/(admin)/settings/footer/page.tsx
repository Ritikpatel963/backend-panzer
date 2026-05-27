import PageTitle from '@/components/PageTitle'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Footer Settings' }

const FooterSettingsPage = () => {
  return (
    <>
      <PageTitle title="Footer" subTitle="Setting" />
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Footer Settings</h5>
          <p className="text-muted mb-0">Manage footer text, links, and copyright content from here.</p>
        </div>
      </div>
    </>
  )
}

export default FooterSettingsPage
