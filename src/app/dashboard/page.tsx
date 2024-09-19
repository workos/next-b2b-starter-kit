import PageContainer from '../components/layout/page-container';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <h1>Welcome to the Dashboard</h1>
      <p>Select a section from the sidebar to get started.</p>
    </PageContainer>
  );
}
