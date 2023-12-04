import * as Yup from 'yup';
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '../helpers/file-validator';
import { InferType } from 'yup';

export const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8)
    .max(32)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
    ),
  confirmPassword: Yup.string()
    .min(8)
    .max(32)
    .required('Confirm Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
    )
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  gender: Yup.string().required('Gender is required'),
  agreement: Yup.boolean().isTrue('Field is required'),
  file: Yup.mixed()
    .test('required', 'You need to provide a file', (file: FileList | undefined) => {
      return !!file;
    })
    .test('fileSize', 'The file is too large', (file: FileList | undefined) => {
      if (!file) {
        return false;
      }
      return checkIfFilesAreTooBig(file[0]);
    })
    .test('fileFormat', 'The file must be jpg or png', (file: FileList | undefined) => {
      if (!file) {
        return false;
      }
      return checkIfFilesAreCorrectType(file[0]);
    }),
  country: Yup.string().required('Country is required'),
});
type Data = InferType<typeof schema>;

export type ErrorsForm = Partial<Record<keyof Data, string>>;

export interface IForm {
  file?: FileList | undefined;
  agreement?: true | undefined;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
}
