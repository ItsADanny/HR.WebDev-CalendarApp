public interface IRoleService
{
    IEnumerable<Role> GetAll();
    Role? GetByID(int id);
    IEnumerable<Role> GetByName(string search);
    Role Create(RoleDto eventDto);
    Role? Update(int id, RoleDto eventDto);
    bool Delete(int id);
}

public class RoleService : IRoleService
{
    private readonly IRepository<Role> _roleRepo;
    private readonly IRepository<User> _userRepo;

    public RoleService(IRepository<Role> repository, IRepository<User> userRepository)
    {
        _roleRepo = repository;
        _userRepo = userRepository;
    }

    public Role Create(RoleDto roleDto)
    {
        User? foundUser = _userRepo.GetByID(roleDto.userID);

        Role newRole = new Role
        {
            Name = roleDto.name,
            AllowedManageRooms = roleDto.allowedManageRooms,
            AllowedManageTimeslots = roleDto.allowedManageTimeslots,
            AllowedManageUsers = roleDto.allowedManageUsers,
            AllowedManageEvents = roleDto.allowedManageEvents,
            AllowedInAdminPanel = roleDto.allowedInAdminPanel,
            CreateByUser = foundUser,
            CreateDateTime = DateTime.Now
        };

        _roleRepo.Add(newRole);
        _roleRepo.SaveChanges();
        return newRole;
    }

    public bool Delete(int id)
    {
        Role? foundRole = _roleRepo.GetByID(id);
        if (foundRole == null) return false;

        _roleRepo.Delete(foundRole);
        _roleRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Role> GetAll() => _roleRepo.ReadAll();

    public Role? GetByID(int id) => _roleRepo.GetByID(id);

    public IEnumerable<Role> GetByName(string search) => _roleRepo.GetBy(p => p.Name.Contains(search));

    public Role? Update(int id, RoleDto roleDto)
    {
        Role? foundRole = _roleRepo.GetByID(id);
        if (foundRole == null) return null;

        User? foundUser = _userRepo.GetByID(roleDto.userID);

        foundRole.Name = roleDto.name;
        foundRole.AllowedManageRooms = roleDto.allowedManageRooms;
        foundRole.AllowedManageTimeslots = roleDto.allowedManageTimeslots;
        foundRole.AllowedManageUsers = roleDto.allowedManageUsers;
        foundRole.AllowedManageEvents = roleDto.allowedManageEvents;
        foundRole.AllowedInAdminPanel = roleDto.allowedInAdminPanel;
        foundRole.UpdateByUser = foundUser;
        foundRole.UpdateDateTime = DateTime.Now;

        _roleRepo.Update(foundRole);
        _roleRepo.SaveChanges();

        return foundRole;
    }
}