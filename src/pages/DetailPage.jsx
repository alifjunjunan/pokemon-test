import { Box, Heading, Image, Text, Progress } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { colorRGB } from './helper.js'
import LoadingPage from './LoadingPage.jsx'

const DetailPage = () => {
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)
    const { name } = useParams()
    useEffect(() => {
        getDetail()
    },[])
    const getDetail = async () => {
        try {
            let resPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            let resSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            await setPokemon({
                id: resPokemon.data.id,
                name: resPokemon.data.name,
                image: resPokemon.data.sprites.front_default,
                height: resPokemon.data.height,
                weight: resPokemon.data.weight,
                ability: resPokemon.data.abilities,
                stats: resPokemon.data.stats,
                types: resPokemon.data.types,
                color: colorRGB[resSpecies.data.color.name]
            })
            await setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {/* {console.log('isi', (pokemon))} */}
            {
                loading ?
                    <LoadingPage />
                    :
                    <Box w={{ base: '95%', lg: '90%' }} m='30px auto' >
                        <Text fontWeight='semibold' fontSize='30px' textAlign='center' mb='20px'>Detail pokemon</Text>
                        <Box w='100%' borderRadius='15px' boxShadow='lg' backgroundColor='#E7EDE4'>
                            <Box display='flex' flexDirection={{ base: 'column', sm: 'column', md: 'row' }} >
                                <Box fontWeight='semibold' color='#f7f1e3' textShadow='1px 1px 1.5px #000' fontSize='18px' flexGrow='1' p='50px' backgroundColor={pokemon.color} borderTopLeftRadius='15px' borderTopRightRadius={{ base: '15px', md: '0' }} borderBottomLeftRadius={{ base: '0', md: '15px' }}>
                                    <Image w={{ base: '250px', sm: '250px', md: '250px', lg: '300px' }} m='0 auto' src={pokemon.image} alt='pokemon' />
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>Name:</Text>
                                        <Text>{pokemon.name}</Text>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' my='10px'>
                                        <Text>Types:</Text>
                                        <Text>{pokemon.types && pokemon.types.map((value, index) => pokemon.types.length - 1 === index ? `${value.type.name}` : `${value.type.name}, `)}</Text>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>Height:</Text>
                                        <Text>{(Number(pokemon.height) * 0.1).toFixed(1)} M</Text>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between' my='10px'>
                                        <Text>Weight:</Text>
                                        <Text>{Number(pokemon.weight) * 0.1} Kg</Text>
                                    </Box>
                                    <Box display='flex' justifyContent='space-between'>
                                        <Text>Abilities:</Text>
                                        <Text>{pokemon.ability && pokemon.ability.map((value, index) => pokemon.ability.length - 1 === index ? `${value.ability.name}` : `${value.ability.name}, `)}</Text>
                                    </Box>
                                </Box>
                                <Box w={{ base: '100%', sm: '100%', md: '60%' }} position='relative' right={{ base: '0', md: '20px' }} top={{ base: '-30px', md: '0' }} flexGrow='1' p={{ base: '20px', sm: '20px', md: '50px' }} backgroundColor='#E7EDE4' borderRadius='25px'>
                                    <Box mt='80px'>
                                        <Heading as='h3' size='md' textAlign='center' mt='20px' color='#2c3e50'>Base Stats</Heading>
                                        <Box mt='20px' fontWeight='bold' color='#2c3e50' >
                                            <Box mt='10px'>
                                                {
                                                    pokemon.stats && pokemon.stats.map((value, index) => {
                                                        return (
                                                            <Box mt='10px' key={value.id}>
                                                                <Box display='flex' justifyContent='space-between'>
                                                                    <Text>{value.stat.name}</Text>
                                                                    <Text>{value.base_stat}</Text>
                                                                </Box>
                                                                <Box w='50%' m='0 auto'>
                                                                    <Progress value={value.base_stat} bgColor='rgba(241, 242, 246,1.0)' boxShadow='md' />
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    )
}

export default DetailPage