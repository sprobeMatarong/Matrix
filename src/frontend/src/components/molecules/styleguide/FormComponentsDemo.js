import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Checkbox as MuiCheckbox,
  RadioGroup as MuiRadioGroup,
  Select as MuiSelect,
  TextField as MuiTextField,
  Radio,
} from '@mui/material';
import BodyText from 'components/atoms/BodyText';
import Checkbox from 'components/atoms/Form/Checkbox';
import RadioGroup from 'components/atoms/Form/RadioGroup';
import Select from 'components/atoms/Form/Select';
import TextField from 'components/atoms/Form/TextField';
import Heading from 'components/atoms/Heading';

function FormComponentsDemo(props) {
  const { colorVariants } = props;

  return (
    <Box sx={{ mb: 8 }}>
      <Heading variant="h4">Form Components</Heading>

      <Heading variant="h5">TextField (Input Field)</Heading>
      <BodyText>Usually, the default MUI TextField is used in projects.</BodyText>
      <SyntaxHighlighter language="javascript" style={monokai}>
        {`import TextField from '@mui/material/TextField';\n\n<TextField label="Username" error={true} helperText="Field with validation error" />`}
      </SyntaxHighlighter>

      <Box sx={{ mb: 2 }}>
        <MuiTextField label="Username" sx={{ mr: 2, mb: 2 }} />

        <MuiTextField
          label="Username"
          defaultValue="admin@sample"
          error={true}
          helperText="Field with validation errors"
        />
      </Box>

      <BodyText>
        However, instead of using the default <strong>TextField</strong> of MUI, you must use the
        custom TextField component with custom styling to match your project needs instead of
        modifying the global TextField properties. All the TextField props from MUI are inherited by
        this custom component.
      </BodyText>

      <SyntaxHighlighter language="javascript" style={monokai}>
        {`import TextField from 'components/atoms/Form/TextField';\n\n<TextField label="Username" error={true} helperText="Field with validation error" />`}
      </SyntaxHighlighter>

      <Box>
        <TextField label="Username" sx={{ mr: 2, mb: 2 }} />

        <TextField
          label="Username"
          defaultValue="admin@sample"
          error={true}
          helperText="Field with validation errors"
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Heading variant="h6">Multiline Textfield example.</Heading>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import TextField from 'components/atoms/Form/TextField';\n\n<TextField label="Description" multiline />`}
        </SyntaxHighlighter>
        <TextField
          label="Description"
          defaultValue={faker.lorem.paragraphs(2)}
          multiline
          minRows={4}
          fullWidth
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Heading variant="h6">File Select Textfield</Heading>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import TextField from 'components/atoms/Form/TextField';\n\n<TextField label="Attachment" type="file"/>`}
        </SyntaxHighlighter>
        <TextField label="Attachment" type="file" fullWidth />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Heading variant="h4" align="center">
          Checkboxes
        </Heading>

        <BodyText>
          Usually, the default MUI Checkbox is used in projects. It has no paired label.
        </BodyText>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import Checkbox from '@mui/material/Checkbox';\n\n<Checkbox defaultChecked />`}
        </SyntaxHighlighter>

        <Box>
          <MuiCheckbox defaultChecked />
        </Box>

        <BodyText>
          However, instead of using the default <strong>Checkbox</strong> of MUI, you must use the
          custom Checkbox component with custom styling to match your project needs instead of
          modifying the global Checkbox properties. All the Checkbox props from MUI are inherited by
          this custom component.
        </BodyText>

        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import Checkbox from 'components/atoms/Checkbox';\n\n<Checkbox label="Accept Terms" />`}
        </SyntaxHighlighter>

        {colorVariants.map((color) => (
          <Box key={color}>
            <Checkbox label="Accept Terms" color={color} defaultChecked />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Heading variant="h5">Select</Heading>

        <BodyText>
          Usually, the default MUI Select is used in projects. But you will still need to format
          using several components.
        </BodyText>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import { Select, FormControl, InputLabel, Select } from '@mui/material';\n
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
  <MuiSelect label="Gender">
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
  </MuiSelect>
</FormControl>`}
        </SyntaxHighlighter>

        <Box sx={{ mb: 2, maxWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <MuiSelect label="Gender">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </MuiSelect>
          </FormControl>
        </Box>

        <BodyText>
          However, instead of using the default <strong>Select</strong> of MUI, you must use the
          custom Select component with custom styling to match your project needs instead of
          modifying the global Select properties. All the Select props from MUI are inherited by
          this custom component.
        </BodyText>

        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import Checkbox from 'components/atoms/Form/Select';\n
// set the options
const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

// One Line Only
<Select label="Gender" options={options} />`}
        </SyntaxHighlighter>

        <Box sx={{ mb: 2, maxWidth: 300 }}>
          <Select
            label="Gender"
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Heading variant="h5">Radio Button</Heading>

        <BodyText>
          Usually, the default MUI Radio is used in projects. But you will still need to format
          using several components.
        </BodyText>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import { Radio, FormControl, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';\n
<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
  >
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="female" control={<Radio />} label="Female" />
  </RadioGroup>
</FormControl>`}
        </SyntaxHighlighter>

        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <MuiRadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </MuiRadioGroup>
          </FormControl>
        </Box>

        <BodyText>
          However, instead of using the default <strong>RadioGroup</strong> of MUI, you must use the
          custom RadioGroup component with custom styling to match your project needs instead of
          modifying the global RadioGroup properties.
        </BodyText>
        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import RadioGroup from 'components/atoms/Form/RadioGroup';\n
// set the options
const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

// One Line Only
<RadioGroup label="Gender" options={options} />`}
        </SyntaxHighlighter>

        <Box sx={{ mb: 2, maxWidth: 300 }}>
          <RadioGroup
            label="Gender"
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
          />
        </Box>

        <BodyText>
          If you want the options to be inline, just specify <strong>inline=true</strong>
        </BodyText>

        <SyntaxHighlighter language="javascript" style={monokai}>
          {`import RadioGroup from 'components/atoms/Form/RadioGroup';\n
// set the options
const options = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

// One Line Only
<RadioGroup label="Gender" options={options} inline={true} />`}
        </SyntaxHighlighter>

        <Box sx={{ mb: 2, maxWidth: 300 }}>
          <RadioGroup
            label="Gender"
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ]}
            inline={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

FormComponentsDemo.defaultProps = {
  colorVariants: ['primary', 'secondary', 'success', 'warning', 'error'],
};

FormComponentsDemo.propTypes = {
  colorVariants: PropTypes.array,
};

export default FormComponentsDemo;
