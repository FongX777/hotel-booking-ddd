# Controller

Controller is at Interface Adapter Layer and aims to decouple the relationship between IO layer and Use Case Layer.

Reference to this [article][ca-article] from [Clean Architecture][ca-book]:

> The web server gathers input data from the user and hands it to the Controller on the upper left.
> The Controller packages that data into a plain old Java object and passes this object through the InputBoundary to the UseCaseInteractor.

![ A typical scenario for a web-based Java system utilizing a database](http://www.informit.com/content/images/chap22_9780134494166/elementLinks/22fig02.jpg)

Also in this article: [Clean Architecture : Part 2 – The Clean Architecture][ca-article-2]

So here are the implementation details:

1. For every use case, controller must have a corresponding method.
2. Controller would directly access use case layer
3. After receiving results from use case layer, controller would format results into view model formats which are defined by each controller method.
4. The dependencies (e.g. repository) must be injected in the controller constructor.

## Questions Not Solved

1. Does controller have right to access prensenter? or it should use the output port interface instead?
2. Should I create a view model class for each controller method return?
3. `user.ts` or `user/index.ts`?
   > I think in the begining, to reduce the complexity of the file structure, I would keep using `user.ts` unitl the controller is too large to fit in a file.
4. Should I use dependency container here?
   > Maybe dependency container should be used in the outer layer

[ca-article]: http://www.informit.com/articles/article.aspx?p=2832399&seqNum=2 'Clean Architecture Article'
[ca-book]: http://www.informit.com/store/clean-architecture--craftsmans-guide-to-software-structure-9780134494166?w_ptgrevartcl=The+Clean+Architecture+Dependency+Rule_2832399 'Clean Architecture Book'
[ca-article-2]: https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/
