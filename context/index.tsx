import { createContext, ReactNode, useEffect, useState } from 'react'
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'

interface ContextProps {
  children: ReactNode
}

type User = {
  id: any
  name: string
  email: string
  isLogged: boolean
}

interface UserContextProps {
  user: User
  setUser: (user: User) => void
  logout: Function
}

const INITIAL_USER = {
  id: null,
  email: '',
  name: '',
  isLogged: false,
}

export const UserContext = createContext<UserContextProps>({
  setUser: () => {},
  user: INITIAL_USER,
  logout: () => {},
})

const Context: React.FC<ContextProps> = ({ children }) => {
  const [state, setState] = useState(INITIAL_USER)
  const route = useRouter()

  useEffect(() => {
    const userCookie = getCookie('user') as string
    if (userCookie) {
      const userJson = JSON.parse(userCookie)
      setState({
        id: userJson.id,
        email: userJson.email,
        name: userJson.name,
        isLogged: userJson.isLoogger,
      })
      return
    }
    setState(INITIAL_USER)
  }, [])

  const handleUser = (user: User) => {
    setState({
      id: user.id,
      email: user.email,
      name: user.name,
      isLogged: user.isLogged,
    })
    setCookies(
      'user',
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        isLoogger: true,
      }),
      { maxAge: 1000 * 1000 }
    )
    route.push('/')
  }

  const logout = () => {
    setState(INITIAL_USER)
    removeCookies('user')
    route.push('/login')
  }

  return (
    <UserContext.Provider value={{ user: state, setUser: handleUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default Context
