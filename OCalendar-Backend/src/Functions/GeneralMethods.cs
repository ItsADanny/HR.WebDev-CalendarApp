public static class GeneralMehtods
{
    public static bool IsFieldFulfilled(string? field)
    {
        if (field is not null) return true;
        return false;
    }

    public static bool IsRequiredLength(string? field, int min, int max)
    {
        if (field is not null) return false;
        if (field.Length >= min && field.Length <= max) return true;
        return false;
    }

    public static bool IsValidEmail(string email)
    {
        string trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith(".")) return false;
        try
        {
            System.Net.Mail.MailAddress addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == trimmedEmail;
        }
        catch
        {
            return false;
        }
    }
    
    private static bool _mIsLetter(char c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    private static bool _mIsDigit(char c) => c >= '0' && c <= '9';
    private static bool _mIsSymbol(char c) => c > 32 && c < 127 && !_mIsDigit(c) && !_mIsLetter(c);

    public static bool IsValidPassword(string password)
    {
        return
        password.Any(c => _mIsLetter(c)) &&
        password.Any(c => _mIsDigit(c)) &&
        password.Any(c => _mIsSymbol(c));
    }
}