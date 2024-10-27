import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { infoType, number, month, day } = location.state as {
    infoType: string;
    number: string | null;
    month?: string;
    day?: string;
  };

  const [fact, setFact] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = 'http://numbersapi.com/';

      if (infoType === 'date' && month && day) {
        url += `${month}/${day}/date`;
      } else if (number) {
        url += `${number}/${infoType}`;
      } else {
        url += `random/${infoType}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Не удалось загрузить данные');
        const data = await response.text();
        setFact(data);
        setError(null); // сбрасываем ошибку, если запрос прошел успешно
      } catch (error) {
        setFact(null); // сбрасываем факт, если есть ошибка
        setError('Произошла ошибка при загрузке информации. Пожалуйста, проверьте соединение или попробуйте позже.');
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [infoType, number, month, day]);

  return (
    <div>
      <h1>Информация о числе</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{fact}</p>
      )}
    </div>
  );
};

export default ResultPage;
