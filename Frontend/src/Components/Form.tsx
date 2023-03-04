import React from 'react'
import {Input, Flex, Button} from "@chakra-ui/react"

export interface formType {
    name: string,
    avatar: string,
    room: string
}

const initState:formType = {
    name: "",
    avatar: "",
    room: ""
}

const Form = ({handleStart, disabled}:{handleStart:(f:formType)=>void, disabled:boolean}) => {
    const [form, setForm] = React.useState<formType>(initState)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setForm({...form, [e.target.name]:[e.target.value]})
    }
  return (
    <Flex direction={'column'} w="200px" m={'30px auto'} gap="10px" p="1em" bgColor="#321F28" border={'1px solid #734046'}>
        <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder='Enter Name'/> 
        <Input type="text" name="room" value={form.room} onChange={handleChange} placeholder='Enter room ID'/>
        <Button onClick={()=>handleStart(form)} disabled={disabled}>Start</Button>
    </Flex>
  )
}

export default Form