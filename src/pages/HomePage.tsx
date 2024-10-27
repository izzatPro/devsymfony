import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoSelector from '../components/infoSelector/infoSelector';

const HomePage: React.FC = () => {
  const [infoType, setInfoType] = useState<string>(''); // Сохраняем только `infoType`, поскольку его используем
  const navigate = useNavigate();

  const handleSelectType = (type: string) => {
    setInfoType(type);
  };

  const handleSubmit = (selectedNumber: string | null, month?: string, day?: string) => {
    navigate('/result', { state: { infoType, number: selectedNumber, month, day } });
  };
  

  return (
    <div>
      <h1>Выберите тип информации</h1>
      <InfoSelector 
        onSelectType={handleSelectType} 
        onToggleRandom={() => {}} 
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
