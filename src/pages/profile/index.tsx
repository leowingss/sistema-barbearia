import React, { useContext, useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Box,
    Input,
    Button
} from '@chakra-ui/react';
import { SideBar } from "../../components/sidebar";
import Link from "next/link";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { AuthContext } from "../../contexts/AuthContext";
import { setupAPIClient } from "../../services/api";
import { useToast } from "@chakra-ui/react";

interface ProfileProps {
    user: UserProps;
    premium: boolean;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    endereco: string | null;
}

export default function Profile({ user, premium }: ProfileProps) {

    const toast = useToast(); 
    const { logOutUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user?.name);
    const [endereco, setEndereco] = useState(user && user?.endereco);

    async function handleLogout() {
        await logOutUser();
    }

    async function handleUpdateUser() {

        if (name === '' || endereco === '') return;

        try {
            const apiClient = setupAPIClient();

            await apiClient.put('/users', {
                name,
                endereco
            });

            toast({
                title: 'Dados alterados com sucesso.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent"
            });


        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Head>
                <title>Barber Pro - Minha conta</title>
            </Head>
            <SideBar>
                <Flex direction={'column'} alignItems='flex-start' justifyContent={'flex-start'} >
                    <Flex w={'100%'} direction='row' alignItems='center' justifyContent='flex-start'>
                        <Heading mt={4} mb={4} mr={4} fontSize='3xl' color='orange.900' >Minha Conta</Heading>
                    </Flex>

                    <Flex pt={8} pb={8} bg='barber.400' maxW='700px' w='100%' direction='column' alignItems="center" justifyContent='center'>
                        <Flex direction='column' w='85%'>
                            <Text fontWeight='bold' fontSize={'xl'} mb={2}>Nome da barbearia: </Text>
                            <Input
                                type='text'
                                size='lg'
                                mb={3}
                                w='100%'
                                bg='gray.900'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nome da sua Barbearia "
                            />
                            <Text fontWeight='bold' fontSize={'xl'} mb={2}>Endereço: </Text>
                            <Input
                                type='text'
                                size='lg'
                                w='100%'
                                bg='gray.900'
                                mb={3}
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                placeholder="Endereço da sua Barbearia "
                            />

                            <Text fontWeight='bold' fontSize={'xl'} mb={2}>Plano: </Text>
                            <Flex
                                direction='row'
                                w='100%'
                                mb={3}
                                p={1}
                                borderWidth={1}
                                rounded={6}
                                bg='barber.900'
                                alignItems='center'
                                justifyContent='space-between'

                            >
                                <Text p={2} fontSize='lg' color={premium ? '#FBA931' : '#4DFFB4'} >
                                    Plano {premium ? 'Premium' : 'Grátis'}

                                </Text>
                                <Link href='/planos'>
                                    <Box
                                        cursor='pointer'
                                        p={1}
                                        pl={2}
                                        pr={2}
                                        bg='#00cd52'
                                        rounded={4}>
                                        Mudar plano
                                    </Box>
                                </Link>
                            </Flex>
                            <Button
                                onClick={handleUpdateUser}
                                w='100%'
                                mt={3}
                                mb={4}
                                bg='button.cta'
                                size='lg'
                                _hover={{
                                    bg: '#ffb13e'
                                }}
                            >
                                Salvar
                            </Button>

                            <Button
                                onClick={handleLogout}
                                w='100%'
                                mb={6}
                                bg='transparent'
                                borderWidth={2}
                                borderColor='red.500'
                                size='lg'
                                _hover={{
                                    bg: 'transparent'
                                }}

                            >
                                Sair da conta
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </SideBar>
        </>


    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/me')

        const user = {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            endereco: response.data?.endereco
        };

        return {
            props: {
                user,
                premium: response.data?.subscriptions?.status === 'active' ? true : false
            }
        }

    } catch (error) {
        console.log(error)

        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }

})