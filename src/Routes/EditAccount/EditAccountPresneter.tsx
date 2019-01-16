import React from 'react';
import { MutationFn } from 'react-apollo';
import Helmet from 'react-helmet';
import styled from '../../typed-components';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import PhotoInput from '../../Components/PhotoInput';

const Container = styled.div``;
const ExtendedForm = styled(Form)`
  padding:0px 40px;
`;
const ExtendedInput = styled(Input)`
  margin-bottom:30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  onSubmit,
  onInputChange,
  loading,
  uploading
}) => (
    <Container>
      <Helmet>
        <title>Edit Account | Number</title>
      </Helmet>
      <ExtendedForm submitFn={onSubmit}>
        <PhotoInput
          uploading={uploading}
          fileUrl={profilePhoto}
          onChange={onInputChange}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"text"}
          value={firstName}
          placeholder={"First name"}
          name={"firstName"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"text"}
          value={lastName}
          placeholder={"Last name"}
          name={"lastName"}
        />
        <ExtendedInput
          onChange={onInputChange}
          type={"email"}
          value={email}
          placeholder={"Email"}
          name={"email"}
        />
        <Button onClick={null} value={loading ? "Loading" : "Update"} />
      </ExtendedForm>
    </Container>
  );

export default EditAccountPresenter;