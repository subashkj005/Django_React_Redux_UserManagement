from django.db import models


class Profile(models.Model):
    """
    User profile model to store user information.
    """

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    profile_picture = models.ImageField(upload_to='profile/images')
    created_at = models.DateField(auto_now=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        """
        Return the full name of the user for display.
        """
        return f"{self.first_name} {self.last_name}"