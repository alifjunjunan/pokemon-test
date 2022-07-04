import { Box, Heading, InputGroup, Input, InputRightElement, Button, Icon, Image, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { colorRGB } from './helper.js'
import LoadingPage from './LoadingPage.jsx'

const HomePage = () => {

  const [pokemon, setPokemon] = useState([])
  const [searchPokemon, setSearchPokemon] = useState('')
  const [loading, setLoading] = useState(true)
  let tempArr = []
  useEffect(() => {
    loopPokemon()
  }, [])

  const loopPokemon = async () => {
    for (let i = 1; i <= 20; i++) {
      await getPokemon(i)
    }
    setSearchPokemon('')
  }
  const getPokemon = async (id) => {
    try {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      let resColor = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      tempArr.push({
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
        color: colorRGB[resColor.data.color.name]
      })
      setTimeout(() => {
        setPokemon(tempArr)
        setLoading(false)
      }, 700);
    } catch (error) {
      if (error.request.status === 404) {
        setLoading(false)
        setPokemon([])
      }
    }
  }
  const handleSearch = (name) => {
    getPokemon(name)
  }
  const printCard = () => {
    if (pokemon.length > 0) {
      return pokemon.map((value, index) => {
        return (
          <Link to={`/detail-pokemon/${value.name}`} key={value.id}>
            <Box mt='20px' borderRadius='10px' boxShadow='md' p='20px' backgroundColor={`${value.color}`} cursor='pointer' >
              <Image w={{ base: '120px', sm: '180px', md: '150px', lg: '250px', xl: '200px' }} m='0 auto' src={value.image} alt='pokemon' />
              <Text fontWeight='semibold' fontSize='18px' textAlign='center'>{value.name}</Text>
            </Box>
          </Link>
        )
      })
    } else {
      return (
        <Heading as='h2' size='lg' mx='auto' mt='50px' >Pokemon not found</Heading>
      )
    }
  }

  return (
    <>
      {
        loading ?
          <LoadingPage />
          :
          <Box w='90%' m='30px auto'>
            <Text fontWeight='semibold' fontSize='30px' textAlign='center'>Find your pokemon</Text>
            <Box w={{ base: '90%', sm: '90%', md: '80%' }} m='10px auto' display='flex' alignItems='center'>
              <InputGroup >
                <Input placeholder='name pokemon' value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
                <InputRightElement w='3.5em'>
                  <Button colorScheme='linkedin' size='sm' onClick={() => handleSearch(searchPokemon)}>
                    <Icon as={SearchIcon} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button size='sm' ml='10px' colorScheme='teal' onClick={() => loopPokemon()}>Reset</Button>
            </Box>
            <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
              {printCard()}
            </Box>
          </Box>
      }
    </>
  )
}

export default HomePage