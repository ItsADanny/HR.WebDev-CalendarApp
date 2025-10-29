public class MComment
{
    public int ID { get; set; }
    public int UID { get; set; }
    public string Text { get; set; }
    public DateTime CreateDateTime
    {
        get
        {
            if (_createDateTime is null) _createDateTime = DateTime.Now;
            return _createDateTime.ToString();
        }
        set
        {
            _createDateTime = DateTime.Parse(value, "");
        }
    }

    private DateTime? _createDateTime;
}