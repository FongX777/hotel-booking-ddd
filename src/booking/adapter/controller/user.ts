import { CustomerRepository } from '../../domain/model/customer/repository';
import {
  RegisterCustomerUsecase,
  RegisterCustomerInput,
  RegisterCustomerOutput,
  LoginUsecase,
  LoginInput,
  LoginOutput
} from '../../usecase/customer/';
export class UserController {
  private customerRepo: CustomerRepository;
  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo;
  }

  register(req: RegisterReq): RegisterResp {
    const input: RegisterCustomerInput = {
      name: req.name,
      email: req.email,
      password: req.password
    };

    const output: RegisterCustomerOutput = {};
    const usecase = new RegisterCustomerUsecase(this.customerRepo);
    usecase.execute(input, output);

    return {
      id: output.id as string,
      name: output.name as string,
      email: output.email as string
    };
  }

  login(req: LoginReq): LoginResp {
    const input: LoginInput = {
      email: req.email,
      password: req.password
    };
    const output: LoginOutput = {};

    const usecase = new LoginUsecase('', this.customerRepo);
    usecase.execute(input, output);
    return {
      token: output.token as string,
      id: output.id as string,
      name: output.name as string,
      email: output.email as string
    };
  }
}

type LoginReq = {
  email: string;
  password: string;
};
type LoginResp = {
  token: string;
  id: string;
  name: string;
  email: string;
};

type RegisterReq = {
  name: string;
  email: string;
  password: string;
};

type RegisterResp = {
  id: string;
  name: string;
  email: string;
};
