import { PhotoCamera } from '@mui/icons-material'
import {
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

export default function FormPet({ onChange, state }) {
  const { name, age, species, description, imagesPreview } = state

  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography component="h2" variant="h5">
          Informações do animal
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          onChange={onChange}
          onBlur={onChange}
          onFocus={onChange}
          value={name.value}
          error={!!name.error}
          helperText={name.error}
          label="Nome"
          name="petName"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          onChange={onChange}
          onBlur={onChange}
          onFocus={onChange}
          fullWidth
          error={!!age.error}
          helperText={age.error}
          value={age.value}
          label="Idade"
          name="petAge"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Espécie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={species.value}
            helperText={species.error}
            label="Espécie"
            name="petSpecies"
            error={!!species.error}
            onChange={onChange}
            onBlur={onChange}
            onFocus={onChange}
          >
            <MenuItem value="dog">Cachorro</MenuItem>
            <MenuItem value="cat">Gato</MenuItem>
            <MenuItem value="bird">Ave</MenuItem>
            <MenuItem value="other">Outro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          onChange={onChange}
          multiline
          rows={3}
          onBlur={onChange}
          onFocus={onChange}
          value={description.value}
          error={!!description.error}
          helperText={description.error}
          label="Descrição"
          name="petDescription"
        />
      </Grid>
      <Grid item xs={12}>
        <p className="Mui-error css-1wc848c-MuiFormHelperText-root">
          Imagens do animal são obrigatório.
        </p>
      </Grid>
      <Grid item xs={12}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            onChange={onChange}
            name="petImages"
            type="file"
            accept="image/*"
            hidden
          />
          <PhotoCamera />
        </IconButton>
      </Grid>
      <Grid
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'scroll',
          overflow: 'hidden',
        }}
        item
        xs={12}
      >
        {imagesPreview.length
          ? imagesPreview.map((image) => (
              <CardMedia
                component="img"
                style={{ width: 80, height: 80, marginRight: 10 }}
                image={image}
                alt="green iguana"
              />
            ))
          : null}
      </Grid>
    </>
  )
}
