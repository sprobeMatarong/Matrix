import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

function LanguageSelect() {
  const [locale, setLocale] = useState('en');
  const { i18n } = useTranslation();

  const handleSelectLocale = (e) => {
    i18n.changeLanguage(e.target.value);
    setLocale(e.target.value);
  };

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 20 }}>
      <Select
        valule={locale}
        onChange={handleSelectLocale}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        defaultValue="en"
        sx={{ padding: '0' }}
      >
        <MenuItem value="en">
          <ReactCountryFlag className="emojiFlag" countryCode="US" svg />
        </MenuItem>
        <MenuItem value="ja">
          <ReactCountryFlag className="emojiFlag" countryCode="JP" svg />
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default LanguageSelect;
