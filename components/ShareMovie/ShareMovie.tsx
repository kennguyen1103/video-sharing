import { FC } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  Flex,
  Box,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import firebase from "src/firebase";

export const ShareMovie: FC = () => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (values: { url: string }) => {
    const { url } = values;

    await firebase.firestore().collection("videos").add({ url });

    toast({
      title: "Success",
      description: "Video shared.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    reset();
  };

  return (
    <Container
      sx={{
        "& fieldset": { border: "3px solid black", width: "100%", p: "4px" },
        "& legend": { ml: "10px", px: "4px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Share a Youtube movie</legend>

          <FormControl isInvalid={errors.url}>
            <Flex alignItems="center">
              <FormLabel htmlFor="name">Youtube URL:</FormLabel>
              <Box flex="1">
                <Input
                  type="url"
                  id="url"
                  {...register("url", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.url && errors.url.message}
                </FormErrorMessage>
              </Box>
            </Flex>
          </FormControl>

          <Flex w="100%">
            <Button
              width="200px"
              ml="auto"
              colorScheme="blue"
              mt={4}
              isLoading={isSubmitting}
              type="submit"
            >
              Share
            </Button>
          </Flex>
        </fieldset>
      </form>
    </Container>
  );
};
