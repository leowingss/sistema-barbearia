import React, { useState } from "react";
import Head from "next/head";
import {
    Flex,
    Text,
    Heading,
    Button,
    Link as ChackraLink,
    useMediaQuery,
    useDisclosure
} from '@chakra-ui/react';
import { canSSRAuth } from "../../utils/canSSRAuth";
import { SideBar } from "../../components/sidebar";
import Link from "next/link";
import { IoMdPerson } from 'react-icons/io';
import { setupAPIClient } from "../../services/api";
import { ModalInfo } from "../../components/modal";

export interface ScheduleItem {
    id: string;
    customer: string;
    haircut: {
        id: string;
        name: string;
        price: string | number;
        user_id: string;
    }
}

interface DashboardProps {
    schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [list, setList] = useState(schedule);
    const [service, setService] = useState<ScheduleItem>();


    const [isMobile] = useMediaQuery('(max-width: 500px)');

    function handleOpenModal(item: ScheduleItem) {
        setService(item);
        onOpen();
    }

    async function handleFinish(id: string) {
        try {
            const apiClient = setupAPIClient();

            await apiClient.delete('/schedule', {
                params: {
                    schedule_id: id
                }
            })


            const filterItem = list.filter(item => item?.id !== id);

            setList(filterItem);

            onClose();

        } catch (error) {
            console.log(error);
            onClose();
        }
    }

    return (
        <>
            <Head>
                <title>Barber Pro - Minha Barbearia</title>
            </Head>
            <SideBar>
                <Flex direction='column' align='flex-start' justify='flex-start' >
                    <Flex w='100%' direction='row' align='center' justify='flex-start'>
                        <Heading fontSize='3xl' mt={4} mb={4} mr={4}>
                            Agenda
                        </Heading>

                        <Link href='/new'>
                            <Button bg='gray.700'>
                                Registrar
                            </Button>
                        </Link>

                    </Flex>

                    {list.map(item => (
                        <ChackraLink onClick={() => handleOpenModal(item)} key={item?.id} w='100%' m={0} p={0} bg='transparent' mt={1} style={{ textDecoration: 'none' }}>
                            <Flex
                                direction={isMobile ? 'column' : 'row'}
                                p={4}
                                rounded={4}
                                mb={4}
                                bg='barber.400'
                                justify='space-between'
                                align={isMobile ? 'flex-start' : 'center'}
                            >

                                <Flex direction='row' mb={isMobile ? 2 : 0} align='center' justify='center'>
                                    <IoMdPerson size={28} color='#F1F1F1' />
                                    <Text fontWeight='bold' noOfLines={1} ml={4}> {item?.customer} </Text>
                                </Flex>

                                <Text fontWeight='bold' mb={isMobile ? 2 : 0}> {item?.haircut?.name} </Text>

                                <Text fontWeight='bold' mb={isMobile ? 2 : 0}>R$ {item?.haircut?.price}</Text>

                            </Flex>
                        </ChackraLink>
                    ))}

                </Flex>
            </SideBar>
            <ModalInfo
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                data={service}
                finishService={() => handleFinish(service?.id)}

            />

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try {
        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/schedule')

        return {
            props: {
                schedule: response.data,
            }
        }

    } catch (error) {
        console.log(error)
        return {
            props: {
                schedule: []
            }
        }
    }
})