import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { buildClient } from '@datocms/cma-client-node'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { UserContext } from '../../context'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (!email || !password) {
      toast.error('E-mail ou senha não informado!', {
        position: 'top-right',
        autoClose: 5000,
      })
      return
    }
    try {
      setLoading(true)
      const { data } = await axios.get(
        `/api/user/login?email=${email}&password=${password}`
      )
      setUser({
        isLogged: true,
        id: data.id,
        name: data.name,
        email: data.email,
      })
      setLoading(false)
      toast.success('Login realizado com sucesso', {
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Informe seu e-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Informe sua senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/esqueciminhasenha" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/criarconta" variant="body2">
                Criar uma conta
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
