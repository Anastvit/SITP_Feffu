import React, { useState } from 'react';
import './InteractiveForm.css';

const InteractiveForm = () => {
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleRatingChange = (e) => {
    setCurrentRating(e.target.value);
  };

  const handleSubmit = () => {
    const ratingValue = parseFloat(currentRating);
    if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 10) {
      setRatings(prevRatings => [...prevRatings, ratingValue]);
      setCurrentRating('');
    } else {
      alert('Введите оценку от 1 до 10');
    }
  };

  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;

  return (
    <div className="interactive-form-container">
      <button onClick={() => setShowForm(!showForm)}>Оценить смартфон</button>
      {showForm && (
        <div className="form-content">
          <input
            type="number"
            value={currentRating}
            onChange={handleRatingChange}
            placeholder="Введите оценку"
          />
          <button onClick={handleSubmit}>Отправить оценку</button>
        </div>
      )}
      <div>
        <h2>Средняя оценка: {averageRating.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default InteractiveForm;
