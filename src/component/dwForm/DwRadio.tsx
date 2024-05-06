import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const DwRadio = () => {
  return (
    <div>
      <RadioGroup
        name="job-experience-group"
        aria-labelledby="job-experience-group-label"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          control={<Radio size="small" />}
          label="0-2"
          value="0-2"
        />
        <FormControlLabel
          control={<Radio size="small" />}
          label="2-4"
          value="2-4"
        />
        <FormControlLabel
          control={<Radio size="small" />}
          label="4-6"
          value="4-6"
        />
      </RadioGroup>
    </div>
  );
};

export default DwRadio;
