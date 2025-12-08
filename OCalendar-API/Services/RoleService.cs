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

    public RoleService(IRepository<Role> repository)
    {
        _roleRepo = repository;
    }

    public Role Create(RoleDto roleDto)
    {
        Role newRole = new Role
        {
            Name = roleDto.name,
            AllowedManageRooms = roleDto.allowedManageRooms,
            AllowedManageTimeslots = roleDto.allowedManageTimeslots,
            AllowedManageUsers = roleDto.allowedManageUsers,
            AllowedManageEvents = roleDto.allowedManageEvents
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

        foundRole.Name = roleDto.name;
        foundRole.AllowedManageRooms = roleDto.allowedManageRooms;
        foundRole.AllowedManageTimeslots = roleDto.allowedManageTimeslots;
        foundRole.AllowedManageUsers = roleDto.allowedManageUsers;
        foundRole.AllowedManageEvents = roleDto.allowedManageEvents;

        _roleRepo.Update(foundRole);
        _roleRepo.SaveChanges();

        return foundRole;
    }
}