// src/interests/interest-category.mapping.ts
export const INTEREST_CATEGORY_MAPPING = {
  1: ['Technologie'], // Technologie -> keine direkte Event-Kategorie
  2: ['Sport'],        // Sport -> Sport Events
  3: ['Musik'],        // Musik -> Musik Events  
  4: ['Kunst'],        // Kunst -> Kunst Events
  5: ['Reisen'],       // Reisen -> keine direkte Event-Kategorie
  6: ['Kochen'],       // Kochen -> keine direkte Event-Kategorie
} as const;

export const AVAILABLE_INTERESTS = [
  { id: 1, name: 'Technologie', emoji: '💻', categories: [] as string[] },
  { id: 2, name: 'Sport', emoji: '⚽', categories: ['Sport'] as string[] },
  { id: 3, name: 'Musik', emoji: '🎵', categories: ['Musik'] as string[] },
  { id: 4, name: 'Kunst', emoji: '🎨', categories: ['Kunst'] as string[] },
  { id: 5, name: 'Reisen', emoji: '✈️', categories: [] as string[] },
  { id: 6, name: 'Kochen', emoji: '👨‍🍳', categories: [] as string[] },
];

export function mapInterestsToCategories(interestIds: number[]): string[] {
  const categories = new Set<string>();
  
  interestIds.forEach(id => {
    const interest = AVAILABLE_INTERESTS.find(i => i.id === id);
    if (interest) {
      interest.categories.forEach(cat => categories.add(cat));
    }
  });
  
  return Array.from(categories);
}

export function getInterestsByCategory(category: string): number[] {
  return AVAILABLE_INTERESTS
    .filter(interest => interest.categories.includes(category))
    .map(interest => interest.id);
}
