import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Todo = () => {
  //  const [first, setfirst] = useState(second)
  useEffect(() => {}, []);

  return (
    <Container centerContent marginY={20}>
      <Card maxW="lg">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default Todo;
