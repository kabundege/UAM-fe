import * as yup from 'yup';

const ResetSchema = yup
  .object({
    password: yup
      .string()
      .required('Provide your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\^&]).{8,}$/,
        `Provide at least one capital letter, one small letter, one number, one character, and a length of 8 minimum`
      ),
    confirm: yup
      .string()
      .required('Confirm your password'),
  })
  .required();

  const forgotPassSchema = yup
  .object({
    email: yup
      .string()
      .email('Provide a valid email')
      .required('Provide your email')
  })
  .required();

const signInSchema = yup
  .object({
    email: yup
      .string()
      .email('Provide a valid email')
      .required('Provide your email'),
    password: yup.string().required('Provide a password'),
  })
  .required();

const signUpSchema = yup
  .object({
    profilePhoto: yup.mixed().required('Provide your profile photo'),
    document: yup.mixed(),
    name: yup.string().required('Provide the company name'),
    gender: yup.string().required('Provide your gender'),
    age: yup.string().required('Provide your age'),
    maritalStatus: yup.string().required('Provide your marital status'),
    national_id: yup.string().test("len", "Must be exactly 16 characters", (val) => val?.length === 16),
    nationality: yup.string().required('Provide your nationality'),
    email: yup
      .string()
      .email('Provide a valid email')
      .required('Provide your email'),
    password: yup.string().required('Provide a password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\^&]).{8,}$/,
      `Provide at least one capital letter, one small letter, one number, one character, and a length of 8 minimum`
    ),
  })
  .required();



export { signInSchema,signUpSchema,ResetSchema,forgotPassSchema };
