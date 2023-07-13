import Head from "next/head"
import {
    Button,
    Flex,
    Heading,
    Text,
    useMediaQuery
} from '@chakra-ui/react';
import { SideBar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { getStripeJs } from '../../services/stripe-js';

interface PlanosProps {
    premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {

    const [isMobile] = useMediaQuery('(max-width: 500px)');

    const handleSubscribe = async () => {

        if (premium) return;

        try {
            const apiClient = setupAPIClient();
            const response = await apiClient.post('/subscribe')

            const { sessionId } = response.data

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId: sessionId });

        } catch (error) {
            console.log(error);
        }

    }

    async function handleCreatePortal() {

        try {

            if (!premium) return;

            const apiClient = setupAPIClient();
            const response = await apiClient.post('create-portal');

            const { sessionId } = response.data;


            window.location.href = sessionId.url;

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Head>
                <title>Barber Pro - Planos</title>
            </Head>

            <SideBar>
                <Flex w='100%' direction='column' align='flex-start' justify='flex-start'>
                    <Heading fontSize='3xl' mt={4} mb={4} mr={4} >Planos</Heading>
                </Flex>

                <Flex direction='column' align='flex-start' justifyContent='flex-start' pb={8} maxW='780px' w='100%'>
                    <Flex gap={4} w='100%' direction={isMobile ? 'column' : 'row'}>

                        <Flex bg='barber.400' direction='column' rounded={4} p={2} flex={1} >
                            <Heading
                                textAlign='center'
                                fontSize='2xl'
                                mt={2} mb={4}
                                color='gray.100'
                            >Plano Grátis</Heading>
                            <Text fontWeight='medium' ml={4} mb={2}>Registrar cortes</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Criar apenas 3 modelos de cortes</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar dados do perfil</Text>
                        </Flex>


                        <Flex bg='barber.400' direction='column' rounded={4} p={2} flex={1} >
                            <Heading
                                textAlign='center'
                                fontSize='2xl'
                                mt={2} mb={4}
                                color='#31fb6a'
                            >Premium</Heading>
                            <Text fontWeight='medium' ml={4} mb={2}>Registrar cortes ilimitados</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Criar modelos ilimitados</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar modelos de corte</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Editar dados do perfil</Text>
                            <Text fontWeight='medium' ml={4} mb={2}>Receber todas as atualizações</Text>
                            <Text fontWeight='bold' fontSize='2xl' color='#31fb6a' ml={4} mb={2}>R$ 9.99</Text>

                            <Button
                                bg={premium ? 'transparent' : 'button.cta'}
                                m={2}
                                color='#fff'
                                onClick={handleSubscribe}
                                disabled={premium}
                            >
                                {premium ? (
                                    'Você ja é premium'
                                ) :
                                    'Virar Premium'
                                }
                            </Button>

                            {premium && (
                                <Button
                                    m={2}
                                    bg='white'
                                    color='barber.900'
                                    fontWeight='bold'
                                    onClick={handleCreatePortal}
                                >
                                    ALTERAR ASSINATURA
                                </Button>
                            )}


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

        return {
            props: {
                premium: response.data?.subscriptions?.status === 'active' ? true : false
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