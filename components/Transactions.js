import { Divider, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {
  const Web3Api = useMoralisWeb3Api()
  const [transactions, setTransactions] = useState()
  const BaseURL = "https://rinkeby.etherscan.io/tx/"

  const fetchTransactions = async () => {
    const data = await Web3Api.account.getTransactions({
      chain: "rinkeby",
      address: user.get('ethAddress'),
      //limit: 5
    })
    if(data) {
      setTransactions(data.result)
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">My last 5 Transactions</Text>
      {transactions && transactions.map(transaction => {
        <div key={transaction.hash}>
          <Link href={`${BaseURL}${transaction.hash}`} isExternal>{transaction.hash}</Link>
          <Divider />
        </div>
      })}
    </CustomContainer>
  )
}