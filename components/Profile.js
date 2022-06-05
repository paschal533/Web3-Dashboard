import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({ user }) {
  const [input, setInput] = useState("");
  const {setUserData, isUserUpdating} = useMoralis();

  return(
    <CustomContainer>
      <Text><b>emoji &nbsp: Username:</b> {user.getUsername()}</Text>
      <Text><b>emoji &nbsp: Wallet Address:</b> {user.get("ethAddress")}</Text>
      <form onSubmit={e => {
          e.preventDefault()
          if(input.trim() !== ''){
            setUserData({
              username: input,
            }).then(() => {
              setInput('')
            })
          }
      }}>
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor="username">Set a new username</FormLabel>
          <Input id="username" type="text" placeholder="ex, paschal" value={input} onChange={e => setInput(e.target.value)} />
        </FormControl>
        <Button disabled={isUserUpdating} type="submit" colorScheme="purple">icon Change Usernmae</Button>
      </form>
    </CustomContainer>
  )
}
