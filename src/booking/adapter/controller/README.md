# Controller Introduction

Controller is at Interface Adapter Layer and aims to decouple the relationship between IO layer and Use Case Layer. One good thing about the controller is that you can change the web framework whatever you like without affecting the inner layer. For example, I can easily switch the web framework from [ExpressJS](https://www.npmjs.com/package/express) to [koaJS](https://www.npmjs.com/package/koa) or even [GrahpQL](https://www.npmjs.com/package/graphql) easily by just adding it to the outer layer.

Reference to this [article][ca-article] from [Clean Architecture][ca-book]:

> The web server gathers input data from the user and hands it to the Controller on the upper left.
> The Controller packages that data into a plain old Java object and passes this object through the InputBoundary to the UseCaseInteractor.

![ A typical scenario for a web-based Java system utilizing a database](http://www.informit.com/content/images/chap22_9780134494166/elementLinks/22fig02.jpg)

Also in this article: [Clean Architecture : Part 2 – The Clean Architecture][ca-article-2], it mentioned how to implement it.

So here are the implementation details:

1. For every use case, controller must have a corresponding method.
2. The controller would directly access use case layer
3. The Controller cannot access to the result output from use case layer, it should be handled by presenter instead.
4. The dependencies (e.g. repository) must be injected in the controller constructor.

## Example

1. The user interacts with the view.
2. The view creates a request (object) which is passed to the **controller**.
3. The **controller** converts the request into a request model and passes it to the use case interactor through its input port.
4. The use case interactor processes the request model and creates a response model which is passed through the output port to the presenter.
5. The presenter converts the response model to view model which is then passed to the view.
6. The user sees the result of his interaction in the view.

## Questions Not Solved

1. Does controller have right to access prensenter? or it should use the output port interface instead?
2. Should I create a view model class for each controller method return?
3. `user.ts` or `user/index.ts`?
   > I think in the begining, to reduce the complexity of the file structure, I would keep using `user.ts` unitl the controller is too large to fit in a file.
4. Should I use dependency container here?
   > Maybe dependency container should be used in the outer layer
5. Where should I inject repository?
6. Controller should be extracted from the route handler?

## References

- [The Clean Architecture Dependency Rule - page 2][ca-article]
- [Clean Architecture : Part 2 – The Clean Architecture][ca-article-2]
- [Implementing Clean Architecture - Of controllers and presenters](http://www.plainionist.net/Implementing-Clean-Architecture-Controller-Presenter/)
- [YT - Robert C Martin - Clean Architecture and Design](https://www.youtube.com/watch?v=Nsjsiz2A9mg&feature=youtu.be&t=2476)

[ca-article]: http://www.informit.com/articles/article.aspx?p=2832399&seqNum=2 'Clean Architecture Article'
[ca-book]: http://www.informit.com/store/clean-architecture--craftsmans-guide-to-software-structure-9780134494166?w_ptgrevartcl=The+Clean+Architecture+Dependency+Rule_2832399 'Clean Architecture Book'
[ca-article-2]: https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/
