# Use Case Layer

Use case layer is also known as application layer which is responsible for the behaviors of a software.

The salient point of use case layer is leaving the io part to the controller and focusing on application logic. In this case, every use case is easier to be tested and maintained. Meanwhile, we can use dependency injection to inject services through gateways from other systems, which make testing faster and easier by mocking the dependencies.

## Develop with Test-Driven Design

Before you start writing your use case, you should document your specification by exmples to have a clearer mental model for your use case. Here I suggest cucumber with gherkin syntax as a very popular and useful method to describe your specification.

For Example, here is a use case called: 'register an new user', I can write spec by example like this:

```gherkin
Given I entered email and password
When I register
Then I become an user

Given I entered email and password
But the email is already used
When I register
Then I fail to become a user with mesaage: 'Email Already Used'
```

### Step 1: Test First And Fail First

Ok, after we finish our specification by examples, the next thing we should do is create a new test file instead of the use case code. So here we do:

```bash
touch usecase/user/__tests__/register.spec.ts
```

and use this test format to write your first test:

```ts
// register.spec.ts
describe('Register a user', () => {
  it('should succeed', () => {
    const input: RegisterUserInput = {};
    const output: RegisterUserOutput = {};
    const usecase = (new RegisteruseCase() = {});

    usecase.execute(input, output);

    expect(output.id).not.toBeNull();
  });
});
```

You may be confused by why I create new types for input and output. You can reference this illustrator from the book [Clean Architecture]():

![clean architecutre - accross the boundary](https://i.stack.imgur.com/K44FQ.jpg)

Becase the data would accross the boundary, the use case layer should create input and output to decouple from the adapter layer. However, the original implementation is too complicated and laborious for a simple web app, and we may not change framework in the forsesable future.

Therefore, I just create two simple object type `RegisterInput` type and `RegisterOutput` type without any behavior to mock input data and output data as the illustrator above shown.

By the way, the reason I use `type RegisterInput` instead of `interface RegisterInput` is I want to separate the usage between `type` and `interface` by defining `type` as a data structure format and `interface` as a contract for class to implement.

## Step 2: Write your use case

```bash
touch usecase/user/register.ts
```

```ts
export class RegisterUsecase {
  private readonly userRepo: UserRepository;
  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  execute(input: RegisterInput, output: RegisterOuptut) {
    // 1. check input
    // 2. delegate to domain model
    user = User.register(...)
    // 3. save the result
    this.userRepo.save(user);
    // 4. update the output
    output.id = user.id;
  }
}
export type RegisterInput {}
export type RegisterOutput {}
```

As You can see, we don't have `User` and `Repository`, so we move on to write them and temporarily put the use case and its testing aside.

## Step 3: Write/Update Domain Model

The first thing we should do is create a new test file for the domain model as we do before.

### Domain Model Testing

```
touch domain/model/user/__tests__/user.ts
```

```ts
import { User } from '../user.ts';

describe('Register a new uer', () => {
  it ('should succeed', () => {
    const email = 'xx@mail.com';
    const password = '123456';

    const user = User.create({ email, password });

    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
  })
}
```

### Domain Model

```bash
touch domain/model/user/user.ts
```

```ts
export class User {
  constructor(...) {}

  static create(params: {email: string, password: string }) {
    return new User(...);
  }
}
```

## Step 4: Write/Update Your Repository

Do the same thing like above

## Step 5: Back to Your Use Case And Pass the Test

Try yourself
