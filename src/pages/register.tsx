import { Text, Input, Flex, Button } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { useRegisterMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Container height="100vh">
      <Hero title="Register Now" />
      <Main>
        <Wrapper variant="small">
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await register({ options: values });
              console.log(res);
              if (res.data?.register.errors) {
                setErrors(toErrorMap(res.data.register.errors));
              } else if (res.data?.register.user) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Flex
                  justifyContent={`center`}
                  alignItems={`center`}
                  flexDirection={`column`}
                  gap={`2rem`}
                >
                  <Field name="username">
                    {() => (
                      <InputField
                        name="username"
                        placeholder="username"
                        label="Username"
                      />
                    )}
                  </Field>
                  <Field name="email">
                    {() => (
                      <InputField
                        name="email"
                        placeholder="email"
                        label="Email"
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {() => (
                      <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        type="password"
                      />
                    )}
                  </Field>
                  <Button mt={4} isLoading={isSubmitting} type="submit">
                    Register
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Text>&copy;Colton Sweeney 2022</Text>
      </Footer>
    </Container>
  );
};

export default withUrqlClient(createUrqlClient)(register);
