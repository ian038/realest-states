import Image from 'next/image'
import Link from 'next/link'
import { Flex, Box, Text, Button } from '@chakra-ui/react'

import Property from'../components/Property'
import { BASE_URL, fetchApi } from '../utils/fetchApi';

const Banner = ({ purpose, title1, title2, desc1, desc2, linkName, buttonText, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color ='gray.500' fontWeight='medium' fontSize='sm' >{purpose}</Text>
      <Text fontWeight='bold' fontSize='3xl' >{title1}<br />{title2}</Text>
      <Text fontWeight='medium' fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700' >{desc1}<br />{desc2}</Text>
      <Button size='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <div>
      <Banner 
      purpose='RENT A HOME'
      title1='Rental Homes for'
      title2='Everybody'
      desc1='Explore Apartments, Houses, Villas'
      desc2='and more'
      buttonText='Explore Rent'
      linkName='/search?purpose=for-rent'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner 
      purpose='BUY A HOME'
      title1='Find, Buy & Own Your'
      title2='Dream Home'
      desc1='Explore Apartments, Houses, Villas'
      desc2='and more'
      buttonText='Explore Buy'
      linkName='/search?purpose=for-sale'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </div>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
