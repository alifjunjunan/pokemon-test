import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logo from '../assets/pokemon-logo.png'

const Navbar = () => {
    return (
        <>
            <Box backgroundColor='#6EA4BB' w='100%' display='flex' alignItems='center' h='80px'>
                <Link to='/'>
                    <Image w={{ base: '110px', sm: '120px', md: '150px' }} ml={{ base: '20px', sm: '20px', md: '40px' }} src={logo} alt='logo' />
                </Link>
            </Box>
        </>
    )
}

export default Navbar