
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly AppContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(AppContext appContext)
    {
        _context = appContext;
        _dbSet = _context.Set<T>();
    }
    
    public void Add(T entity)
    {
        if (entity == null) throw new ArgumentNullException();
        _dbSet.Add(entity);
    }

    public void Delete(T entity) => _dbSet.Remove(entity);

    public T? GetByID(object Id) => _dbSet.Find(Id);

    public IEnumerable<T> GetBy(Expression<Func<T, bool>> predicate) => _dbSet.Where(predicate);

    public IQueryable<T> Query() => _dbSet.AsQueryable();

    public IEnumerable<T> ReadAll() => _dbSet.ToList();

    public int SaveChanges() => _context.SaveChanges();

    public void Update(T entity) => _dbSet.Update(entity);
}