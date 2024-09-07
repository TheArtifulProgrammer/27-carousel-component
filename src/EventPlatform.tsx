import React, { useRef } from "react";

interface Event {
  id: number;
  image: string;
  date: string;
  location: string;
  description: string;
}

const dummyEvents: Event[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/event1/400/400",
    date: "20 AUGUST",
    location: "HARARE",
    description: "Lorem ipsum dolor sit amet, conse adipiscing elit vest nunc.",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/event2/400/400",
    date: "20 AUGUST",
    location: "BULAWAYO",
    description: "Lorem ipsum dolor sit amet, conse adipiscing elit vest nunc.",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/event3/400/400",
    date: "21 AUGUST",
    location: "HARARE, ZIMBABWE",
    description: "Lorem ipsum dolor sit amet, conse adipiscing elit vest nunc.",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/event4/400/400",
    date: "22 AUGUST",
    location: "VICTORIA FALLS",
    description: "Lorem ipsum dolor sit amet, conse adipiscing elit vest nunc.",
  },
];

const EventCard: React.FC<Event> = ({ image, date, location, description }) => (
  <div className="flex-shrink-0 w-80 mr-6 overflow-hidden rounded-lg shadow-lg">
    <div className="relative h-80">
      <img
        src={image}
        alt={description}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
        <p className="text-sm font-bold">
          {date} | {location}
        </p>
        <p className="text-base mt-2">{description}</p>
      </div>
    </div>
  </div>
);

const EventCarousel: React.FC<{ events: Event[] }> = ({ events }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory"
      >
        {events.map((event) => (
          <div key={event.id} className="snap-start">
            <EventCard {...event} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
};

const SearchBox: React.FC = () => (
  <div className="bg-white rounded-full shadow-lg flex items-center p-2">
    <input
      type="text"
      placeholder="What are you looking for?"
      className="flex-grow px-4 focus:outline-none"
    />
    <input type="text" placeholder="Add Dates" className="px-4 border-l" />
    <select className="px-4 border-l">
      <option value="">Select Category</option>
    </select>
    <input type="text" placeholder="Add Location" className="px-4 border-l" />
    <select className="px-4 border-l">
      <option value="">Select Price Range</option>
    </select>
    <button className="bg-purple-600 text-white p-2 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
);

const EventPlatform: React.FC = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen p-8"
      style={{
        backgroundImage:
          "url('https://twenty-seven-gigs.up.railway.app/_next/static/media/hero-bg@2x.eba6c4a0.webp')",
      }}
    >
      <div className="container mx-auto">
        <div className="flex mb-12">
          <div className="w-2/5 pr-8">
            <h2 className="text-5xl font-bold text-white mb-4">
              Upcoming <br /> Events
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
            <p className="text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              vestibulum nunc.
            </p>
          </div>
          <div className="w-3/5">
            <EventCarousel events={dummyEvents} />
          </div>
        </div>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default EventPlatform;
