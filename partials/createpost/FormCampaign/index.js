import { LoadingButton } from '@mui/lab'
import { Box, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../../../context'
import FormAddress from '../FormAddress'
import states from '../FormAddress/estados-cidades'
import FormPet from '../FormPet'

const INITIAL_FILDS_PET = {
  name: {
    value: '',
    error: '',
  },
  age: {
    value: '',
    error: '',
  },
  species: {
    value: '',
    error: '',
  },
  description: {
    value: '',
    error: '',
  },
  images: {
    value: [],
    error: '',
  },
  imagesPreview: [],
}

const INITIAL_FILDS_ADDRESS = {
  street: {
    value: '',
    error: '',
  },
  number: {
    value: '',
    error: '',
  },
  district: {
    value: '',
    error: '',
  },
  cities: [],
  states: states,
  citySelected: {
    value: '',
    error: '',
  },
  stateSelected: {
    value: '',
    error: '',
  },
}

const INITIAL_FILDS = { value: '', error: '' }

export default function FormCampaign() {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(INITIAL_FILDS)
  const [description, setDescription] = useState(INITIAL_FILDS)
  const [pet, setPet] = useState(INITIAL_FILDS_PET)
  const [address, setAddress] = useState(INITIAL_FILDS_ADDRESS)

  const { user } = useContext(UserContext)

  const onChange = (event) => {
    const {
      target: { value, name, files },
    } = event
    switch (name) {
      case 'title':
        if (!value) {
          setTitle({ ...title, error: 'Título é obrigatório' })
          return
        }
        setTitle({ value: value, error: '' })
        break
      case 'description':
        if (!value) {
          setDescription({ ...description, error: 'Descrição é obrigatório' })
          return
        }
        setDescription({ value: value, error: '' })
        break

      case 'addressStreet':
        setAddress({ ...address, district: { value } })
        break
      case 'addressNumber':
        setAddress({ ...address, number: { value } })
        break
      case 'addressDistric':
        setAddress({ ...address, district: { value } })
        break
      case 'addressCity':
        setAddress({ ...address, citySelected: { value } })
        break
      case 'addressState':
        const { cidades } = address.states.find((item) => {
          if (item.nome === value) {
            return item.cidades
          }
        })
        setAddress({
          ...address,
          citySelected: { value: '' },
          cities: cidades,
          stateSelected: {
            value,
          },
        })
        break

      case 'petName':
        if (!value) {
          setPet({
            ...pet,
            name: { value, error: 'Nome do animal é obrigatório' },
          })
          return
        }
        setPet({ ...pet, name: { value, error: '' } })
        break
      case 'petAge':
        if (!value) {
          setPet({
            ...pet,
            age: { value, error: 'Idade do animal é obrigatório' },
          })
          return
        }
        setPet({ ...pet, age: { value, error: '' } })
        break
      case 'petDescription':
        setPet({ ...pet, description: { value, error: '' } })
        break
      case 'petSpecies':
        if (!value) {
          setPet({
            ...pet,
            species: { value, error: 'Espécie é obrigatório' },
          })
          return
        }
        setPet({ ...pet, species: { value, error: '' } })
        break
      case 'petImages':
        const file = files[0]
        const urlToPreview = URL.createObjectURL(file)
        setPet((old) => ({
          ...old,
          images: { value: old.images.value.concat(file), error: '' },
          imagesPreview: old.imagesPreview.concat(urlToPreview),
        }))
      default:
        break
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (
        !title.value ||
        !description.value ||
        !pet.images.value.length ||
        !pet.name.value ||
        !pet.age.value
      ) {
        toast.error('Preencha todos os campos', {
          position: 'top-right',
          autoClose: 5000,
        })
        return
      }
      setLoading(true)
      const formData = new FormData()
      for (const image of pet.images.value) {
        formData.append('files', image)
      }
      formData.append('idUser', user.id)
      formData.append('title', title.value)
      formData.append('description', description.value)
      const petPayload = {
        name: pet.name.value,
        age: pet.age.value,
        description: pet.description.value,
        specie: pet.species.value,
      }
      formData.append('pet', JSON.stringify(petPayload))

      await axios.post('/api/adopt/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setLoading(false)
      setDescription(INITIAL_FILDS)
      setTitle(INITIAL_FILDS)
      setPet(INITIAL_FILDS_PET)
      toast.success('Adoção está em analise, será publicada em breve!', {
        position: 'top-right',
        autoClose: 5000,
      })
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast.error(error?.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
      })
    }
  }
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={title.value}
            onChange={onChange}
            onBlur={onChange}
            onFocus={onChange}
            error={!!title.error}
            helperText={
              title.error || 'Ex: Camanha para ajudar na cirurgia da Mel'
            }
            label="Título"
            name="title"
          />
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
            helperText={
              description.error ||
              'Aqui você informa tudo sobre a campanha, PIX se existe arrecadação, motivo, contato do responsável etc'
            }
            label="Descrição"
            name="description"
          />
        </Grid>
        <FormPet onChange={onChange} state={pet} />
        <Grid container justifyContent="center">
          <Grid item xs={10} sm={3}>
            <LoadingButton
              loading={loading}
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
