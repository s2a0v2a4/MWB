// hooks/useEvents.js - Custom Hook für Events mit Interest-Filterung
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const useEvents = (filterByInterests = false) => {
  const [categories, setCategories] = useState([]);
  
  // 1. Hole die ausgewählten Interessen
  const { data: interestsData } = useSWR('/api/interests', fetcher, {
    revalidateOnFocus: false,
  });

  // 2. Hole die Kategorien basierend auf Interessen  
  const { data: categoriesData } = useSWR(
    filterByInterests && interestsData?.interests?.length > 0 
      ? '/api/interests/categories' 
      : null, 
    fetcher,
    { revalidateOnFocus: false }
  );

  // 3. Update categories state
  useEffect(() => {
    if (filterByInterests && categoriesData?.categories) {
      setCategories(categoriesData.categories);
    } else if (!filterByInterests) {
      setCategories([]);
    }
  }, [filterByInterests, categoriesData]);

  // 4. Hole Events (gefiltert oder alle)
  const eventsUrl = filterByInterests && categories.length > 0
    ? `/api/events?categories=${categories.join(',')}`
    : '/api/events';

  const { data: eventsData, error, isLoading, mutate } = useSWR(
    eventsUrl, 
    fetcher,
    { 
      revalidateOnFocus: false,
      refreshInterval: 30000, // Refresh alle 30 Sekunden
    }
  );

  // 5. Event-Aktionen
  const joinEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        mutate(); // Events neu laden
        return { success: true };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Join event error:', error);
      return { success: false, error: error.message };
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      
      if (response.ok) {
        const newEvent = await response.json();
        mutate(); // Events neu laden
        return { success: true, event: newEvent };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error('Create event error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    // Data
    events: eventsData || [],
    interests: interestsData,
    categories: categoriesData,
    
    // States
    error,
    isLoading,
    isFiltered: filterByInterests,
    activeCategories: categories,
    
    // Actions
    joinEvent,
    createEvent,
    refresh: () => mutate(),
  };
};
