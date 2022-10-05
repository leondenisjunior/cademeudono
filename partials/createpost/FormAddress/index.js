import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

export default function FormAddress({ onChange, filds, title }) {
  const { street, number, district, states, cities, citySelected } = filds
  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography component="h2" variant="h5">
          {title || 'Endereço'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          onChange={onChange}
          onBlur={onChange}
          onFocus={onChange}
          value={street.value}
          error={!!street.error}
          helperText={street.error}
          label="Rua"
          name="addressStreet"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          onChange={onChange}
          onBlur={onChange}
          onFocus={onChange}
          fullWidth
          error={!!number.error}
          helperText={number.error}
          value={number.value}
          label="Número"
          name="addressNumber"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          onChange={onChange}
          onBlur={onChange}
          onFocus={onChange}
          fullWidth
          error={!!district.error}
          helperText={district.error}
          value={district.value}
          label="Bairro"
          name="addressDistrict"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Estado"
            name="addressState"
            onChange={onChange}
            onBlur={onChange}
            onFocus={onChange}
          >
            {states.map((state) => (
              <MenuItem key={state.sigla} value={state.nome}>
                {state.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disabled={!cities.length}
          options={cities}
          value={citySelected.value}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Cidade" />}
          onChange={(event, newValue) => {
            onChange({ target: { name: 'addressCity', value: newValue } })
          }}
          name="addressCity"
        />
      </Grid>
    </>
  )
}
