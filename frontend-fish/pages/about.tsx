import {FC, useEffect, useMemo, useState} from 'react';
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  Box,
  HStack,
  AspectRatio, Grid, Stack,
} from '@chakra-ui/react';
import {MapPointIcon} from '../ui/icons/MapPointIcon';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import {useRouter} from 'next/router';


const About:FC = ()  => {
  const router = useRouter();
  const [x, setX] = useState(60.002809);
  const [y, setY] = useState(30.276243);

  useEffect(() => {
    if (router.query.address === 'baykonur') {
      setX(60.002809);
      setY(30.276243);
    } else {
      setX(60.183391);
      setY(30.320707);
    }
  }, [router.query.address]);


  const defaultState = useMemo(() => {
    return {
      center: [x, y],
      zoom: 15,
    }
  }, [x, y]);

  return (
    <>
      <Heading as='h1' size='md'>О НАС</Heading>

      <Card variant='customCard' maxW='6xl'>
        <CardBody>
          <Text>
            Наш магазин по продаже форели и рыбопродуктов существует уже несколько лет и за это время мы накопили богатый
            опыт в отношении продажи качественной рыбы и рыбных продуктов. Мы предлагаем широкий выбор рыбы и рыбных
            продуктов, включая свежую, замороженную и консервированную форель и другие виды рыбы, а также морепродукты,
            такие как креветки, моллюски и осьминоги. Мы особое внимание уделяем качеству наших товаров, поэтому
            мы выбираем только самые свежие и качественные продукты, которые поступают к нам из различных регионов мира.
          </Text>
        </CardBody>
      </Card>

      <Card variant='customCard' maxW='6xl'>
        <CardBody>
          <Grid
            gap={['16px', '16px', '0', '0']}
            gridTemplateColumns={['1fr', '1fr', ' 250px 1fr', '250px 1fr']}
          >

            <Box pt={8} >
              <HStack spacing={4} alignItems='flex-start' >
                <Flex>
                  <MapPointIcon height={17} />
                </Flex>
                {router.query.address === 'baykonur' ? (
                  <Text>СПб, Байконурская, 15</Text>
                ) : (
                  <Stack>
                    <Text>д.Вартемяги,</Text>
                    <Text>Приозерское шоссе, 130</Text>
                  </Stack>
                )}
              </HStack>
            </Box>

            <Box width='100%'>
              <AspectRatio ratio={16 / 9}>
                <YMaps>
                  <Map state={defaultState} width='100%' height='100%' style={{ borderRadius: '13px' }}>
                    <Placemark geometry={[x, y]} />
                  </Map>
                </YMaps>
              </AspectRatio>
            </Box>

          </Grid>
        </CardBody>
      </Card>
    </>
  )
}

export default About;
