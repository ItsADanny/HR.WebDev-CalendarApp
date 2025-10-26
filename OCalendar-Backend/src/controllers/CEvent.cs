using Newtonsoft.Json.Linq;

public static class CEvent
{
    public static JObject GetEvent(int? eventID=null)
    {
        if (eventID is null)
        {
            return new JObject("Events", GetEvent());
        }
        return new JObject("Events", CDatabase.GetEvent(eventID));
    }

    private static JArray GetEvent()
    {
        JArray returnValue = new JArray();

        List<MEvent> Events = CDatabase.GetEvents();
        foreach (MEvent mEvent in Events)
        {
            returnValue.Add(new MEvent.ToJSON);
        }

        return returnValue;
    }
    
}