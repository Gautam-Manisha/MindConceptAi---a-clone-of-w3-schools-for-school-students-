import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConceptNode, Question } from '../types';
import { mockConcepts, mockQuestions } from '../utils/mockData';

type GraphContextType = {
  concepts: ConceptNode[];
  questions: Question[];
  selectedConcept: ConceptNode | null;
  activeSubject: string | null;
  updateConceptMastery: (id: string, mastery: 'mastered' | 'review' | 'weak') => void;
  selectConcept: (id: string | null) => void;
  filterBySubject: (subject: string | null) => void;
  getRelatedConcepts: (conceptId: string) => ConceptNode[];
  getConceptQuestions: (conceptId: string) => Question[];
};

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [concepts, setConcepts] = useState<ConceptNode[]>(mockConcepts);
  const [questions] = useState<Question[]>(mockQuestions);
  const [selectedConcept, setSelectedConcept] = useState<ConceptNode | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  const updateConceptMastery = (id: string, mastery: 'mastered' | 'review' | 'weak') => {
    setConcepts(prevConcepts => 
      prevConcepts.map(concept => 
        concept.id === id ? { ...concept, mastery } : concept
      )
    );
  };

  const selectConcept = (id: string | null) => {
    if (!id) {
      setSelectedConcept(null);
      return;
    }
    
    const concept = concepts.find(c => c.id === id) || null;
    setSelectedConcept(concept);
  };

  const filterBySubject = (subject: string | null) => {
    setActiveSubject(subject);
  };

  const getRelatedConcepts = (conceptId: string): ConceptNode[] => {
    const concept = concepts.find(c => c.id === conceptId);
    if (!concept) return [];
    
    return concepts.filter(c => concept.relatedConcepts.includes(c.id));
  };

  const getConceptQuestions = (conceptId: string): Question[] => {
    return questions.filter(q => q.conceptId === conceptId);
  };

  const filteredConcepts = activeSubject 
    ? concepts.filter(c => c.subject === activeSubject)
    : concepts;

  return (
    <GraphContext.Provider 
      value={{ 
        concepts: filteredConcepts, 
        questions, 
        selectedConcept, 
        activeSubject,
        updateConceptMastery, 
        selectConcept, 
        filterBySubject,
        getRelatedConcepts,
        getConceptQuestions
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};