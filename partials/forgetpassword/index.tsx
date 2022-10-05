import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/Password'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    if (!email) {
      toast.error('E-mail ou senha não informado!', {
        position: 'top-right',
        autoClose: 5000,
      })
      return
    }
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/user/resetpassword?email=${email}`)
      setLoading(false)
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 9000,
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
          Restaurar senha
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
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Restaurar
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Fazer o login
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
