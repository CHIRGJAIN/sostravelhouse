export interface Tour {
  id: number;
  slug: string;
  title: string;
  destination: string;
  country: string;
  durationDays: number;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
  themes: string[];
  inclusions: string[];
  exclusions: string[];
  itineraryDays: { day: number; title: string; description: string; meals: string[] }[];
  hotels: { name: string; rating: number; location: string; image: string }[];
  images: string[];
  availableMonths: string[];
  flightIncluded: boolean;
  visaAssistance: boolean;
  dealPercent: number;
  maxGroupSize: number;
  category: string;
  highlights: string[];
  nextAvailableDate: string;
}

export interface Review {
  id: number;
  tourId: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  destination: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface Coupon {
  code: string;
  discount: number;
  type: "percent" | "flat";
  minAmount: number;
  description: string;
  valid: boolean;
}

export const destinations = [
  "Goa", "Kerala", "Rajasthan", "Manali", "Kashmir", "Ladakh",
  "Maldives", "Thailand", "Bali", "Dubai", "Singapore", "Switzerland",
  "Paris", "London", "Tokyo", "New York", "Sri Lanka", "Nepal"
];

export const themes = [
  "Honeymoon", "Adventure", "Family", "Group Tours", "Weekend Getaways",
  "Luxury", "Beach", "Mountain", "Cultural", "Wildlife"
];

export const categories = [
  { name: "Domestic", count: 45 },
  { name: "International", count: 32 },
  { name: "Honeymoon", count: 18 },
  { name: "Family", count: 24 },
  { name: "Adventure", count: 15 },
  { name: "Group Tours", count: 20 },
  { name: "Weekend Getaways", count: 12 },
  { name: "Luxury", count: 8 },
];

const tourImages = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800",
];

