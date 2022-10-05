import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/Create'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import axios, { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import validateEmail from '../../utils/validateEmail'
import { UserContext } from '../../context'
import { toast } from 'react-toastify'

const INITIAL_FILDS = {
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
}

interface Props {
  title?: string
}

export default function CreateAccount({ title }: Props) {
  const [filds, setFilds] = useState(INITIAL_FILDS)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Object.entries(filds).forEach((el) => {
      validateFilds(el[0], el[1].value)
    })
    const { name, email, password } = filds

    if (name.value && email.value && password.value) {
      create(name.value, email.value, password.value)
    }
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    validateFilds(name, value)
  }

  const validateFilds = (fild: string, value: any) => {
    switch (fild) {
      case 'email':
        if (!validateEmail(value)) {
          setFilds((old) => ({
            ...old,
            email: { value, error: 'E-mail inválido' },
          }))
          return false
        }
        setFilds((old) => ({ ...old, email: { value, error: '' } }))
        break
      case 'name':
        if (!value) {
          setFilds((old) => ({
            ...old,
            name: { value, error: 'Nome inválido' },
          }))
          return
        }
        setFilds((old) => ({ ...old, name: { value, error: '' } }))
        break
      case 'password':
        if (!value || value?.length < 6) {
          setFilds((old) => ({
            ...old,
            password: {
              value,
              error: 'Senha deve conter mais que 6 caracteres',
            },
          }))
          return
        }
        setFilds((old) => ({ ...old, password: { value, error: '' } }))
        break
      default:
        break
    }
  }

  const create = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/user/create', {
        name,
        email,
        password,
      })
      setUser({
        isLogged: true,
        id: data.id,
        name: data.name,
        email: data.email,
      })
      setLoading(false)
      toast.success('Cadastrado com sucesso', {
        position: 'top-right',
        autoClose: 5000,
      })
    } catch (err) {
      setLoading(false)
      const errors = err as AxiosError
      console.error(errors)
      toast.error(errors?.response?.data?.message, {
        position: 'top-right',
        autoClose: 5000,
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title || 'Criar conta'}
        </Typography>
        <Box
          component="form"
          onChange={handleChange}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                fullWidth
                error={!!filds.name.error}
                helperText={filds.name.error}
                id="name"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="E-mail"
                error={!!filds.email.error}
                helperText={filds.email.error}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                error={!!filds.password.error}
                helperText={filds.password.error}
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                JÃ¡ possui uma conta? FaÃ§a o login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
