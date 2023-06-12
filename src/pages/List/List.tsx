import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Container,
  Skeleton,
  Stack,
  Divider,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { RootState } from "store/store";
import { deleteTodoAction, getTodoListAction } from "store/slices/todo.slice";
import { EStatus } from "types";

const List = () => {
  const toast = useToast();
  const { list, status } = useAppSelector((state: RootState) => state.todo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    try {
      dispatch(getTodoListAction());
    } catch (error) {
      toast({
        title: `error`,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  }, [dispatch]);

  const onSubmit = () => {};

  const onChange = (id: number, type: "update" | "delete") => {
    try {
      type === "delete" ? dispatch(deleteTodoAction(id)) : console.log(1);
      toast({
        title: `task ${id} ${type === "delete" ? "deleted" : "updated"}`,
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `error`,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container marginY={10} maxW="full">
      {status === EStatus.success ? (
        <SimpleGrid spacing={6} columns={[1, 2, 3, 4]}>
          {list.map((todo) => (
            <Card key={todo.id}>
              <CardHeader>
                <Heading size="md">{todo.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{todo.description}</Text>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="blue">
                    Update
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme={todo.completed ? "orange" : "green"}
                  >
                    {todo.completed ? "UNDONE" : "DONE"}
                  </Button>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onChange(todo.id, "delete")}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      ) : status === EStatus.loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <div>Something Went Wrong</div>
      )}
    </Container>
  );
};

export default List;
