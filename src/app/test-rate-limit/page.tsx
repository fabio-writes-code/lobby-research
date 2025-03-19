'use client';

import { useState } from 'react';
import { rateLimitAction } from '~/lib/rate-limit';
import { notFound } from 'next/navigation';

// This is a test action that simulates a rate-limited server action
async function testAction() {
  const result = await rateLimitAction('test-action');
  return result;
}

export default function TestRateLimitPage() {
  if (process.env.NODE_ENV == "production") notFound()
  const [results, setResults] = useState<Array<{ success: boolean; error?: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    const result = await testAction();
    setResults(prev => [...prev, result]);
    setLoading(false);
  };

  const handleMultipleTests = async () => {
    setLoading(true);
    for (let i = 0; i < 15; i++) {
      const result = await testAction();
      setResults(prev => [...prev, result]);
      // Small delay to make it more readable
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rate Limit Testing</h1>
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={handleTest}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Test Single Request
        </button>
        
        <button 
          onClick={handleMultipleTests}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Test Multiple Requests (15)
        </button>
      </div>
      
      <div className="border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Results:</h2>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div 
              key={index}
              className={`p-2 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <p>Request {index + 1}: {result.success ? 'Success' : 'Failed'}</p>
              {result.error && <p className="text-red-600">{result.error}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

