import { useState, useCallback } from 'react';
import { classifyAndProcessNote } from '../utils/classifier';

export function useClassifier() {
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const classify = useCallback((content) => {
    if (!content || !content.trim()) {
      return null;
    }

    setIsProcessing(true);

    const processed = classifyAndProcessNote(content);

    setIsProcessing(false);
    setResult(processed);

    return processed;
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    result,
    isProcessing,
    classify,
    clearResult,
  };
}