import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../store/slices/card.slice';
import { IForm } from '../models/models';
import { schema } from '../models/form';

export const ControlledFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = (data: IForm) => {
    const reader = new FileReader();
    const file = data?.file as FileList;

    if (file && file[0] instanceof File) {
      reader.readAsDataURL(file[0]);
      reader.onloadend = () => {
        const loadedFile = reader.result;
        const dispatchData = {
          ...data,
          file: loadedFile,
        };
        dispatch(setUserData(dispatchData));
        navigate('/');
      };
    }
  };

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
          <legend>Gender:</legend>

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
          <div>
            <input type="checkbox" id="tos" {...register('agreement')} />
            <label htmlFor="tos">I accept the terms and conditions</label>
          </div>
        </fieldset>
        <p>{errors.agreement?.message}</p>
        <label htmlFor="fileImg">Choose a profile picture:</label>
        <input type="file" id="fileImg" accept="image/png, image/jpeg" {...register('file')} />
        <p>{errors.file?.message}</p>
        <label>Country :</label>
        <input type="text" {...register('country')} />
        <p>{errors.country?.message}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
