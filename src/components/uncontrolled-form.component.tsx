import { FormEvent, useRef, useState } from 'react';
import { setUserData } from '../store/slices/card.slice';
import { ValidationError } from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorsForm, schema } from '../models/form';

export const UncontrolledFormComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorsForm>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const gender = maleRef.current?.checked
      ? maleRef.current.value
      : femaleRef.current?.checked
      ? femaleRef.current.value
      : undefined;
    const agreement = acceptTermsRef.current?.checked;
    const file = fileRef.current?.files?.[0];
    const country = countryRef.current?.value;
    const data = {
      country,
      file,
      agreement,
      gender,
      confirmPassword,
      password,
      email,
      age,
      name,
    };

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setErrors({});

        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const loadedFile = reader.result;
            const dispatchData = {
              ...data,
              file: loadedFile,
            };
            dispatch(setUserData(dispatchData));
            navigate({ pathname: `/`, search: '' });
          };
        }
      })
      .catch((err: ValidationError) => {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            errorObj[error.path] = error.message;
          }
        });
        setErrors(errorObj);
      });
  };

  return (
    <div className="form-component">
      <h3>Uncontrolled Component</h3>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input type="text" name="name" ref={nameRef} />
        <p>{errors.name}</p>
        <label>Age :</label>
        <input type="number" name="Age" ref={ageRef} />
        <p>{errors.age}</p>
        <label>Email :</label>
        <input type="text" name="Email" ref={emailRef} />
        <p>{errors.email}</p>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" ref={passwordRef} />
        <p>{errors.password}</p>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPasswordRef}
        />
        <p>{errors.confirmPassword}</p>
        <fieldset>
          <legend>Gender:</legend>

          <div>
            <input type="radio" id="male" value="male" ref={maleRef} />
            <label htmlFor="male">Male</label>
          </div>

          <div>
            <input type="radio" id="female" value="female" ref={femaleRef} />
            <label htmlFor="female">Female</label>
          </div>
        </fieldset>
        <p>{errors.gender}</p>
        <fieldset>
          <div>
            <input type="checkbox" id="tos" ref={acceptTermsRef} />
            <label htmlFor="tos">I accept the terms and conditions</label>
          </div>
        </fieldset>
        <p>{errors.agreement}</p>
        <label htmlFor="fileImg">Choose a profile picture:</label>

        <input type="file" id="fileImg" accept="image/png, image/jpeg" ref={fileRef} />
        <p>{errors.file}</p>
        <label>Country :</label>
        <input type="text" ref={countryRef} />
        <p>{errors.country}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
