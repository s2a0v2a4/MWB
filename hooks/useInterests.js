// hooks/useInterests.js - Custom Hook für Interests Logic
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const useInterests = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const { data, error, isLoading: swrLoading } = useSWR('/api/interests', fetcher, {
    revalidateOnFocus: false,
    retry: 3,
  });

  // Gespeicherte Interessen in State laden
  useEffect(() => {
    if (data?.interests) {
      setSelectedInterests(data.interests);
    }
  }, [data]);

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const saveInterests = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      console.log('📤 Sending interests:', selectedInterests);
      
      const response = await fetch('/api/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interests: selectedInterests }),
      });

      const responseData = await response.json();
      console.log('📥 Response:', responseData);

      if (response.ok) {
        await mutate('/api/interests');
        setMessage({ 
          type: 'success', 
          text: responseData.message || 'Interessen erfolgreich gespeichert!' 
        });
        return { success: true, data: responseData };
      } else {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      setMessage({ 
        type: 'error', 
        text: `Fehler beim Speichern: ${error.message}` 
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => setMessage({ type: '', text: '' });

  return {
    // Data
    data,
    error,
    selectedInterests,
    message,
    
    // Loading states
    isLoading,
    swrLoading,
    
    // Actions
    toggleInterest,
    saveInterests,
    clearMessage,
    refresh: () => mutate('/api/interests'),
  };
};