export const tours: Tour[] = [
  {
    id: 1, slug: "magical-goa-beach-retreat", title: "Magical Goa Beach Retreat", destination: "Goa", country: "India",
    durationDays: 5, pricePerPerson: 18999, rating: 4.7, reviewCount: 234, themes: ["Beach", "Honeymoon", "Weekend Getaways"],
    category: "Domestic", highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls", "Sunset Cruise"],
    inclusions: ["4-star hotel", "Breakfast & dinner", "Airport transfers", "Sightseeing", "Boat cruise"],
    exclusions: ["Flights", "Lunch", "Personal expenses", "Water sports"],
    itineraryDays: [
      { day: 1, title: "Arrival & North Goa", description: "Arrive at Goa airport, transfer to hotel. Evening at Baga Beach with sunset views.", meals: ["Dinner"] },
      { day: 2, title: "North Goa Exploration", description: "Visit Fort Aguada, Calangute Beach, Anjuna Flea Market. Evening at Tito's Lane.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "South Goa Tour", description: "Explore Colva Beach, Basilica of Bom Jesus, Se Cathedral. Spice plantation visit.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Adventure Day", description: "Dudhsagar Falls excursion or water sports at Baga. Evening sunset cruise on Mandovi River.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Departure", description: "Morning leisure at beach. Check out and transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Resort Rio", rating: 4, location: "Arpora", image: tourImages[2] }],
    images: [tourImages[5], tourImages[2], tourImages[0], tourImages[6]],
    availableMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    flightIncluded: false, visaAssistance: false, dealPercent: 15, maxGroupSize: 20, nextAvailableDate: "2026-03-15",
  },
  {
    id: 2, slug: "enchanting-kerala-backwaters", title: "Enchanting Kerala Backwaters", destination: "Kerala", country: "India",
    durationDays: 6, pricePerPerson: 24999, rating: 4.8, reviewCount: 189, themes: ["Honeymoon", "Family", "Cultural"],
    category: "Domestic", highlights: ["Alleppey Houseboat", "Munnar Tea Gardens", "Kathakali Show", "Periyar Wildlife"],
    inclusions: ["4-star hotels", "Houseboat stay", "All meals on houseboat", "Sightseeing", "Airport transfers"],
    exclusions: ["Flights", "Lunch on non-houseboat days", "Personal expenses"],
    itineraryDays: [
      { day: 1, title: "Arrival in Kochi", description: "Arrive at Cochin airport, visit Fort Kochi, Chinese Fishing Nets. Evening Kathakali show.", meals: ["Dinner"] },
      { day: 2, title: "Kochi to Munnar", description: "Drive to Munnar via spice plantations and waterfalls. Visit tea gardens.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Munnar Exploration", description: "Eravikulam National Park, Mattupetty Dam, Echo Point, Tea Museum.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Munnar to Thekkady", description: "Drive to Thekkady. Periyar Wildlife Sanctuary boat ride. Spice garden tour.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Alleppey Houseboat", description: "Drive to Alleppey. Board houseboat for backwater cruise through canals.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Departure", description: "Disembark houseboat. Transfer to Cochin airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Munnar Hills Resort", rating: 4, location: "Munnar", image: tourImages[3] }],
    images: [tourImages[3], tourImages[6], tourImages[1], tourImages[7]],
    availableMonths: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    flightIncluded: false, visaAssistance: false, dealPercent: 10, maxGroupSize: 15, nextAvailableDate: "2026-03-10",
  },
  {
    id: 3, slug: "royal-rajasthan-heritage", title: "Royal Rajasthan Heritage Tour", destination: "Rajasthan", country: "India",
    durationDays: 8, pricePerPerson: 32999, rating: 4.6, reviewCount: 312, themes: ["Cultural", "Family", "Luxury"],
    category: "Domestic", highlights: ["Jaipur Forts", "Udaipur Lakes", "Jodhpur Blue City", "Desert Safari"],
    inclusions: ["Heritage hotels", "All meals", "Private car", "Guide", "Desert safari"],
    exclusions: ["Flights", "Camera fees", "Personal expenses"],
    itineraryDays: [
      { day: 1, title: "Arrive Jaipur", description: "Arrive Pink City. Visit Hawa Mahal, City Palace.", meals: ["Dinner"] },
      { day: 2, title: "Jaipur Forts", description: "Amber Fort elephant ride, Jal Mahal, Nahargarh Fort sunset.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Jaipur to Jodhpur", description: "Drive to Blue City. Mehrangarh Fort, spice markets.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Jodhpur Exploration", description: "Umaid Bhawan Palace, Mandore Gardens, zipline over the fort.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Jodhpur to Jaisalmer", description: "Drive to Golden City. Desert safari with camel ride.", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Jaisalmer", description: "Jaisalmer Fort, Patwon Ki Haveli, Sam Sand Dunes camping.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Jaisalmer to Udaipur", description: "Scenic drive to City of Lakes. Evening Lake Pichola boat ride.", meals: ["Breakfast", "Dinner"] },
      { day: 8, title: "Udaipur & Departure", description: "City Palace, Saheliyon Ki Bari. Transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Heritage Haveli", rating: 4, location: "Jaipur", image: tourImages[0] }],
    images: [tourImages[0], tourImages[4], tourImages[1], tourImages[7]],
    availableMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    flightIncluded: false, visaAssistance: false, dealPercent: 0, maxGroupSize: 25, nextAvailableDate: "2026-03-20",
  },
  {
    id: 4, slug: "paradise-maldives-escape", title: "Paradise Maldives Escape", destination: "Maldives", country: "Maldives",
    durationDays: 5, pricePerPerson: 65999, rating: 4.9, reviewCount: 156, themes: ["Honeymoon", "Beach", "Luxury"],
    category: "International", highlights: ["Water Villa", "Snorkeling", "Dolphin Cruise", "Underwater Dining"],
    inclusions: ["Water villa", "All meals", "Speedboat transfers", "Snorkeling gear", "Dolphin cruise"],
    exclusions: ["International flights", "Visa", "Spa treatments", "Water sports premium"],
    itineraryDays: [
      { day: 1, title: "Welcome to Paradise", description: "Arrive Male, speedboat to resort. Check-in to water villa. Sunset welcome dinner.", meals: ["Dinner"] },
      { day: 2, title: "Ocean Adventures", description: "Morning snorkeling at coral reef. Afternoon dolphin watching cruise.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Island Exploration", description: "Visit local island, spa session, underwater restaurant experience.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Water Sports & Leisure", description: "Jet skiing, parasailing, or simply relax by the infinity pool. Romantic beach dinner.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Farewell", description: "Sunrise yoga, final breakfast. Speedboat to Male for departure.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Coral Paradise Resort", rating: 5, location: "South Ari Atoll", image: tourImages[5] }],
    images: [tourImages[5], tourImages[6], tourImages[2], tourImages[1]],
    availableMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    flightIncluded: false, visaAssistance: true, dealPercent: 20, maxGroupSize: 10, nextAvailableDate: "2026-03-01",
  },
  {
    id: 5, slug: "amazing-thailand-adventure", title: "Amazing Thailand Adventure", destination: "Thailand", country: "Thailand",
    durationDays: 7, pricePerPerson: 42999, rating: 4.5, reviewCount: 278, themes: ["Adventure", "Beach", "Family"],
    category: "International", highlights: ["Bangkok Temples", "Phi Phi Islands", "Elephant Sanctuary", "Night Markets"],
    inclusions: ["4-star hotels", "Daily breakfast", "Island tour", "Transfers", "City tour"],
    exclusions: ["International flights", "Visa", "Lunch & dinner", "Personal expenses"],
    itineraryDays: [
      { day: 1, title: "Bangkok Arrival", description: "Arrive Bangkok. Visit Grand Palace, Wat Phra Kaew. Evening at Khao San Road.", meals: ["Dinner"] },
      { day: 2, title: "Bangkok City Tour", description: "Wat Arun, floating market, Chinatown. Evening rooftop dinner.", meals: ["Breakfast"] },
      { day: 3, title: "Bangkok to Phuket", description: "Fly to Phuket. Afternoon at Patong Beach. Phuket Old Town walk.", meals: ["Breakfast"] },
      { day: 4, title: "Phi Phi Islands", description: "Full day Phi Phi Islands tour. Maya Bay, snorkeling, monkey beach.", meals: ["Breakfast", "Lunch"] },
      { day: 5, title: "Elephant Sanctuary", description: "Visit ethical elephant sanctuary. Afternoon at Kata Beach.", meals: ["Breakfast"] },
      { day: 6, title: "Krabi Day Trip", description: "Four Islands tour from Krabi. Railay Beach, Phra Nang Cave.", meals: ["Breakfast", "Lunch"] },
      { day: 7, title: "Departure", description: "Morning leisure. Transfer to Phuket airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Centara Grand", rating: 4, location: "Bangkok", image: tourImages[0] }],
    images: [tourImages[4], tourImages[5], tourImages[2], tourImages[3]],
    availableMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    flightIncluded: false, visaAssistance: true, dealPercent: 12, maxGroupSize: 20, nextAvailableDate: "2026-04-01",
  },
  {
    id: 6, slug: "mesmerizing-kashmir-valley", title: "Mesmerizing Kashmir Valley", destination: "Kashmir", country: "India",
    durationDays: 6, pricePerPerson: 22999, rating: 4.8, reviewCount: 198, themes: ["Family", "Honeymoon", "Mountain"],
    category: "Domestic", highlights: ["Dal Lake Shikara", "Gulmarg Gondola", "Pahalgam Valley", "Mughal Gardens"],
    inclusions: ["Houseboat stay", "Hotels", "All meals", "Shikara ride", "Sightseeing"],
    exclusions: ["Flights", "Gondola tickets", "Pony rides", "Personal expenses"],
    itineraryDays: [
      { day: 1, title: "Srinagar Arrival", description: "Arrive Srinagar. Shikara ride on Dal Lake. Check in to houseboat.", meals: ["Dinner"] },
      { day: 2, title: "Mughal Gardens", description: "Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi. Floating market.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Gulmarg Excursion", description: "Drive to Gulmarg. Gondola ride to Kongdoori. Snow activities.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Pahalgam Adventure", description: "Drive to Pahalgam. Betaab Valley, Aru Valley, Chandanwari.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Sonmarg Day Trip", description: "Day trip to Sonmarg. Thajiwas Glacier, Zoji La Pass viewpoint.", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Departure", description: "Morning at leisure. Transfer to Srinagar airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Royal Houseboat", rating: 4, location: "Dal Lake", image: tourImages[1] }],
    images: [tourImages[1], tourImages[3], tourImages[6], tourImages[4]],
    availableMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    flightIncluded: false, visaAssistance: false, dealPercent: 0, maxGroupSize: 15, nextAvailableDate: "2026-04-15",
  },
  {
    id: 7, slug: "romantic-bali-getaway", title: "Romantic Bali Getaway", destination: "Bali", country: "Indonesia",
    durationDays: 6, pricePerPerson: 48999, rating: 4.7, reviewCount: 167, themes: ["Honeymoon", "Beach", "Cultural"],
    category: "International", highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Kintamani Volcano", "Beach Club"],
    inclusions: ["Villa stay", "Daily breakfast", "Airport transfers", "Temple tours", "Spa session"],
    exclusions: ["International flights", "Visa on arrival", "Lunch & dinner", "Water sports"],
    itineraryDays: [
      { day: 1, title: "Bali Welcome", description: "Arrive Ngurah Rai airport. Transfer to Seminyak villa. Beach sunset.", meals: ["Dinner"] },
      { day: 2, title: "Ubud Cultural Day", description: "Monkey Forest, Tegallalang Rice Terraces, Ubud Art Market, waterfall.", meals: ["Breakfast"] },
      { day: 3, title: "Temple & Volcano Tour", description: "Kintamani volcano view, Tirta Empul Temple, coffee plantation.", meals: ["Breakfast", "Lunch"] },
      { day: 4, title: "Beach & Water Sports", description: "Nusa Dua beach, water sports, Uluwatu Temple sunset with Kecak dance.", meals: ["Breakfast"] },
      { day: 5, title: "Island Hopping", description: "Day trip to Nusa Penida. Kelingking Beach, Crystal Bay snorkeling.", meals: ["Breakfast", "Lunch"] },
      { day: 6, title: "Departure", description: "Morning spa. Transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Seminyak Beach Villa", rating: 5, location: "Seminyak", image: tourImages[2] }],
    images: [tourImages[6], tourImages[3], tourImages[5], tourImages[1]],
    availableMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    flightIncluded: false, visaAssistance: true, dealPercent: 8, maxGroupSize: 12, nextAvailableDate: "2026-05-01",
  },
  {
    id: 8, slug: "dazzling-dubai-experience", title: "Dazzling Dubai Experience", destination: "Dubai", country: "UAE",
    durationDays: 5, pricePerPerson: 55999, rating: 4.6, reviewCount: 245, themes: ["Luxury", "Family", "Adventure"],
    category: "International", highlights: ["Burj Khalifa", "Desert Safari", "Palm Jumeirah", "Dubai Mall"],
    inclusions: ["5-star hotel", "Desert safari", "Dhow cruise dinner", "City tour", "Transfers"],
    exclusions: ["Flights", "Visa", "Lunch", "Shopping expenses", "Optional activities"],
    itineraryDays: [
      { day: 1, title: "Dubai Welcome", description: "Arrive Dubai. City tour - Jumeirah Mosque, Palm Jumeirah, Dubai Marina.", meals: ["Dinner"] },
      { day: 2, title: "Modern Dubai", description: "Burj Khalifa At the Top, Dubai Mall, Dubai Fountain show. Aquarium.", meals: ["Breakfast"] },
      { day: 3, title: "Desert Adventure", description: "Morning at leisure. Afternoon desert safari with BBQ dinner and belly dance.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Abu Dhabi Day Trip", description: "Sheikh Zayed Mosque, Yas Island, Ferrari World (optional). Dhow cruise dinner.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Departure", description: "Morning at Dubai Creek, Gold Souk. Transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "JW Marriott Marquis", rating: 5, location: "Business Bay", image: tourImages[0] }],
    images: [tourImages[0], tourImages[4], tourImages[2], tourImages[7]],
    availableMonths: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    flightIncluded: false, visaAssistance: true, dealPercent: 5, maxGroupSize: 25, nextAvailableDate: "2026-03-05",
  },
  {
    id: 9, slug: "scenic-manali-expedition", title: "Scenic Manali Expedition", destination: "Manali", country: "India",
    durationDays: 5, pricePerPerson: 15999, rating: 4.4, reviewCount: 321, themes: ["Adventure", "Mountain", "Family"],
    category: "Domestic", highlights: ["Rohtang Pass", "Solang Valley", "Old Manali", "Hadimba Temple"],
    inclusions: ["3-star hotel", "Breakfast & dinner", "Sightseeing", "Volvo bus transfers"],
    exclusions: ["Activities", "Lunch", "Personal expenses", "Rohtang permit"],
    itineraryDays: [
      { day: 1, title: "Delhi to Manali", description: "Overnight Volvo from Delhi to Manali.", meals: [] },
      { day: 2, title: "Manali Local", description: "Arrive Manali. Visit Hadimba Temple, Manu Temple, Vashisht Hot Springs.", meals: ["Dinner"] },
      { day: 3, title: "Solang Valley", description: "Adventure at Solang Valley - paragliding, zorbing, skiing (seasonal).", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Rohtang/Atal Tunnel", description: "Excursion to Rohtang Pass or Atal Tunnel. Snow activities.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Departure", description: "Morning at Mall Road. Depart for Delhi.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Snow Valley Resort", rating: 3, location: "Mall Road", image: tourImages[1] }],
    images: [tourImages[3], tourImages[1], tourImages[4], tourImages[6]],
    availableMonths: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Dec", "Jan", "Feb"],
    flightIncluded: false, visaAssistance: false, dealPercent: 18, maxGroupSize: 30, nextAvailableDate: "2026-05-10",
  },
  {
    id: 10, slug: "singapore-city-break", title: "Spectacular Singapore City Break", destination: "Singapore", country: "Singapore",
    durationDays: 5, pricePerPerson: 52999, rating: 4.7, reviewCount: 203, themes: ["Family", "Luxury", "Cultural"],
    category: "International", highlights: ["Marina Bay Sands", "Sentosa Island", "Gardens by the Bay", "Night Safari"],
    inclusions: ["4-star hotel", "Breakfast", "Airport transfers", "City tour", "Sentosa pass"],
    exclusions: ["Flights", "Visa", "Lunch & dinner", "Universal Studios"],
    itineraryDays: [
      { day: 1, title: "Singapore Arrival", description: "Arrive Changi. Transfer to hotel. Evening at Marina Bay Sands light show.", meals: [] },
      { day: 2, title: "City Highlights", description: "Merlion Park, Gardens by the Bay, Cloud Forest, Chinatown.", meals: ["Breakfast"] },
      { day: 3, title: "Sentosa Island", description: "Full day at Sentosa - beaches, Adventure Cove, S.E.A. Aquarium.", meals: ["Breakfast"] },
      { day: 4, title: "Culture & Night Safari", description: "Little India, Kampong Glam, Orchard Road shopping. Night Safari.", meals: ["Breakfast"] },
      { day: 5, title: "Departure", description: "Jewel Changi exploration. Departure.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Pan Pacific", rating: 4, location: "Marina Bay", image: tourImages[0] }],
    images: [tourImages[4], tourImages[0], tourImages[2], tourImages[5]],
    availableMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    flightIncluded: false, visaAssistance: true, dealPercent: 0, maxGroupSize: 20, nextAvailableDate: "2026-03-25",
  },
  {
    id: 11, slug: "swiss-alps-luxury-tour", title: "Swiss Alps Luxury Tour", destination: "Switzerland", country: "Switzerland",
    durationDays: 8, pricePerPerson: 189999, rating: 4.9, reviewCount: 89, themes: ["Luxury", "Honeymoon", "Mountain"],
    category: "International", highlights: ["Jungfraujoch", "Lake Geneva", "Interlaken", "Glacier Express"],
    inclusions: ["5-star hotels", "Glacier Express", "Jungfraujoch ticket", "Swiss Pass", "All transfers"],
    exclusions: ["International flights", "Visa", "Meals except breakfast", "Personal expenses"],
    itineraryDays: [
      { day: 1, title: "Zurich Arrival", description: "Arrive Zurich. Lake Zurich cruise. Old town walking tour.", meals: ["Dinner"] },
      { day: 2, title: "Lucerne Day", description: "Train to Lucerne. Chapel Bridge, Lion Monument, Mt. Pilatus cable car.", meals: ["Breakfast"] },
      { day: 3, title: "Interlaken", description: "Travel to Interlaken. Paragliding over Swiss Alps (optional). Lake Thun.", meals: ["Breakfast"] },
      { day: 4, title: "Jungfraujoch", description: "Top of Europe excursion. Ice Palace, Sphinx observation deck.", meals: ["Breakfast"] },
      { day: 5, title: "Bern & Transfer", description: "Visit capital Bern. Travel to Zermatt.", meals: ["Breakfast"] },
      { day: 6, title: "Matterhorn", description: "Gornergrat Railway with Matterhorn views. Glacier hiking.", meals: ["Breakfast"] },
      { day: 7, title: "Glacier Express", description: "Iconic Glacier Express to St. Moritz through 91 tunnels and 291 bridges.", meals: ["Breakfast", "Lunch"] },
      { day: 8, title: "Departure", description: "Transfer to Zurich for departure.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Grand Hotel Zermatt", rating: 5, location: "Zermatt", image: tourImages[1] }],
    images: [tourImages[1], tourImages[3], tourImages[4], tourImages[6]],
    availableMonths: ["Jun", "Jul", "Aug", "Sep"],
    flightIncluded: false, visaAssistance: true, dealPercent: 0, maxGroupSize: 15, nextAvailableDate: "2026-06-15",
  },
  {
    id: 12, slug: "ladakh-road-trip", title: "Ladakh Road Trip Adventure", destination: "Ladakh", country: "India",
    durationDays: 7, pricePerPerson: 28999, rating: 4.5, reviewCount: 176, themes: ["Adventure", "Mountain", "Group Tours"],
    category: "Domestic", highlights: ["Pangong Lake", "Nubra Valley", "Khardung La", "Magnetic Hill"],
    inclusions: ["Camp & hotel stays", "All meals", "SUV transfers", "Permits", "Oxygen cylinder"],
    exclusions: ["Flights to Leh", "AMS medicine", "Personal expenses", "Tips"],
    itineraryDays: [
      { day: 1, title: "Leh Arrival", description: "Arrive Leh. Rest for acclimatization. Evening Leh market walk.", meals: ["Dinner"] },
      { day: 2, title: "Leh Local", description: "Leh Palace, Shanti Stupa, Hall of Fame, Magnetic Hill, Sangam.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Nubra Valley", description: "Cross Khardung La (world's highest motorable road). Double-humped camels at Hunder.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Nubra to Pangong", description: "Drive through Shyok route to Pangong Tso. Lakeside camping.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Pangong Lake", description: "Sunrise at Pangong. Drive back to Leh via Chang La.", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Monasteries Tour", description: "Hemis, Thiksey, Shey monasteries. Stok Palace Museum.", meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Departure", description: "Transfer to Leh airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Pangong Camp", rating: 3, location: "Pangong Lake", image: tourImages[1] }],
    images: [tourImages[1], tourImages[3], tourImages[4], tourImages[6]],
    availableMonths: ["Jun", "Jul", "Aug", "Sep"],
    flightIncluded: false, visaAssistance: false, dealPercent: 10, maxGroupSize: 18, nextAvailableDate: "2026-06-01",
  },
  {
    id: 13, slug: "paris-romance-tour", title: "Paris Romance & Culture Tour", destination: "Paris", country: "France",
    durationDays: 6, pricePerPerson: 145999, rating: 4.8, reviewCount: 134, themes: ["Honeymoon", "Cultural", "Luxury"],
    category: "International", highlights: ["Eiffel Tower", "Louvre Museum", "Seine Cruise", "Versailles Palace"],
    inclusions: ["Boutique hotel", "Breakfast", "Seine dinner cruise", "Museum passes", "Metro pass"],
    exclusions: ["International flights", "Visa", "Lunch & dinner", "Shopping"],
    itineraryDays: [
      { day: 1, title: "Bonjour Paris!", description: "Arrive CDG. Transfer to Left Bank hotel. Evening Seine river cruise.", meals: ["Dinner"] },
      { day: 2, title: "Iconic Paris", description: "Eiffel Tower summit, Champ de Mars, Arc de Triomphe, Champs-Elysees.", meals: ["Breakfast"] },
      { day: 3, title: "Art & Culture", description: "Louvre Museum, Tuileries Garden, Musee d'Orsay, Latin Quarter.", meals: ["Breakfast"] },
      { day: 4, title: "Versailles Day Trip", description: "Palace of Versailles, Hall of Mirrors, Marie Antoinette's estate.", meals: ["Breakfast"] },
      { day: 5, title: "Montmartre & More", description: "Sacre-Coeur, artists' square, Moulin Rouge area. Farewell dinner.", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Au Revoir", description: "Morning at Le Marais. Transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Hotel Le Marais", rating: 4, location: "Le Marais", image: tourImages[0] }],
    images: [tourImages[7], tourImages[0], tourImages[4], tourImages[2]],
    availableMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    flightIncluded: false, visaAssistance: true, dealPercent: 0, maxGroupSize: 12, nextAvailableDate: "2026-05-15",
  },
  {
    id: 14, slug: "sri-lanka-island-trail", title: "Sri Lanka Island Trail", destination: "Sri Lanka", country: "Sri Lanka",
    durationDays: 7, pricePerPerson: 38999, rating: 4.6, reviewCount: 145, themes: ["Adventure", "Cultural", "Wildlife"],
    category: "International", highlights: ["Sigiriya Rock", "Yala Safari", "Train Ride", "Galle Fort"],
    inclusions: ["3-star hotels", "Breakfast & dinner", "Jeep safari", "Train tickets", "Driver guide"],
    exclusions: ["Flights", "Visa", "Lunch", "Entry tickets"],
    itineraryDays: [
      { day: 1, title: "Colombo Arrival", description: "Arrive Bandaranaike airport. Drive to Negombo. Beach walk.", meals: ["Dinner"] },
      { day: 2, title: "Sigiriya & Dambulla", description: "Climb Sigiriya Rock Fortress. Dambulla Cave Temple.", meals: ["Breakfast", "Dinner"] },
      { day: 3, title: "Kandy", description: "Temple of the Tooth, Kandy Lake, Botanical Gardens, cultural show.", meals: ["Breakfast", "Dinner"] },
      { day: 4, title: "Scenic Train to Ella", description: "Famous blue train through tea country. Nine Arches Bridge at sunset.", meals: ["Breakfast", "Dinner"] },
      { day: 5, title: "Ella & Tea Country", description: "Little Adam's Peak, Ravana Falls, tea factory visit.", meals: ["Breakfast", "Dinner"] },
      { day: 6, title: "Yala Safari & Galle", description: "Morning jeep safari at Yala. Drive to Galle Fort.", meals: ["Breakfast", "Dinner"] },
      { day: 7, title: "Galle & Departure", description: "Galle Fort walking tour. Drive to Colombo airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Kandy Hills Hotel", rating: 3, location: "Kandy", image: tourImages[3] }],
    images: [tourImages[3], tourImages[6], tourImages[1], tourImages[5]],
    availableMonths: ["Dec", "Jan", "Feb", "Mar", "Apr"],
    flightIncluded: false, visaAssistance: true, dealPercent: 15, maxGroupSize: 16, nextAvailableDate: "2026-03-12",
  },
  {
    id: 15, slug: "weekend-jim-corbett", title: "Weekend Jim Corbett Wildlife", destination: "Jim Corbett", country: "India",
    durationDays: 3, pricePerPerson: 9999, rating: 4.3, reviewCount: 267, themes: ["Wildlife", "Weekend Getaways", "Family"],
    category: "Domestic", highlights: ["Tiger Safari", "Jungle Walk", "Corbett Falls", "Bird Watching"],
    inclusions: ["Resort stay", "All meals", "2 jungle safaris", "Naturalist guide"],
    exclusions: ["Transport to Corbett", "Personal expenses", "Camera charges"],
    itineraryDays: [
      { day: 1, title: "Arrival & Evening Safari", description: "Arrive Jim Corbett. Check in to jungle resort. Evening jeep safari.", meals: ["Lunch", "Dinner"] },
      { day: 2, title: "Full Day Wildlife", description: "Early morning canter safari. Afternoon jeep safari. Night campfire.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Nature Walk & Departure", description: "Morning nature walk with bird watching. Corbett Falls. Departure.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Corbett Jungle Resort", rating: 3, location: "Dhikala Zone", image: tourImages[3] }],
    images: [tourImages[3], tourImages[6], tourImages[4], tourImages[7]],
    availableMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    flightIncluded: false, visaAssistance: false, dealPercent: 25, maxGroupSize: 20, nextAvailableDate: "2026-03-08",
  },
  {
    id: 16, slug: "tokyo-japan-discovery", title: "Tokyo & Japan Discovery", destination: "Tokyo", country: "Japan",
    durationDays: 8, pricePerPerson: 159999, rating: 4.9, reviewCount: 98, themes: ["Cultural", "Family", "Luxury"],
    category: "International", highlights: ["Mount Fuji", "Kyoto Temples", "Shibuya Crossing", "Bullet Train"],
    inclusions: ["4-star hotels", "Japan Rail Pass", "Airport transfers", "Guided tours", "Breakfast"],
    exclusions: ["International flights", "Visa", "Lunch & dinner", "Optional activities"],
    itineraryDays: [
      { day: 1, title: "Konnichiwa Tokyo!", description: "Arrive Narita/Haneda. Transfer to Shinjuku. Shibuya Crossing night visit.", meals: [] },
      { day: 2, title: "Classic Tokyo", description: "Senso-ji Temple, Meiji Shrine, Harajuku, Akihabara. Tokyo Tower sunset.", meals: ["Breakfast"] },
      { day: 3, title: "Mt. Fuji Day Trip", description: "Bullet train to Hakone. Lake Ashi cruise with Fuji views. Hot springs.", meals: ["Breakfast"] },
      { day: 4, title: "Kyoto by Shinkansen", description: "Bullet train to Kyoto. Fushimi Inari, Kinkaku-ji, Arashiyama Bamboo.", meals: ["Breakfast"] },
      { day: 5, title: "Kyoto Temples", description: "Nijo Castle, Philosophers Path, geisha district Gion. Tea ceremony.", meals: ["Breakfast"] },
      { day: 6, title: "Nara Day Trip", description: "Todai-ji Temple, deer park, Kasuga Shrine. Return to Kyoto.", meals: ["Breakfast"] },
      { day: 7, title: "Osaka", description: "Train to Osaka. Osaka Castle, Dotonbori food street. Street food tour.", meals: ["Breakfast"] },
      { day: 8, title: "Departure", description: "Transfer to Kansai airport for departure.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Hotel Gracery Shinjuku", rating: 4, location: "Shinjuku", image: tourImages[0] }],
    images: [tourImages[7], tourImages[0], tourImages[4], tourImages[2]],
    availableMonths: ["Mar", "Apr", "May", "Oct", "Nov"],
    flightIncluded: false, visaAssistance: true, dealPercent: 0, maxGroupSize: 15, nextAvailableDate: "2026-04-01",
  },
  {
    id: 17, slug: "nepal-everest-base-camp", title: "Nepal Everest Base Camp Trek", destination: "Nepal", country: "Nepal",
    durationDays: 14, pricePerPerson: 45999, rating: 4.7, reviewCount: 112, themes: ["Adventure", "Mountain", "Group Tours"],
    category: "International", highlights: ["Everest Base Camp", "Namche Bazaar", "Tengboche Monastery", "Kala Patthar"],
    inclusions: ["Tea house stays", "All meals on trek", "Guide & porter", "Permits", "Kathmandu hotel"],
    exclusions: ["Flights", "Visa", "Travel insurance", "Personal trekking gear"],
    itineraryDays: [
      { day: 1, title: "Kathmandu", description: "Arrive Kathmandu. Thamel walk. Trek briefing.", meals: ["Dinner"] },
      { day: 2, title: "Fly to Lukla", description: "Scenic flight to Lukla. Trek to Phakding (3-4 hrs).", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 3, title: "Phakding to Namche", description: "Trek to Namche Bazaar through suspension bridges.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 4, title: "Namche Acclimatization", description: "Rest day. Hike to Everest viewpoint hotel.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 5, title: "Namche to Tengboche", description: "Trek to Tengboche Monastery with Everest views.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 6, title: "Tengboche to Dingboche", description: "Continue trek through rhododendron forests.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 7, title: "Dingboche Rest", description: "Acclimatization day. Short hike to Nagarjun Hill.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 8, title: "To Lobuche", description: "Trek to Lobuche (4940m). See Khumbu Glacier.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 9, title: "Everest Base Camp!", description: "Trek to Gorak Shep then to EBC (5364m)! Return to Gorak Shep.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 10, title: "Kala Patthar", description: "Early morning Kala Patthar (5545m) for Everest sunrise. Descend to Pheriche.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 11, title: "Descend to Namche", description: "Long descent day back to Namche Bazaar.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 12, title: "Namche to Lukla", description: "Final trek day back to Lukla. Celebration dinner.", meals: ["Breakfast", "Lunch", "Dinner"] },
      { day: 13, title: "Fly to Kathmandu", description: "Return flight to Kathmandu. Pashupatinath & Boudhanath visit.", meals: ["Breakfast"] },
      { day: 14, title: "Departure", description: "Transfer to Kathmandu airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "Tea Houses", rating: 2, location: "EBC Route", image: tourImages[1] }],
    images: [tourImages[1], tourImages[3], tourImages[4], tourImages[6]],
    availableMonths: ["Mar", "Apr", "May", "Oct", "Nov"],
    flightIncluded: false, visaAssistance: true, dealPercent: 5, maxGroupSize: 12, nextAvailableDate: "2026-04-10",
  },
  {
    id: 18, slug: "london-british-isles", title: "London & British Isles Explorer", destination: "London", country: "United Kingdom",
    durationDays: 7, pricePerPerson: 135999, rating: 4.6, reviewCount: 156, themes: ["Cultural", "Family", "Luxury"],
    category: "International", highlights: ["Big Ben", "Tower of London", "Stonehenge", "Edinburgh Castle"],
    inclusions: ["4-star hotels", "Breakfast", "London Pass", "Train tickets", "Airport transfers"],
    exclusions: ["International flights", "Visa", "Lunch & dinner", "Shopping"],
    itineraryDays: [
      { day: 1, title: "London Calling", description: "Arrive Heathrow. Transfer to Central London hotel. Evening Thames walk.", meals: [] },
      { day: 2, title: "Royal London", description: "Buckingham Palace, Westminster Abbey, Big Ben, London Eye.", meals: ["Breakfast"] },
      { day: 3, title: "Historic London", description: "Tower of London, Tower Bridge, Borough Market, St Paul's Cathedral.", meals: ["Breakfast"] },
      { day: 4, title: "Museums & Culture", description: "British Museum, Natural History Museum, Notting Hill, West End show.", meals: ["Breakfast"] },
      { day: 5, title: "Stonehenge & Bath", description: "Day trip to Stonehenge and Roman Baths in Bath.", meals: ["Breakfast"] },
      { day: 6, title: "Edinburgh Day Trip", description: "Train to Edinburgh. Edinburgh Castle, Royal Mile, Arthur's Seat.", meals: ["Breakfast"] },
      { day: 7, title: "Departure", description: "Morning at Camden Market. Transfer to airport.", meals: ["Breakfast"] },
    ],
    hotels: [{ name: "The Strand Palace", rating: 4, location: "Covent Garden", image: tourImages[0] }],
    images: [tourImages[7], tourImages[0], tourImages[2], tourImages[4]],
    availableMonths: ["May", "Jun", "Jul", "Aug", "Sep"],
    flightIncluded: false, visaAssistance: true, dealPercent: 0, maxGroupSize: 18, nextAvailableDate: "2026-06-01",
  },
];

export const reviews: Review[] = [
  { id: 1, tourId: 1, name: "Priya Sharma", avatar: "PS", rating: 5, date: "2026-01-15", comment: "Absolutely loved the Goa trip! The hotel was amazing and the sunset cruise was the highlight. Jayambe Holidays made everything seamless.", destination: "Goa" },
  { id: 2, tourId: 2, name: "Rahul Gupta", avatar: "RG", rating: 5, date: "2026-01-10", comment: "Kerala was magical! The houseboat experience was once in a lifetime. Great food and even better views. Highly recommend!", destination: "Kerala" },
  { id: 3, tourId: 4, name: "Ananya Patel", avatar: "AP", rating: 5, date: "2025-12-28", comment: "Maldives was a dream come true! The water villa was incredible. Everything was perfectly organized. Worth every penny!", destination: "Maldives" },
  { id: 4, tourId: 3, name: "Vikram Singh", avatar: "VS", rating: 4, date: "2025-12-20", comment: "Rajasthan tour was spectacular. The heritage hotels added so much charm. Desert safari was thrilling. Only wish it was longer!", destination: "Rajasthan" },
  { id: 5, tourId: 5, name: "Meera Krishnan", avatar: "MK", rating: 4, date: "2025-12-15", comment: "Thailand was fun-packed! Phi Phi Islands were breathtaking. The team was very helpful. Would book with Jayambe Holidays again!", destination: "Thailand" },
  { id: 6, tourId: 6, name: "Arjun Reddy", avatar: "AR", rating: 5, date: "2025-11-30", comment: "Kashmir in autumn is paradise on earth. The shikara ride at sunset was unforgettable. Excellent arrangements throughout.", destination: "Kashmir" },
  { id: 7, tourId: 8, name: "Sneha Joshi", avatar: "SJ", rating: 4, date: "2025-11-20", comment: "Dubai was dazzling! Loved the desert safari and Burj Khalifa. Great value for the experience provided.", destination: "Dubai" },
  { id: 8, tourId: 11, name: "Karan Malhotra", avatar: "KM", rating: 5, date: "2025-11-10", comment: "Switzerland was beyond expectations! Jungfraujoch and Glacier Express were incredible. Luxury at its finest!", destination: "Switzerland" },
  { id: 9, tourId: 7, name: "Divya Nair", avatar: "DN", rating: 5, date: "2025-10-25", comment: "Bali was the perfect honeymoon destination. The rice terraces and temples were so serene. Wonderful experience!", destination: "Bali" },
  { id: 10, tourId: 9, name: "Amit Kumar", avatar: "AK", rating: 4, date: "2025-10-15", comment: "Manali trip was great for a budget adventure. Rohtang was breathtaking. Good hotels and tasty food.", destination: "Manali" },
  { id: 11, tourId: 12, name: "Ritu Agarwal", avatar: "RA", rating: 5, date: "2025-10-05", comment: "Ladakh road trip was the adventure of a lifetime! Pangong Lake at sunrise was magical. Well-planned itinerary.", destination: "Ladakh" },
  { id: 12, tourId: 10, name: "Deepak Choudhary", avatar: "DC", rating: 4, date: "2025-09-28", comment: "Singapore was perfect for our family vacation. Kids loved Sentosa and Night Safari. Everything well organized!", destination: "Singapore" },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1, slug: "top-10-honeymoon-destinations-india", title: "Top 10 Honeymoon Destinations in India for 2026",
    excerpt: "Discover the most romantic getaways across India, from serene backwaters to majestic mountains.",
    content: "India offers an incredible variety of honeymoon destinations that cater to every couple's dream...",
    author: "test", date: "2026-01-20", readTime: "8 min", tags: ["Honeymoon", "India", "Travel Tips"],
    image: tourImages[6], featured: true,
  },
  {
    id: 2, slug: "budget-travel-guide-southeast-asia", title: "Budget Travel Guide: Southeast Asia Under INR 50,000",
    excerpt: "Explore Thailand, Bali, and Vietnam without breaking the bank with our expert tips.",
    content: "Southeast Asia remains one of the most affordable regions for Indian travelers...",
    author: "Priya Mehta", date: "2026-01-15", readTime: "6 min", tags: ["Budget", "Southeast Asia", "Tips"],
    image: tourImages[4], featured: false,
  },
  {
    id: 3, slug: "complete-guide-ladakh-road-trip", title: "The Complete Guide to a Ladakh Road Trip",
    excerpt: "Everything you need to know before embarking on the adventure of a lifetime.",
    content: "A Ladakh road trip is on every traveler's bucket list, and for good reason...",
    author: "Arjun Singh", date: "2026-01-10", readTime: "12 min", tags: ["Adventure", "Ladakh", "Road Trip"],
    image: tourImages[1], featured: false,
  },
  {
    id: 4, slug: "maldives-vs-bali-honeymoon", title: "Maldives vs Bali: Which is Better for Your Honeymoon?",
    excerpt: "A detailed comparison to help you choose the perfect destination for your romantic getaway.",
    content: "Both Maldives and Bali are dream honeymoon destinations, but they offer very different experiences...",
    author: "Sneha Kapoor", date: "2025-12-28", readTime: "7 min", tags: ["Honeymoon", "Maldives", "Bali"],
    image: tourImages[5], featured: false,
  },
  {
    id: 5, slug: "winter-destinations-india-2026", title: "Best Winter Destinations in India for 2026",
    excerpt: "From snow-capped peaks to sunny beaches, find your perfect winter escape.",
    content: "India's diverse geography means you can experience everything from snowfall to sunshine...",
    author: "test", date: "2025-12-20", readTime: "5 min", tags: ["Winter", "India", "Seasonal"],
    image: tourImages[3], featured: false,
  },
];

export const coupons: Coupon[] = [
  { code: "JAYAMBE10", discount: 10, type: "percent", minAmount: 20000, description: "10% off on orders above INR 20,000", valid: true },
  { code: "FIRST5000", discount: 5000, type: "flat", minAmount: 30000, description: "Flat INR 5,000 off on your first booking", valid: true },
  { code: "HONEYMOON15", discount: 15, type: "percent", minAmount: 40000, description: "15% off on honeymoon packages", valid: true },
  { code: "SUMMER20", discount: 20, type: "percent", minAmount: 25000, description: "20% summer sale discount", valid: false },
];

export const teamMembers = [
  { name: "Vineet Kumar", role: "Founder & CEO", bio: "20+ years in the travel industry, passionate about creating unforgettable experiences.", avatar: "VK" },
  { name: "Priya Mehta", role: "Head of Operations", bio: "Expert in tour logistics, ensuring every trip runs like clockwork.", avatar: "PM" },
  { name: "Arjun Singh", role: "Lead Travel Consultant", bio: "Traveled to 50+ countries, helps clients find their perfect destination.", avatar: "AS" },
  { name: "Sneha Kapoor", role: "Marketing Director", bio: "Bringing the Jayambe Holidays experience to travelers worldwide.", avatar: "SK" },
];

export const faqs = [
  { q: "How do I book a tour with Jayambe Holidays?", a: "You can browse our tours on the website, select your preferred package, choose dates and travelers, and proceed to booking. Alternatively, call us at 9000000000 or fill out the custom trip planner form." },
  { q: "Is flight included in the tour price?", a: "Most domestic packages don't include flights unless specified. International packages may include flights - check the 'Inclusions' section of each tour for details." },
  { q: "Can I customize a tour package?", a: "Absolutely! Use our Custom Trip Planner to share your preferences, and our team will create a personalized itinerary within 24 hours." },
  { q: "What is the cancellation policy?", a: "Cancellations made 30+ days before departure receive 90% refund. 15-30 days: 50% refund. Less than 15 days: No refund. See our Policies page for details." },
  { q: "Do you provide visa assistance?", a: "Yes, for international tours we provide complete visa documentation support. Our team guides you through the entire process." },
  { q: "Are tours suitable for senior citizens?", a: "Many of our tours are senior-friendly. We can customize itineraries to ensure comfortable pacing. Contact us to discuss specific requirements." },
];

