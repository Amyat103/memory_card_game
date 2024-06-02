import './ScoreBoard.css';
import { useState, useEffect } from 'react';

function ScoreBoard({ score }) {
  const [maxScore, setMaxScore] = useState(score);

  useEffect(() => {
    setMaxScore((maxScore) => Math.max(maxScore, score));
  }, [score]);

  return (
    <div className='score-board'>
      <h4>Score: {score}</h4>
      <h4>High Score: {maxScore}</h4>
    </div>
  );
}

export default ScoreBoard;
