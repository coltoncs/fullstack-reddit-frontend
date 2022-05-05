import { Text, Input, Flex, Button } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { useLoginMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";
import { Field, Form, Formik } from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import router from "next/router";
import InputField from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  return (
    <Container height="100vh">
      <Hero title="Log In" />
      <Main>
        <Wrapper variant="small">
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const res = await login(values);
              if (res.data?.login.errors) {
                setErrors(toErrorMap(res.data.login.errors));
              } else if (res.data?.login.user) {
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
                  <Field name="usernameOrEmail">
                    {() => (
                      <InputField
                        name="usernameOrEmail"
                        placeholder="username or email"
                        label="Username or Email"
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
                    Log In
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

export default withUrqlClient(createUrqlClient)(Login);
