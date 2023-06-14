import React, { useEffect, useState } from "react";
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
import {
  createTodoAction,
  deleteTodoAction,
  getTodoListAction,
  updateStatusTodoAction,
  updateTodoAction,
} from "store/slices/todo.slice";
import { EStatus, ITodo, TNewTask } from "types";
import { Form } from "components";

const List = () => {
  const toast = useToast();
  const [openForm, setOpenForm] = useState<{
    open: boolean;
    data: ITodo | null;
  }>();
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
  }, [dispatch, toast]);

  const onChange = (data: ITodo, type: "update" | "delete") => {
    try {
      type === "delete"
        ? dispatch(deleteTodoAction(data.id))
        : dispatch(updateStatusTodoAction(data));
      toast({
        title: `task ${data.id} ${type === "delete" ? "deleted" : "updated"}`,
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

  const handleSubmit = (data: TNewTask, id?: number) => {
    try {
      id
        ? dispatch(updateTodoAction({ data, id }))
        : dispatch(createTodoAction(data));
      setOpenForm(undefined);
      toast({
        title: id ? `task ${id} updated` : "new task added",
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
      <Button
        variant="solid"
        colorScheme="blue"
        onClick={() => setOpenForm({ open: true, data: null })}
        marginBottom={6}
      >
        Create New Task
      </Button>
      {status === EStatus.success ? (
        <SimpleGrid spacing={6} columns={[1, 2, 3, 4]}>
          {openForm?.open && !openForm.data ? (
            <Form
              handleForm={(data) => handleSubmit(data)}
              closeForm={() => setOpenForm(undefined)}
            />
          ) : null}
          {list.map((todo) => (
            <React.Fragment key={todo.id}>
              {todo.id === openForm?.data?.id ? (
                <Form
                  handleForm={(data) => handleSubmit(data, todo.id)}
                  closeForm={() => setOpenForm(undefined)}
                  task={openForm.data}
                />
              ) : (
                <Card
                  border="1px"
                  borderColor={todo.completed ? "green.100" : "red.100"}
                >
                  <CardHeader>
                    <Heading size="md">{todo.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{todo.description}</Text>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme={todo.completed ? "orange" : "green"}
                        onClick={() => onChange(todo, "update")}
                      >
                        {todo.completed ? "UNDONE" : "DONE"}
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => onChange(todo, "delete")}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => setOpenForm({ open: true, data: todo })}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              )}
            </React.Fragment>
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
