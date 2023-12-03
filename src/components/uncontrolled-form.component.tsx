import { useRef } from 'react';
import * as Yup from 'yup';

export const UncontrolledFormComponent = () => {
  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const rePasswordInputRef = useRef(null);

  // const schema = Yup.object().shape({
  //   username: Yup.string().required().minLength(3).maxLength(25),
  //   email: Yup.string().email().required(),
  //   password: Yup.string().required().minLength(8).maxLenght(25),
  // });
  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    age: Yup.number().required('Age is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('passwordInputRef'), null], 'Passwords must match'),
  });

  const handleSubmit = async () => {
    // const parsedUser = schema.cast({
    //   name: nameInputRef.current.value,
    //   age: ageInputRef.current.value,
    //   email: emailInputRef.current.value,
    //   password: passwordInputRef.current.value,
    //   confirmPassword: rePasswordInputRef.current.value,
    // });
    const aaa = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      confirmPassword: rePasswordInputRef.current.value,
    };
    // const test = schema.validate(aaa).then(console.log);
    // alert(`Name: ${nameInputRef.current.value || ''}`);
    try {
      // validate
      const res = await schema.validate(aaa, { abortEarly: false });
      console.log('-> res', res);
      //  ...
    } catch (e) {
      console.log(e.errors); // => [
      //   'password must be at least 8 characters',
      //   'password must contain at least 1 uppercase letter',
      //   'password must contain at least 1 number',
      //   'password must contain at least 1 symbol',
      // ]
    }
  };

  return (
    <div className="form-component">
      <h3>Uncontrolled Component</h3>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" ref={nameInputRef} />
        <label>Age :</label>
        <input type="text" name="Age" ref={ageInputRef} />
        <label>Email :</label>
        <input type="text" name="Email" ref={emailInputRef} />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" ref={passwordInputRef} />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={rePasswordInputRef}
        />
        {/*<fieldset>*/}
        {/*  <legend>Select a maintenance drone:</legend>*/}

        {/*  <div>*/}
        {/*    <input type="radio" id="huey" name="drone" value="huey" />*/}
        {/*    <label htmlFor="huey">Huey</label>*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <input type="radio" id="dewey" name="drone" value="dewey" />*/}
        {/*    <label htmlFor="dewey">Dewey</label>*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <input type="radio" id="louie" name="drone" value="louie" />*/}
        {/*    <label htmlFor="louie">Louie</label>*/}
        {/*  </div>*/}
        {/*</fieldset>*/}
        {/*<fieldset>*/}
        {/*  <legend>Choose :</legend>*/}

        {/*  <div>*/}
        {/*    <input type="checkbox" id="scales" name="scales" checked />*/}
        {/*    <label htmlFor="scales">Scales</label>*/}
        {/*  </div>*/}
        {/*</fieldset>*/}
        {/*<label htmlFor="avatar">Choose a profile picture:</label>*/}

        {/*<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />*/}
        <button type="submit">Submit</button>

        {/*<label htmlFor="firstName">First Name:</label>*/}
        {/*<input name="firstName" id="firstName" type="text" autoComplete="given-name" />*/}
      </form>
    </div>
  );
};
