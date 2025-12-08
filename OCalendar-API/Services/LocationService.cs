public interface ILocationService
{
    IEnumerable<Location> GetAll();
    Location? GetByID(int id);
    IEnumerable<Location> GetByName(string name);
    IEnumerable<Location> GetByCity(string city);
    IEnumerable<Location> GetByStreet(string street);
    IEnumerable<Location> GetByCityAndStreet(string city, string street);
    IEnumerable<Location> GetByHouseNumber(string houseNumber);
    Location Create(LocationDto locationDto);
    Location? Update(int id, LocationDto locationDto);
    bool Delete(int id);
}

public class LocationService : ILocationService
{
    private readonly IRepository<Location> _locationRepo;
    private readonly IRepository<User> _userRepo;

    public LocationService(IRepository<Location> repository, IRepository<User> userRepository)
    {
        _locationRepo = repository;
        _userRepo = userRepository;
    }

    public Location Create(LocationDto locationDto)
    {
        User? foundUser = _userRepo.GetByID(locationDto.userID);

        Location newLocation = new Location
        {
            Name = locationDto.name,
            HouseNumber = locationDto.houseNumber,
            HouseNumberAdditive = locationDto.houseNumberAdditive,
            Street = locationDto.street,
            City = locationDto.city,
            Lon = locationDto.lon,
            Lat = locationDto.lat,
            CreatedByUser = foundUser,
        };

        _locationRepo.Add(newLocation);
        _locationRepo.SaveChanges();
        return newLocation;
    }

    public bool Delete(int id)
    {
        Location? foundLocation = _locationRepo.GetByID(id);
        if (foundLocation == null) return false;

        _locationRepo.Delete(foundLocation);
        _locationRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Location> GetAll() => _locationRepo.ReadAll();

    public Location? GetByID(int id) => _locationRepo.GetByID(id);

    public IEnumerable<Location> GetByName(string search) => _locationRepo.GetBy(p => p.Name.Contains(search));
    public IEnumerable<Location> GetByCity(string city) => _locationRepo.GetBy(p => p.City.Contains(city));
    public IEnumerable<Location> GetByStreet(string street) => _locationRepo.GetBy(p => p.Street.Contains(street));
    public IEnumerable<Location> GetByCityAndStreet(string city, string street) => _locationRepo.GetBy(p => p.City.Contains(city) && p.Street.Contains(street));
    public IEnumerable<Location> GetByHouseNumber(string houseNumber) => _locationRepo.GetBy(p => p.HouseNumber.ToString() == houseNumber);

    public Location? Update(int id, LocationDto locationDto)
    {
        Location? foundLocation = _locationRepo.GetByID(id);
        if (foundLocation == null) return null;
        foundLocation.Name = locationDto.name;
        foundLocation.HouseNumber = locationDto.houseNumber;
        foundLocation.HouseNumberAdditive = locationDto.houseNumberAdditive;
        foundLocation.Street = locationDto.street;
        foundLocation.City = locationDto.city;
        foundLocation.Lon = locationDto.lon;
        foundLocation.Lat = locationDto.lat;

        _locationRepo.Update(foundLocation);
        _locationRepo.SaveChanges();

        return foundLocation;
    }
}