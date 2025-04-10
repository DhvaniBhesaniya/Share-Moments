import Text from '../shared/Text';
import Card from '../shared/Card';

const EventsPage = () => {
  // This is a placeholder. Later we'll fetch real events from an API
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: 'August 15, 2024',
      description: 'Join us for a day of amazing music and fun activities.',
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: 'September 20, 2024',
      description: 'Learn about the latest technologies and network with professionals.',
    },
    {
      id: 3,
      title: 'Community Meetup',
      date: 'July 1, 2024',
      description: 'Monthly gathering of local community members to discuss and share ideas.',
    },
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Text variant="h1" className="mb-4">Upcoming Events</Text>
          <Text variant="subtitle" className="max-w-2xl mx-auto">
            Discover and join amazing events happening in your area. Connect with people who share your interests.
          </Text>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <Text variant="h4" className="mb-2">{event.title}</Text>
              <Text variant="small" className="mb-4">{event.date}</Text>
              <Text variant="body">{event.description}</Text>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage; 