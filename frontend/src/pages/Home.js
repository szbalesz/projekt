import { Flex, Grid, GridItem, Box, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  const zenek = [
    {
      title: "Top Dalok 2024",
      description: "Az 50 legtöbbet hallgatott dal Magyarországon 2024-ben. Cover: DESH",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A",
    },
    {
      title: "RÁDIÓ 2025",
      description: "Rádiós slágerek, amiket éjjel nappal hallgatunk.",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A",
    },
    {
      title: "Top Előadók 2024",
      description: "Ezek voltak a legtöbbet hallgatott előadók Magyarországon 2024-ben. Cover: Azahriah",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A",
    },
    {
      title: "Hold rádió",
      description: "Csoky, Grasa, ekhoe és továbbiak előadásaival",
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqQAhr87cf9o3nfPj42O4loQ1oz8FBJIfJkYckRg2gjzwwu4BT3lqa4NVTDQpzIn7LFRhLPl9LJFL6qp_9i_f-A",
    },
  ];

  return (
    <>
      <Flex minHeight={"100%"} display={{ base: "block", md: "flex" }} justifyContent="center">
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={6}
          width="100%"
          maxWidth="1200px"
          padding={4}
        >
          {zenek.map((zenek, index) => (
            <GridItem key={index}>
              <Box
                borderRadius="md"
                overflow="hidden"
                boxShadow="lg"
                bg="gray.800"
                color="white"
              >
                <Image src={zenek.cover} alt={zenek.title} width="100%" height="250px" objectFit="cover" />
                <Box p={4}>
                  <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {zenek.title}
                  </Text>
                  <Text fontSize="sm">{zenek.description}</Text>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
