const mockUsers = [
    {
      id: 1,
      name: "Narendra Modi",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/1840721f-71f6-4a4e-94db-0237ab8cdc6e.png",
      country: "India",
      date_added: "2024-12-04",
      is_verified: true,
      is_payment_completed: true,
    },
    {
      id: 2,
      name: "Rahul Gandhi",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/klu.png",
      country: "England",
      date_added: "2024-11-18",
      is_verified: true,
      is_payment_completed: false,
    },
    {
      id: 3,
      name: "Narayana Murthy",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/6ced81a2-2cbf-4c5c-b227-5dbaa10c1157.jpeg",
      country: "USA",
      date_added: "2024-11-18",
      is_verified: false,
      is_payment_completed: false,
    },
    {
      id: 4,
      name: "Sundar Pichai",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/google.png",
      country: "India",
      date_added: "2024-11-15",
      is_verified: true,
      is_payment_completed: true,
    },
    {
      id: 5,
      name: "Elon Musk",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/elonmusk.jpg",
      country: "USA",
      date_added: "2024-11-12",
      is_verified: true,
      is_payment_completed: false,
    },
    {
      id: 6,
      name: "Jeff Bezos",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/bezos.jpg",
      country: "USA",
      date_added: "2024-11-10",
      is_verified: true,
      is_payment_completed: true,
    },
    {
      id: 7,
      name: "Satya Nadella",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/nadella.jpg",
      country: "India",
      date_added: "2024-11-08",
      is_verified: false,
      is_payment_completed: true,
    },
    {
      id: 8,
      name: "Mark Zuckerberg",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/mark.jpg",
      country: "USA",
      date_added: "2024-11-05",
      is_verified: true,
      is_payment_completed: true,
    },
    {
      id: 9,
      name: "Bill Gates",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/gates.jpg",
      country: "USA",
      date_added: "2024-11-03",
      is_verified: true,
      is_payment_completed: true,
    },
    {
      id: 10,
      name: "Ratan Tata",
      icon: "https://studentpro-image.s3.ap-south-1.amazonaws.com/tata.jpg",
      country: "India",
      date_added: "2024-10-31",
      is_verified: true,
      is_payment_completed: true,
    },
    // Additional mocked users
  ];
  
  for (let i = 11; i <= 50; i++) {
    const names = [
      "Alice Johnson",
      "Bob Smith",
      "Charlie Williams",
      "David Brown",
      "Eva Davis",
      "Frank Wilson",
      "Grace Thompson",
      "Hannah White",
      "Ian Harris",
      "Jack Martinez",
      "Kate Robinson",
      "Liam Clark",
      "Mia Lewis",
      "Noah Walker",
      "Olivia Allen",
      "Paul Young",
      "Quinn Hernandez",
      "Ruby King",
      "Sophia Wright",
      "Thomas Lopez",
      "Uma Hill",
      "Victor Scott",
      "Wendy Adams",
      "Xander Baker",
      "Yara Gonzalez",
      "Zane Parker",
    ];
    const countries = ["India", "USA", "England", "Canada", "Australia"];
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomCountryIndex = Math.floor(Math.random() * countries.length);
    const randomVerified = Math.random() > 0.5;
    const randomPayment = Math.random() > 0.5;
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 31556952000)
    ) // Random date within the last year
      .toISOString()
      .split("T")[0];
  
    mockUsers.push({
      id: i,
      name: names[randomIndex],
      icon: `https://dummyimage.com/64x64/635CF4/ffffff&text=${names[randomIndex][0]}`,
      country: countries[randomCountryIndex],
      date_added: randomDate,
      is_verified: randomVerified,
      is_payment_completed: randomPayment,
    });
  }
  
  export default mockUsers;