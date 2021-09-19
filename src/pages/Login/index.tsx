import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';

import fullLogo from '../../assets/fullLogo.png';

import { useAuth } from '../../hooks/auth';
import Link from '../../components/Link';

import { Container, Content, InputGroup } from './styles';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(25, 'Máximo de 25 caracteres'),
});

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    (values: { email: string; password: string }) => {
      signIn(values);
    },
    [signIn]
  );

  return (
    <Container>
      <Content>
        <img src={fullLogo} alt="Izymob" />
        <h4>Entre com a sua conta</h4>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form noValidate>
              <Field
                name="email"
                render={({
                  field,
                  form: { touched, errors, setErrors, handleChange },
                }: FieldProps) => (
                  <InputGroup
                    hasError={!!touched[field.name] && !!errors[field.name]}
                  >
                    <input
                      {...field}
                      type="email"
                      onChange={(e) => {
                        setErrors({ password: errors.password });
                        handleChange(e);
                      }}
                      placeholder="E-mail"
                      autoCapitalize="none"
                      autoCorrect="none"
                    />
                    <ErrorMessage name="email" component="span" />
                  </InputGroup>
                )}
              />

              <Field
                name="password"
                render={({
                  field,
                  form: { touched, errors, setErrors, handleChange },
                }: FieldProps) => (
                  <InputGroup
                    hasError={!!touched[field.name] && !!errors[field.name]}
                  >
                    <input
                      {...field}
                      type="password"
                      onChange={(e) => {
                        setErrors({ email: errors.email });
                        handleChange(e);
                      }}
                      placeholder="Senha"
                    />
                    <ErrorMessage name="password" component="span" />
                  </InputGroup>
                )}
              />
              <button type="submit">ENTRAR</button>
            </Form>
          )}
        </Formik>
        <Link>Esqueci minha senha</Link>
      </Content>
    </Container>
  );
};

export default Login;
