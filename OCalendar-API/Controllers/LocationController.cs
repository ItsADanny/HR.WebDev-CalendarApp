using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[ServiceFilter(typeof(LoginFilter))]
public class LocationController : ControllerBase
{
    private readonly ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
        _locationService = locationService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Location>> GetAll() => Ok(_locationService.GetAll());

    [HttpGet("{id:int}")]
    public ActionResult<Location> GetByID(int id)
    {
        Location? foundLocation = _locationService.GetByID(id);
        if (foundLocation == null) return NotFound();
        return Ok(foundLocation);
    }

    [HttpGet("name/{name:alpha}")]
    public ActionResult<IEnumerable<Location>> GetByName(string name)
    {
        IEnumerable<Location>? foundLocations = _locationService.GetByName(name);
        if (foundLocations == null) return NotFound();
        return Ok(foundLocations);
    }

    [HttpGet("city/{city:alpha}")]
    public ActionResult<IEnumerable<Location>> GetByCity(string city)
    {
        IEnumerable<Location>? foundLocations = _locationService.GetByName(city);
        if (foundLocations == null) return NotFound();
        return Ok(foundLocations);
    }

    [HttpGet("street/{street:alpha}")]
    public ActionResult<IEnumerable<Location>> GetByStreet(string street)
    {
        IEnumerable<Location>? foundLocations = _locationService.GetByName(street);
        if (foundLocations == null) return NotFound();
        return Ok(foundLocations);
    }

    [HttpGet("{city:alpha}/{street:alpha}")]
    public ActionResult<IEnumerable<Location>> GetByCityAndStreet(string city, string street)
    {
        IEnumerable<Location>? foundLocations = _locationService.GetByCityAndStreet(city, street);
        if (foundLocations == null) return NotFound();
        return Ok(foundLocations);
    }

    [HttpGet("houseNumber/{houseNumber:alpha}")]
    public ActionResult<IEnumerable<Location>> GetByHouseNumber(string houseNumber)
    {
        IEnumerable<Location>? foundLocations = _locationService.GetByName(houseNumber);
        if (foundLocations == null) return NotFound();
        return Ok(foundLocations);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpPost("")]
    public ActionResult<Location> Create([FromBody] LocationDto l)
    {
        return Ok(_locationService.Create(l));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpPut("{id:int}")]
    public ActionResult<Location> Update(int id, [FromBody] LocationDto l)
    {
        Location? locationSucces = _locationService.Update(id, l);
        return locationSucces == null ? NotFound() : Ok(locationSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpDelete("{id:int}")]
    public ActionResult<Location> Delete(int id) => _locationService.Delete(id) ? Ok() : NotFound();


}