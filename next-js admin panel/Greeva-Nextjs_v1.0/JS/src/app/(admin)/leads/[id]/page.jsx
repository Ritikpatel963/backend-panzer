import PageTitle from '@/components/PageTitle';
import LeadDetails from '@/components/leads/LeadDetails';

export const metadata = { title: 'Lead Details' };

const LeadDetailsPage = ({ params }) => {
  return (
    <>
      <PageTitle title="Lead Details" subTitle="Leads" />
      <LeadDetails leadId={params?.id} />
    </>
  );
};

export default LeadDetailsPage;

