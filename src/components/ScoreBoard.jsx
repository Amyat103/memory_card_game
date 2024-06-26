import './ScoreBoard.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ScoreBoard({ score = 0 }) {
  const [maxScore, setMaxScore] = useState(score);

  useEffect(() => {
    setMaxScore((maxScore) => Math.max(maxScore, score));
  }, [score]);

  return (
    <div className='main'>
      <h2>Pokemon Game</h2>
      <h3>{"Don't click The same pokemon twice"}</h3>
      <div className='score-board'>
        <h4>Score: {score}</h4>
        <h4>High Score: {maxScore}</h4>
      </div>
    </div>
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number.isRequired,
};

export default ScoreBoard;
