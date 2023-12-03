import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkIfFilesAreCorrectType, checkIfFilesAreTooBig } from '../helpers/file-validator';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(2).max(32).required('Password is required'),
  confirmPassword: Yup.string()
    .min(2)
    .max(32)
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  gender: Yup.string().required('Gender is required'),
  agreement: Yup.boolean().isTrue('test'),
  file: Yup.mixed()
    .test('required', 'You need to provide a file', (file) => {
      return !!file;
    })
    .test('fileSize', 'The file is too large', (file: FileList) => {
      if (!file) {
        return false;
      }
      return checkIfFilesAreTooBig(file[0]);
    })
    .test('fileFormat', 'The file must be jpg or png', (file: FileList) => {
      if (!file) {
        return false;
      }
      return checkIfFilesAreCorrectType(file[0]);
    }),
  country: Yup.string().required('test'),
});

export const ControlledFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  console.log('-> register', register);

  // const schema = Yup.object().shape({
  //   username: Yup.string().required().minLength(3).maxLength(25),
  //   email: Yup.string().email().required(),
  //   password: Yup.string().required().minLength(8).maxLenght(25),
  // });

  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate', name: 'test' },
  //   { value: 'strawberry', label: 'Strawberry', name: 'test' },
  //   { value: 'vanilla', label: 'Vanilla', name: 'test' },
  // ];
  // const Input = (props) => {
  //   console.log('-> props', props);
  //
  //   const { autoComplete = props.autoComplete } = props.selectProps;
  //   return <components.Input {...props} autoComplete={autoComplete} />;
  // };
  return (
    <div className="form-component">
      <h3>Controlled Component</h3>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label>Name :</label>
        <input type="text" {...register('name')} />
        <p>{errors.name?.message}</p>
        <label>Age :</label>
        <input type="number" {...register('age')} />
        <p>{errors.age?.message}</p>
        <label>Email :</label>
        <input type="text" {...register('email')} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password:</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>
        <fieldset>
          <legend>Select a maintenance drone:</legend>

          <div>
            <input type="radio" id="male" value="male" {...register('gender')} />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input type="radio" id="female" value="female" {...register('gender')} />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <p>{errors.gender?.message}</p>
        <fieldset>
          <legend>Choose :</legend>

          <div>
            <input type="checkbox" id="tos" {...register('agreement')} />
            <label htmlFor="tos">Terms of service</label>
          </div>
        </fieldset>
        <p>{errors.agreement?.message}</p>
        <label htmlFor="fileImg">Choose a profile picture:</label>

        <input type="file" id="fileImg" accept="image/png, image/jpeg" {...register('file')} />
        <p>{errors.file?.message}</p>
        <label htmlFor="country">country:</label>
        <input id="country" type="text" autoComplete="given-country" {...register('country')} />
        {/*<Select components={{ Input }} options={options} />*/}
        <p>{errors.country?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
