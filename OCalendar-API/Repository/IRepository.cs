using System.Linq.Expressions;

public interface IRepository<T> where T : class
{
    //CRUD
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);

    int SaveChanges();

    //Read
    IEnumerable<T> ReadAll();
    T? GetByID(Object Id);
    IEnumerable<T> GetBy(Expression<Func<T, bool>> predicate);

    //Any Other
    IQueryable<T> Query();
}