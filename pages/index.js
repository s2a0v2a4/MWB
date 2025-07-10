// pages/index.js
import InterestsForm from '../components/InterestsForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Interessen App</h1>
        <InterestsForm />
      </div>
    </div>
  );
}
