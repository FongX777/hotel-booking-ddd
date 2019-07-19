# Presenter

Prseneter is at Interface Adapter Layer and help build the view model passed to IO layer.

From Uncle Bob says:

> The job of the Presenter is to repackage the OutputData into viewable form as the ViewModel, which is yet another plain old Java object. The ViewModel contains mostly Strings and flags that the View uses to display the data.
> Whereas the OutputData may contain Date objects, the Presenter will load the ViewModel with corresponding Strings already formatted properly for the user. The same is true of Currency objects or any other business-related data.
> Button and MenuItem names are placed in the ViewModel, as are flags that tell the View whether those Buttons and MenuItems should be gray.

Pleas Noted the reason the output port is different from the input port is that it must not be OWNED by the layer that it abstracts (i.e. Use Case Layer). That is, the Use Case Layer must not be allowed to dictate changes to it. Only the application layer and it's author should decide that the output port can change.

This is in contrast to the input port which is owned by the layer it abstracts. Only the application layer author should decide if it's input port should change.

Following these rules preserves the idea that the application layer, or any inner layer, does not know anything at all about the outer layers.

## Implementation Details

1. For every use case, the presenter must implements its output port interface.
2. After use case finish its job, it will pass the response modle throgh output port to the presenter, then the presenter can repackage the response model into view model.

## Example

1. The user interacts with the view.
2. The view creates a request (object) which is passed to the controller.
3. The controller converts the request into a request model and passes it to the use case interactor through its input port.
4. The use case interactor processes the request model and creates a response model which is passed through the output port to the **presenter**.
5. The **presenter** converts the response model to view model which is then passed to the view.
6. The user sees the result of his interaction in the view.

## Questions Not Solved

1. What's 'View' means? IO Layer? Are http, grpc, and console views?
2. What's the relationship between the presenter and the IO Layer? one-to-one? one-to-many?
3. Should I create a view model class for each controller method return?
4. `user.ts` or `user/index.ts`?
   > I think in the begining, to reduce the complexity of the file structure, I would keep using `user.ts` unitl the controller is too large to fit in a file.

## References

- [The Clean Architecture Dependency Rule - page 2][ca-article]
- [Clean Architecture : Part 2 – The Clean Architecture][ca-article-2]
- [Implementing Clean Architecture - Of controllers and presenters](http://www.plainionist.net/Implementing-Clean-Architecture-Controller-Presenter/)
- [YT - Robert C Martin - Clean Architecture and Design](https://www.youtube.com/watch?v=Nsjsiz2A9mg&feature=youtu.be&t=2476)
- [Clean Architecture: Use case containing the presenter or returning data?](https://softwareengineering.stackexchange.com/questions/357052/clean-architecture-use-case-containing-the-presenter-or-returning-data)
- [Clean architecture. What are the jobs of presenter?](https://stackoverflow.com/questions/46510550/clean-architecture-what-are-the-jobs-of-presenter)

[ca-article]: http://www.informit.com/articles/article.aspx?p=2832399&seqNum=2 'Clean Architecture Article'
[ca-book]: http://www.informit.com/store/clean-architecture--craftsmans-guide-to-software-structure-9780134494166?w_ptgrevartcl=The+Clean+Architecture+Dependency+Rule_2832399 'Clean Architecture Book'
[ca-article-2]: https://crosp.net/blog/software-architecture/clean-architecture-part-2-the-clean-architecture/
