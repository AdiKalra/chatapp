import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React from 'react'

function LoginForm() {
  return (
    <VStack>
      <FormControl>
        <FormLabel></FormLabel>  
        <Input placeholder='Email'></Input>
      </FormControl>
    </VStack>
  )
}

export default LoginForm