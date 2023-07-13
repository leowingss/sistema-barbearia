import Head from "next/head";
import { Flex, Text } from '@chakra-ui/react';
import Router from "next/router";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    Router.push('/dashboard');
  }, [])

  return (
    <>
      <Head>
        <title>Barber Pro - Seu Sistema Completo</title>
      </Head>
      <Flex
        background={'barber.900'}
        height='100vh'
        alignItems={'center'}
        justifyContent={'center'}
      >
        {/* <Text fontSize={30}>Pagina home</Text> */}
      </Flex>
    </>
  )
}