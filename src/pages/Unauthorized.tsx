
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <ShieldCheck className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-8 text-gray-600">
          You do not have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-csp-blue hover:bg-csp-steel"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
