import Head from "next/head";
import logoImg from '../../../public/images/logo.svg';
import Image from "next/image";
import {
    Flex,
    Text,
    Center,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import React, { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "@chakra-ui/react";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Register() {

    const toast = useToast();

    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [showPass, setShowPass] = useState<boolean>(false);

    const handleClick = () => setShowPass(!showPass);

    async function handleRegister() {

        if (name === '' || email === '' || password === '') {

            toast({
                title: 'Erro ao fazer cadastro.',
                description: "Preencha todos os campos.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top-right",
                variant: "left-accent"
            });

            return

        };

        await signUp({
            name,
            email,
            password
        });
    }

    return (
        <>
            <Head>
                <title>Barber Pro - Cadastro</title>
            </Head>
            <Flex
                color='#FFF'
                background='barber.900'
                height='100vh'
                alignItems='center'
                justifyContent='center'
            >
                <Flex width={640} direction="column" p={14} rounded={8} >
                    <Center p={4}>
                        <Image
                            src={logoImg}
                            alt="Logo Barber Pro"
                            quality={100}
                            width={240}
                        />
                    </Center>

                    <Input
                        background='barber.400'
                        variant='filled'
                        size="lg"
                        placeholder="Nome da barbearia"
                        type={'text'}
                        mb={3}
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />

                    <Input
                        background='barber.400'
                        variant='filled'
                        size="lg"
                        placeholder="Digite seu email"
                        type={'email'}
                        mb={3}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />

                    <InputGroup >
                        <Input
                            background='barber.400'
                            variant='filled'
                            size="lg"
                            placeholder="********"
                            type={showPass ? 'text' : 'password'}
                            mb={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />

                        <InputRightElement width='4.5rem' >
                            <Button _hover={{ bg: 'none' }} mr={2} mt={2} background={'transparent'} size={'sm'} onClick={handleClick}>
                                {showPass ? 'Esconder' : 'Mostrar'}
                            </Button>
                        </InputRightElement>

                    </InputGroup>

                    <Button
                        background='button.cta'
                        mb={6}
                        color='gray.900'
                        size='lg'
                        _hover={{ bg: "#FFB13E" }}
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>

                    <Center mt={2}>
                        <Link href='/login'>
                            <Text>Já possui uma conta? <strong>Acessar</strong></Text>
                        </Link>
                    </Center>

                </Flex>
            </Flex>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
    return {
        props: {}
    }
})