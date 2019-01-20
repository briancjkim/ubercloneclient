import React from 'react';
import styled from '../../typed-components';
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Form from '../../Components/Form';
import Button from '../../Components/Button';
import { MutationFn } from 'react-apollo';

const Container = styled.div`
  padding:0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom:40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration:underline;
  margin-bottom:20px;
  display:block;
`;


interface IProps {
  address: string
  name: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean;
  onSubmit: MutationFn;
  pickedAddress: boolean;
}
const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onInputChange,
  loading,
  onSubmit,
  pickedAddress
}) => (
    <React.Fragment>
      <Helmet>
        <title>Add Place | Number</title>
      </Helmet>
      <Container>
        <Form submitFn={onSubmit}>
          <ExtendedInput
            placeholder={"Name"}
            type={"text"}
            onChange={onInputChange}
            value={name}
            name={"name"}

          />
          <ExtendedInput
            placeholder={"Address"}
            type={"text"}
            onChange={onInputChange}
            value={address}
            name={"address"}
          />
          <ExtendedLink to={"/find-address"}>Pick place from  map</ExtendedLink>
          {pickedAddress && (
            <Button
              onClick={null}
              value={loading ? "Adding Place" : "Add Place"}
            />
          )}
        </Form>
      </Container>
    </React.Fragment>
  );

export default AddPlacePresenter;