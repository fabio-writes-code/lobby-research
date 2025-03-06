
'use client';

import { Button } from "~/components/ui/button";
import { useState } from "react";

export function SentryErrorTest() {
  const [showError, setShowError] = useState(false);
  
  const throwError = () => {
    // This will trigger a client-side error that Sentry should capture
    throw new Error("This is a test error for Sentry");
  };

  if (showError) {
    throwError();
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="destructive" 
        onClick={() => setShowError(true)}
        className="text-xs"
      >
        Test Sentry Error
      </Button>
    </div>
  );
}
