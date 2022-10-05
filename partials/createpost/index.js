import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import Container from '../../components/Container'
import FormAdopet from './FormAdopt'
import FormCampaign from './FormCampaign'
import FormFound from './FormFound'
import FormLost from './FormLost'

export default function CreatePost() {
  const [typeRegister, setTypeRegister] = useState('adopt')

  const handleChangeType = (event) => {
    setTypeRegister(event.target.value)
  }

  const typesPost = {
    adopt: FormAdopet,
    lost: FormLost,
    found: FormFound,
    campaign: FormCampaign,
  }

  const PostComponent = typesPost[typeRegister]

  return (
    <Container>
      <Typography
        style={{ marginBottom: 10, marginTop: 20 }}
        component="h1"
        variant="h4"
      >
        Cadastro de posts
      </Typography>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Qual o tipo de post?
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={typeRegister}
          onChange={handleChangeType}
        >
          <FormControlLabel value="adopt" control={<Radio />} label="Adoção" />
          <FormControlLabel
            value="lost"
            control={<Radio />}
            label="Desaparecimento"
          />
          <FormControlLabel
            value="found"
            control={<Radio />}
            label="Encontrado"
          />
          <FormControlLabel
            value="campaign"
            control={<Radio />}
            label="Campanha"
          />
        </RadioGroup>
      </FormControl>
      <PostComponent />
    </Container>
  )
}
