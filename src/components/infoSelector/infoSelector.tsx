import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button, TextField } from '@mui/material';

interface InfoSelectorProps {
  onSelectType: (type: string) => void;
  onToggleRandom: (useRandom: boolean) => void;
  onSubmit: (number: string | null, month?: string, day?: string) => void;
}

const InfoSelector: React.FC<InfoSelectorProps> = ({ onSelectType, onToggleRandom, onSubmit }) => {
  const [infoType, setInfoType] = useState<string>('');
  const [useRandom, setUseRandom] = useState<boolean>(false);
  const [number, setNumber] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');

  const handleInfoTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedType = event.target.value as string;
    setInfoType(selectedType);
    onSelectType(selectedType);
};

  const handleRandomToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isRandom = event.target.checked;
    setUseRandom(isRandom);
    onToggleRandom(isRandom);
    if (isRandom) {
      setNumber('');
      setMonth('');
      setDay('');
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(event.target.value);
  };

  const handleSubmit = () => {
    if (infoType === 'date' && !useRandom) {
      onSubmit(null, month, day); // Передаем месяц и день для `date`
    } else {
      onSubmit(useRandom ? null : number); // Передаем либо `number`, либо случайное значение
    }
  };

  return (
    <div>
      {/* Выбор типа информации */}
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="info-type-label">Тип информации</InputLabel>
        <Select
          label="Тип информации"
          labelId="info-type-label"
          value={infoType}
          onChange={handleInfoTypeChange}
        >
          <MenuItem value="math">Math</MenuItem>
          <MenuItem value="trivia">Trivia</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          {useRandom && <MenuItem value="year">Year</MenuItem>}
        </Select>
      </FormControl>

      {/* Поля для ввода числа или даты */}
      {!useRandom && infoType !== 'date' && (
        <TextField
          label="Введите число"
          variant="outlined"
          fullWidth
          margin="normal"
          value={number}
          onChange={handleNumberChange}
        />
      )}

      {/* Поля для даты, если выбран тип `date` */}
      {!useRandom && infoType === 'date' && (
        <div>
          <TextField
            label="Месяц"
            variant="outlined"
            fullWidth
            margin="normal"
            value={month}
            onChange={handleMonthChange}
          />
          <TextField
            label="День"
            variant="outlined"
            fullWidth
            margin="normal"
            value={day}
            onChange={handleDayChange}
          />
        </div>
      )}

      {/* Чекбокс для случайного числа */}
      <FormControlLabel
        control={<Checkbox checked={useRandom} onChange={handleRandomToggle} />}
        label="Использовать случайное число"
      />

      {/* Кнопка для отправки запроса */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Получить информацию
      </Button>
    </div>
  );
};

export default InfoSelector;
