import React, { ChangeEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
    Flex,
    Text,
    Switch,
    Heading,
    Button,
    Stack,
    useMediaQuery
} from '@chakra-ui/react';
import { SideBar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { IoMdPricetag } from 'react-icons/io';
import { setupAPIClient } from "../../services/api";

interface HaircutsItem {
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps {
    haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {

    const [isMobile] = useMediaQuery("(max-width: 500px)")


    const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);
    const [disabledHaircut, setDisableHaircut] = useState('enabled');

    async function handleDisabled(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.value === 'disabled') {
            setDisableHaircut('enabled');

            const apiClient = setupAPIClient();

            const response = await apiClient.get('/haircuts', {
                params: {
                    status: true
                }
            })

            setHaircutList(response.data);

        } else {
            setDisableHaircut('disabled');

            const apiClient = setupAPIClient();

            const response = await apiClient.get('/haircuts', {
                params: {
                    status: false
                }
            })

            setHaircutList(response.data);

        }
    }

    return (
        <>
            <Head>
                <title>Modelos de corte - Minha barbearia</title>
            </Head>
            <SideBar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">

                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w='100%'
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        justifyContent="flex-start"
                        mb={0}
                    >
                        <Heading
                            fontSize={isMobile ? '28px' : "3xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Modelos de corte
                        </Heading>

                        <Link href="/haircuts/new">
                            <Button bg='gray.700'>
                                Cadastrar novo
                            </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row">
                            <Text fontWeight="bold">ATIVOS</Text>
                            <Switch
                                value={disabledHaircut}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDisabled(e)}
                                colorScheme="green"
                                size="lg"
                                isChecked={disabledHaircut === 'disabled' ? false : true}
                            />
                        </Stack>

                    </Flex>

                    {haircutList.map(haircut => (

                        <Link key={haircut.id} style={{ width: '100%' }} href={`/haircuts/${haircut.id}`}>
                            <Flex
                                cursor="pointer"
                                p={4}
                                w={'100%'}
                                bg="barber.400"
                                direction={isMobile ? 'column' : 'row'}
                                alignItems={isMobile ? 'flex-start' : 'center'}
                                rounded="4"
                                mb={2}
                                justifyContent="space-between"
                            >

                                <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center" >
                                    <IoMdPricetag size={28} color="#fba931" />
                                    <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                                        {haircut.name}
                                    </Text>
                                </Flex>

                                <Text fontWeight="bold" color="white">
                                    Preço: R${haircut.price}
                                </Text>

                            </Flex>
                        </Link>
                    ))}

                </Flex>
            </SideBar>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/haircuts', {
            params: {
                status: true
            }
        })

        if (response.data === null) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return {
            props: {
                haircuts: response.data
            }
        }

    } catch (error) {
        console.log(error);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})