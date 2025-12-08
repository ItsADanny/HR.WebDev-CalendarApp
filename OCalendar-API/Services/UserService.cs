public interface IUserService
{
    IEnumerable<User> GetAll();
    User? GetByID(int id);
    IEnumerable<User> GetByRoleID(int roleID);
    IEnumerable<User> GetByEmail(string email);
    IEnumerable<User> GetByFirstName(string firstName);
    IEnumerable<User> GetByLastName(string lastName);

    User Create(UserDto userDto);
    User? Update(int id, UserDto userDto);
    bool Delete(int id);
}

public class UserService : IUserService
{
    private readonly IRepository<User> _userRepo;

    public UserService(IRepository<User> repository)
    {
        _userRepo = repository;
    }

    public User Create(UserDto userDto)
    {
        User newUser = new User
        {
            Email = userDto.email,
            Password = userDto.password,
            FirstName = userDto.firstName,
            LastName = userDto.lastName,
            RoleID = userDto.roleID,
        };

        _userRepo.Add(newUser);
        _userRepo.SaveChanges();
        return newUser;
    }

    public bool Delete(int id)
    {
        User? foundUser = _userRepo.GetByID(id);
        if (foundUser == null) return false;

        _userRepo.Delete(foundUser);
        _userRepo.SaveChanges();
        return true;
    }

    public IEnumerable<User> GetAll() => _userRepo.ReadAll();

    public User? GetByID(int id) => _userRepo.GetByID(id);
    public IEnumerable<User> GetByRoleID(int roleID) => _userRepo.GetBy(p => p.RoleID == roleID);

    public IEnumerable<User> GetByEmail(string email) => _userRepo.GetBy(p => p.Email.Contains(email));
    public IEnumerable<User> GetByFirstName(string firstName) => _userRepo.GetBy(p => p.FirstName.Contains(firstName));
    public IEnumerable<User> GetByLastName(string lastName) => _userRepo.GetBy(p => p.LastName.Contains(lastName));
    
    public User? Update(int id, UserDto userDto)
    {
        User? foundUser = _userRepo.GetByID(id);
        if (foundUser == null) return null;

        foundUser.Email = userDto.email;
        foundUser.Password = userDto.password;
        foundUser.FirstName = userDto.firstName;
        foundUser.LastName = userDto.lastName;
        foundUser.RoleID = userDto.roleID;

        _userRepo.Update(foundUser);
        _userRepo.SaveChanges();

        return foundUser;
    }
}