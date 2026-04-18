# ContentCreator class (Subject in the Observer Pattern)
class ContentCreator:
    def __init__(self, name):
        self.name = name
        self.followers = []  # List of User objects that follow this creator

    def add_follower(self, user):
        """Add a user to the followers list."""
        # TODO: Implement the method to add a user to the followers list
        pass

    def remove_follower(self, user):
        """Remove a user from the followers list."""
        # TODO: Implement the method to remove a user from the followers list
        pass

    def upload_content(self, content):
        """Notify all followers about the new content."""
        print(f"{self.name} has uploaded new content: {content}")
        # TODO: Use NotificationManager to notify each follower
        pass

# User class (Observer in the Observer Pattern)
class User:
    def __init__(self, name):
        self.name = name

    def update(self, content_creator, content):
        """Receive notification of new content from a content creator."""
        # TODO: Implement the update method to receive notifications
        pass

# NotificationManager class (Singleton)
class NotificationManager:
    _instance = None

    @staticmethod
    def get_instance():
        """Static access method."""
        # TODO: Implement Singleton Pattern to ensure only one instance of NotificationManager
        pass

    def send_notification(self, user, content_creator, content):
        """Send a notification to the user."""
        # TODO: Call the user's update method to send a notification
        pass

# Decorator classes for different notification channels
class NotificationChannelDecorator(User):
    """Base class for notification channel decorators."""
    def __init__(self, user):
        self.user = user

    @property
    def name(self):
        """Access the name of the wrapped user."""
        return self.user.name

    def update(self, content_creator, content):
        """Call the update method of the wrapped User object."""
        # TODO: Call the update method on the wrapped User object
        pass

class EmailNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send email notification in addition to the regular update."""
        # TODO: Implement email notification functionality (use a print for simplicity)
        pass

class SMSNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send SMS notification in addition to the regular update."""
        # TODO: Implement SMS notification functionality (use a print for simplicity)
        pass

class PushNotificationDecorator(NotificationChannelDecorator):
    def update(self, content_creator, content):
        """Send push notification in addition to the regular update."""
        # TODO: Implement push notification functionality (use a print for simplicity)
        pass

# Example usage
def main():
    # Creating ContentCreators
    creator1 = ContentCreator("Music Channel")
    creator2 = ContentCreator("Vlog Channel")

    # Creating Users
    user1 = User("Alice")
    user2 = User("Bob")

    # Users follow creators with different notification channels
    # TODO: Alice & Bob should follow creator 1. Alice gets email notifications, Bob gets SMS notifications and Push notifications

    # TODO: Alice should follow creator 2. She should recieve regular notifications not push, email or SMS


    # Simulating content upload
    creator1.upload_content("New Song Release!")
    creator2.upload_content("Day in My Life Vlog")

if __name__ == "__main__":
    main()