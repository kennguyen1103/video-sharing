import { FC } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import {
  Icon,
  Flex,
  Input,
  Button,
  HStack,
  Heading,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { useForm } from "react-hook-form";

import { authState } from "src/states/auth";

import { useAuth } from "src/hooks/useAuth";

export const NavBar: FC = () => {
  const router = useRouter();
  const auth = useRecoilValue(authState);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });
  const { onLoginOrRegister, onLogout } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    await onLoginOrRegister(email, password);
  };

  const handleSignOut = async () => {
    await onLogout();
  };

  const handleShareMovie = async () => {
    await router.push("/share");
  };

  return (
    <Flex w="100%" alignItems="center" borderBottom="4px solid black" pb="5px">
      <Flex onClick={() => router.push("/")} cursor="pointer">
        <Icon as={AiFillHome} boxSize="40px" />

        <Heading>Funny Movies</Heading>
      </Flex>

      {!auth && (
        <Flex ml="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack spacing="3">
              <FormControl isInvalid={errors.email}>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required",
                  })}
                />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "This is required",
                    minLength: 6,
                  })}
                />
              </FormControl>

              <Button
                w="300px"
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
              >
                Login / Register
              </Button>
            </HStack>
          </form>
        </Flex>
      )}

      {auth && (
        <HStack spacing="3" ml="auto">
          <Text>Welcome {auth.email}</Text>
          <Button onClick={handleShareMovie}>Share a movie</Button>
          <Button onClick={handleSignOut}>Log out</Button>
        </HStack>
      )}
    </Flex>
  );
};
