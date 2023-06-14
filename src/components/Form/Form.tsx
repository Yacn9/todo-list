import { useEffect, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { ITodo, TNewTask } from "types";

interface IProps {
  handleForm: (data: TNewTask) => void;
  closeForm: () => void;
  task?: ITodo;
}

const Form = (props: IProps) => {
  const { handleForm, task, closeForm } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (task) {
      titleRef.current && (titleRef.current.value = task.title);
      descriptionRef.current &&
        (descriptionRef.current.value = task.description);
    }
  }, [task]);
  return (
    <Card border="1px" borderColor="blue.200">
      <CardBody>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input ref={titleRef} placeholder="Enter Task's Title" />
        </FormControl>
        <FormControl isRequired marginTop={2}>
          <FormLabel>Description</FormLabel>
          <Textarea
            ref={descriptionRef}
            placeholder="description about this Task"
          />
        </FormControl>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() =>
              handleForm({
                title: titleRef.current?.value!,
                description: descriptionRef.current?.value!,
              })
            }
          >
            Submit
          </Button>
          <Button variant="ghost" colorScheme="red" onClick={closeForm}>
            Close
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Form;
