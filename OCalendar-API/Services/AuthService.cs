public interface IAuthService
{
    UserSession? Login(LoginDto loginDto);
    bool Logout(string token);
    UserSession SessionExists(string token);
    UserSession SessionExistsForEmail(string email);
}

public class AuthService : IAuthService
{
    private readonly IRepository<UserSession> _userSessionRepo;
    private readonly IRepository<User> _userRepo;

    public AuthService(IRepository<UserSession> repository, IRepository<User> userRepository)
    {
        _userSessionRepo = repository;
        _userRepo = userRepository;
    }

    public UserSession? Login(LoginDto loginDto)
    {
        //Search for the user based on the email and password
        IEnumerable<User> foundUsers = _userRepo.GetBy(u => u.Email == loginDto.email && u.Password == loginDto.password);

        if (foundUsers.Count() > 0)
        {
            string token = GenToken();
            User user = foundUsers.First();

            UserSession newSession = new UserSession()
            {
                User = user,
                Token = token,
                CreateDateTime = DateTime.Now
            };

            _userSessionRepo.Add(newSession);
            _userSessionRepo.SaveChanges();

            return newSession;
        }
        //When no accounts are found, return null
        return null;
    }

    public bool Logout(string token)
    {
        //Search for a existing userSession for the given token
        IEnumerable<UserSession> foundSessions = _userSessionRepo.GetBy(us => us.Token == token);

        if (foundSessions.Count() > 0)
        {
            UserSession userSession = foundSessions.First();

            _userSessionRepo.Delete(userSession);
            _userSessionRepo.SaveChanges();

            return true;
        }

        return false;
    }

    public UserSession? SessionExists(string token)
    {
        //Search for a existing userSession for the given token
        IEnumerable<UserSession> foundSessions = _userSessionRepo.GetBy(us => us.Token == token);

        if (foundSessions.Count() > 0)
        {
            return foundSessions.First();
        }
        return null;
    }

    public UserSession? SessionExistsForEmail(string email)
    {
        //Search for a existing userSession for the given token
        IEnumerable<UserSession> foundSessions = _userSessionRepo.GetBy(us => us.User.Email == email);

        if (foundSessions.Count() > 0)
        {
            return foundSessions.First();
        }
        return null;
    } 

    private static string GenToken(int size=64)
    {
        //Generate a cryptographically secure random token
        byte[] tokenBytes = new byte[size];

        //Temporarly initialize a new Cryptographicly secure Random number generator
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(tokenBytes);
        }

        //Return the randomly generated Token
        return Convert.ToBase64String(tokenBytes);
    }
}