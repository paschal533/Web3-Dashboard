import { Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import Moralis from "moralis";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
//import CustomContainer from "./CustomContainer";

export default function Send({ user }) {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState('');

  const handleChange = (value) => setAmount(value);

  const toast = useToast()

  const { fetch, isFetching } = useWeb3Transfer({
      amount: Moralis.Units.ETH(amount),
      receiver: receiver,
      type: "native"
  })

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">Send ETH</Text>
      <form onSubmit={async e => {
          e.preventDefault()
          await Moralis.enableWeb3()
          fetch({
            onSuccess: () => {
              toast({
                title: 'ETH successfully sent.',
                description: 'Fresh ETH are showing up into the wallet.',
                status: 'success',
                duration: 9000,
                isClosable: true
              })
              setReceiver('')
            },
            onError: (error) => {
              toast({
                title: 'Error: ETH not sent.',
                description: error,
                status: 'error',
                duration: 9000,
                isClosable: true
              })
              setReceiver('')
            }
          })
      }}>
        <FormControl mt="4">
          <FormLabel htmlFor="amount">
            Amount of ETH
          </FormLabel>
          <NumberInput step={0.1} onChange={handleChange}>
            <NumberInputField id="amount" value={amount} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel htmlFor="receiver">Send to</FormLabel>
          <Input onChange={e => setReceiver(e.target.value)} id="receiver" value={receiver} type="text" placeholder="Receiver Address" />
        </FormControl>
        <Button type="submit" mt="4" colorScheme="purple" disabled={isFetching}>Send</Button>
      </form>
    </CustomContainer>
  )
}
