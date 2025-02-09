
import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  time: string;
  day: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = Array.from({ length: 9 }, (_, i) => `${i + 9}:00`);

const Timetable = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: '', time: '', day: 'Monday' });
  const [timetableImage, setTimetableImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimetableImage(reader.result as string);
        toast({
          title: "Image Uploaded",
          description: "Your timetable image has been uploaded successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all event details",
        variant: "destructive",
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', time: '', day: 'Monday' });
    toast({
      title: "Event Added",
      description: "Your event has been added to the timetable",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
          <p className="text-gray-600 mt-2">Manage your schedule efficiently</p>
        </div>

        <Tabs defaultValue="college">
          <TabsList>
            <TabsTrigger value="college">College Timetable</TabsTrigger>
            <TabsTrigger value="personal">Personal Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="college" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              {timetableImage ? (
                <div className="relative">
                  <img
                    src={timetableImage}
                    alt="Timetable"
                    className="max-w-full rounded-lg"
                  />
                  <Button
                    onClick={() => setTimetableImage(null)}
                    variant="secondary"
                    className="mt-4"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <Label htmlFor="timetable-upload" className="block mt-4">
                    <span className="text-primary hover:text-primary-hover cursor-pointer">
                      Upload timetable image
                    </span>
                    <Input
                      id="timetable-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title..."
                  />
                </div>
                <div>
                  <Label htmlFor="event-time">Time</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="event-day">Day</Label>
                  <select
                    id="event-day"
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <Button onClick={addEvent} className="self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Time</th>
                    {days.map((day) => (
                      <th key={day} className="border p-2">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="border p-2">{time}</td>
                      {days.map((day) => (
                        <td key={`${day}-${time}`} className="border p-2">
                          {events
                            .filter(event => event.day === day && event.time === time)
                            .map(event => (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-primary/10 p-1 rounded text-sm"
                              >
                                {event.title}
                              </motion.div>
                            ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Timetable;
