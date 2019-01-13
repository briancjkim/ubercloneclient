import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { Mutation } from 'react-apollo';
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';


interface IProps extends RouteComponentProps<any> { }
interface IState {
  verificationKey: string;
  phoneNumber: string;
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> { }

class VerifyPhoneContainer extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      phoneNumber: props.location.state.phone,
      verificationKey: ""
    };
    if (!props.location.state) {
      props.history.push("/");
    }
  }

  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <VerifyMutation
            mutation={VERIFY_PHONE}
            variables={{
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { CompletePhoneVerification } = data;
              if (CompletePhoneVerification.ok) {
                if (CompletePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: CompletePhoneVerification.token
                    }
                  });
                }
                toast.success("You're visited, loggin in now");
              } else {
                toast.error(CompletePhoneVerification.error);
              }
            }}
          >
            {(mutation, { loading }) => (
              <VerifyPhonePresenter
                onSubmit={mutation}
                loading={loading}
                onChange={this.onInputChange}
                verificationKey={verificationKey}
              />
            )}
          </VerifyMutation>
        )}
      </Mutation>

    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;