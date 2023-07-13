import React, { useState } from "react";
import Head from "next/head";
import { SideBar } from "../../../components/sidebar";
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input
} from '@chakra-ui/react';
import Link from "next/link";
import { FiChevronLeft } from 'react-icons/fi';
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../services/api";
import Router from "next/router";

interface NewHaircutProps {
    subscription: boolean;
    count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)')

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    async function handleRegister() {
        if (name === '' || price === '') return;

        try {
            const apiClient = setupAPIClient();

            await apiClient.post('/haircut', {
                name,
                price: Number(price)
            });


            Router.push('/haircuts');


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Barber Pro - Novo modelo de corte</title>
            </Head>

            <SideBar>
                <Flex direction='column' alignItems='flex-start' justifyContent='flex-start'>
                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w='100%'
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        mb={isMobile ? 4 : 0}
                    >

                        <Link href='/haircuts'>
                            <Button
                                mr={4}
                                p={4}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                bg='gray.700' >
                                <FiChevronLeft size={24} color='#fff' />
                                Voltar
                            </Button>
                        </Link>

                        <Heading
                            color='orange.900'
                            mt={4}
                            mb={4}
                            mr={4}
                            fontSize={isMobile ? '28px' : '3xl'}
                        >
                            Modelos de corte
                        </Heading>

                    </Flex>

                    <Flex
                        maxW='700px'
                        bg='barber.400'
                        w='100%'
                        alignItems='center'
                        justifyContent='center'
                        pt={8}
                        pb={8}
                        direction='column'
                    >

                        <Heading
                            fontSize={isMobile ? '22px' : '3xl'}
                            mb={4}
                        >
                            Cadastrar modelo
                        </Heading>

                        <Input
                            placeholder="Nome do corte"
                            size={'lg'}
                            type='text'
                            w='85%'
                            bg='gray.900'
                            mb={3}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Valor do corte"
                            size={'lg'}
                            type='text'
                            w='85%'
                            bg='gray.900'
                            mb={4}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Button
                            onClick={handleRegister}
                            w='85%'
                            disabled={!subscription && count >= 3}
                            size='lg'
                            color='gray.900'
                            mb={6}
                            bg='button.cta'
                            _hover={{ bg: '#ffb13e' }}

                        >
                            Cadastrar
                        </Button>

                        {!subscription && count >= 3 && (
                            <Flex direction='row' align='center' justifyContent='center'>
                                <Text>
                                    Você atingiu seu limite de corte.
                                </Text>
                                <Link href='/planos' >
                                    <Text ml={1} cursor='pointer' fontWeight='bold' color='#31fb6a'> Seja premium</Text>
                                </Link>
                            </Flex>
                        )}

                    </Flex>
                </Flex>
            </SideBar>

        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/haircut/check');
        const count = await apiClient.get('/haircut/count');

        return {
            props: {
                subscription: response.data?.subscriptions?.status === 'active' ? true : false,
                count: count.data
            }
        }




    } catch (error) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})