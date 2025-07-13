import React from 'react';
import { X, ExternalLink, Book, Video, FileText } from 'lucide-react';
import { useGraph } from '../../context/GraphContext';
import { ConceptNode } from '../../types';

interface ConceptDetailsProps {
  onClose: () => void;
}

const ConceptDetails: React.FC<ConceptDetailsProps> = ({ onClose }) => {
  const { selectedConcept, getRelatedConcepts, getConceptQuestions, updateConceptMastery } = useGraph();

  if (!selectedConcept) return null;

  const relatedConcepts = getRelatedConcepts(selectedConcept.id);
  const questions = getConceptQuestions(selectedConcept.id);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} />;
      case 'article':
        return <FileText size={16} />;
      case 'exercise':
        return <Book size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'mastered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'weak':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleMasteryChange = (mastery: ConceptNode['mastery']) => {
    updateConceptMastery(selectedConcept.id, mastery);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full h-full overflow-y-auto flex flex-col relative">
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{selectedConcept.title}</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close details"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 space-y-4 flex-grow">
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMasteryColor(selectedConcept.mastery)}`}>
            {selectedConcept.mastery === 'mastered' && 'Mastered'}
            {selectedConcept.mastery === 'review' && 'Needs Review'}
            {selectedConcept.mastery === 'weak' && 'Weak'}
          </div>
          <div className="text-sm text-gray-600">Subject: {selectedConcept.subject}</div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600">{selectedConcept.description}</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-2">Update Your Mastery</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleMasteryChange('mastered')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedConcept.mastery === 'mastered'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
              }`}
            >
              Mastered
            </button>
            <button
              onClick={() => handleMasteryChange('review')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedConcept.mastery === 'review'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-yellow-700 border border-yellow-200 hover:bg-yellow-50'
              }`}
            >
              Needs Review
            </button>
            <button
              onClick={() => handleMasteryChange('weak')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                selectedConcept.mastery === 'weak'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
              }`}
            >
              Weak
            </button>
          </div>
        </div>
        
        {selectedConcept.resources.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Learning Resources</h3>
            <ul className="space-y-2">
              {selectedConcept.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-2 text-blue-600">{getResourceIcon(resource.type)}</span>
                    <span>{resource.title}</span>
                    <ExternalLink size={14} className="ml-auto text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {relatedConcepts.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Related Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {relatedConcepts.map(related => (
                <div
                  key={related.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getMasteryColor(related.mastery)}`}
                >
                  {related.title}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {questions.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Practice Questions</h3>
            <div className="space-y-2">
              {questions.slice(0, 2).map(question => (
                <div key={question.id} className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-gray-600 mb-1">{question.difficulty} difficulty</p>
                  <p className="font-medium">{question.text}</p>
                </div>
              ))}
              {questions.length > 2 && (
                <div className="text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    See all {questions.length} questions
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="sticky bottom-0 bg-white border-t p-4 flex gap-2 justify-between">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex-1">
          Practice This Concept
        </button>
        <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
          Add to Learning Path
        </button>
      </div>
    </div>
  );
};

export default ConceptDetails;