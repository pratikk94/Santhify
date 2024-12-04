const mockUsers = 
[
  {
    "id": 1,
    "name": "Narendra Modi",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/1840721f-71f6-4a4e-94db-0237ab8cdc6e.png",
    "country": "India",
    "date_added": "2024-12-04",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 73
  },
  {
    "id": 2,
    "name": "Rahul Gandhi",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/klu.png",
    "country": "England",
    "date_added": "2024-11-18",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 53
  },
  {
    "id": 3,
    "name": "Narayana Murthy",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/6ced81a2-2cbf-4c5c-b227-5dbaa10c1157.jpeg",
    "country": "USA",
    "date_added": "2024-11-18",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 77
  },
  {
    "id": 4,
    "name": "Sundar Pichai",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/google.png",
    "country": "India",
    "date_added": "2024-11-15",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 51
  },
  {
    "id": 5,
    "name": "Elon Musk",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/elonmusk.jpg",
    "country": "USA",
    "date_added": "2024-11-12",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 52
  },
  {
    "id": 6,
    "name": "Jeff Bezos",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/bezos.jpg",
    "country": "USA",
    "date_added": "2024-11-10",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 59
  },
  {
    "id": 7,
    "name": "Satya Nadella",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/nadella.jpg",
    "country": "India",
    "date_added": "2024-11-08",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 55
  },
  {
    "id": 8,
    "name": "Mark Zuckerberg",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/mark.jpg",
    "country": "USA",
    "date_added": "2024-11-05",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 39
  },
  {
    "id": 9,
    "name": "Bill Gates",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/gates.jpg",
    "country": "USA",
    "date_added": "2024-11-03",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 68
  },
  {
    "id": 10,
    "name": "Ratan Tata",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/tata.jpg",
    "country": "India",
    "date_added": "2024-10-31",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 86
  },
  {
    "id": 11,
    "name": "Alice Johnson",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/1840721f-71f6-4a4e-94db-0237ab8cdc6e.png",
    "country": "Australia",
    "date_added": "2024-10-15",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 32
  },
  {
    "id": 12,
    "name": "Bob Smith",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/klu.png",
    "country": "Canada",
    "date_added": "2024-09-25",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 45
  },
  {
    "id": 13,
    "name": "Charlie Williams",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/6ced81a2-2cbf-4c5c-b227-5dbaa10c1157.jpeg",
    "country": "England",
    "date_added": "2024-08-19",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 29
  },
  {
    "id": 14,
    "name": "David Brown",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/google.png",
    "country": "India",
    "date_added": "2024-07-30",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 35
  },
  {
    "id": 15,
    "name": "Eva Davis",
    "icon": "https://studentpro-image.s3.ap-south-1.amazonaws.com/elonmusk.jpg",
    "country": "USA",
    "date_added": "2024-06-25",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 42
  },
  {
    "id": 16,
    "name": "Frank Wilson",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=F",
    "country": "England",
    "date_added": "2024-05-18",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 47
  },
  {
    "id": 17,
    "name": "Grace Thompson",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=G",
    "country": "Canada",
    "date_added": "2024-04-12",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 29
  },
  {
    "id": 18,
    "name": "Hannah White",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=H",
    "country": "India",
    "date_added": "2024-03-24",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 37
  },
  {
    "id": 19,
    "name": "Ian Harris",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=I",
    "country": "Australia",
    "date_added": "2024-02-10",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 33
  },
  {
    "id": 20,
    "name": "Jack Martinez",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=J",
    "country": "USA",
    "date_added": "2024-01-01",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 45
  },
  {
    "id": 21,
    "name": "Kate Robinson",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=K",
    "country": "India",
    "date_added": "2023-12-15",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 29
  },
  {
    "id": 22,
    "name": "Liam Clark",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=L",
    "country": "England",
    "date_added": "2023-11-08",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 38
  },
  {
    "id": 23,
    "name": "Mia Lewis",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=M",
    "country": "Australia",
    "date_added": "2023-10-25",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 40
  },
  {
    "id": 24,
    "name": "Noah Walker",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=N",
    "country": "USA",
    "date_added": "2023-09-15",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 30
  },
  {
    "id": 25,
    "name": "Olivia Allen",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=O",
    "country": "Canada",
    "date_added": "2023-08-01",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 41
  },
  {
    "id": 26,
    "name": "Paul Young",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=P",
    "country": "India",
    "date_added": "2023-07-20",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 35
  },
  {
    "id": 27,
    "name": "Quinn Hernandez",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=Q",
    "country": "England",
    "date_added": "2023-06-11",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 50
  },
  {
    "id": 28,
    "name": "Ruby King",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=R",
    "country": "Australia",
    "date_added": "2023-05-25",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 33
  },
  {
    "id": 29,
    "name": "Sophia Wright",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=S",
    "country": "USA",
    "date_added": "2023-04-14",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 36
  },
  {
    "id": 30,
    "name": "Thomas Lopez",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=T",
    "country": "Canada",
    "date_added": "2023-03-10",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 39
  },
  {
    "id": 31,
    "name": "Uma Hill",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=U",
    "country": "India",
    "date_added": "2023-02-05",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 37
  },
  {
    "id": 32,
    "name": "Victor Scott",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=V",
    "country": "England",
    "date_added": "2023-01-22",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 44
  },
  {
    "id": 33,
    "name": "Wendy Adams",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=W",
    "country": "Australia",
    "date_added": "2023-12-10",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 49
  },
  {
    "id": 34,
    "name": "Xander Baker",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=X",
    "country": "USA",
    "date_added": "2023-11-01",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 48
  },
  {
    "id": 35,
    "name": "Yara Gonzalez",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=Y",
    "country": "Canada",
    "date_added": "2023-10-15",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 33
  },
  {
    "id": 36,
    "name": "Zane Parker",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=Z",
    "country": "India",
    "date_added": "2023-09-10",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 25
  },
  {
    "id": 37,
    "name": "Aaron Moore",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=A",
    "country": "England",
    "date_added": "2023-08-12",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 29
  },
  {
    "id": 38,
    "name": "Bella Taylor",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=B",
    "country": "Australia",
    "date_added": "2023-07-25",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 30
  },
  {
    "id": 39,
    "name": "Carter Rivera",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=C",
    "country": "USA",
    "date_added": "2023-06-18",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 35
  },
  {
    "id": 40,
    "name": "Diana Collins",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=D",
    "country": "Canada",
    "date_added": "2023-05-01",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 41
  },
  {
    "id": 41,
    "name": "Ethan Morris",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=E",
    "country": "India",
    "date_added": "2023-04-15",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 26
  },
  {
    "id": 42,
    "name": "Fiona Carter",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=F",
    "country": "England",
    "date_added": "2023-03-10",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 30
  },
  {
    "id": 43,
    "name": "George Brooks",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=G",
    "country": "Australia",
    "date_added": "2023-02-28",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 50
  },
  {
    "id": 44,
    "name": "Holly Rogers",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=H",
    "country": "USA",
    "date_added": "2023-01-15",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 34
  },
  {
    "id": 45,
    "name": "Ian Peterson",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=I",
    "country": "Canada",
    "date_added": "2023-12-01",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 32
  },
  {
    "id": 46,
    "name": "Jenna Simmons",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=J",
    "country": "India",
    "date_added": "2023-11-18",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 39
  },
  {
    "id": 47,
    "name": "Kyle Diaz",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=K",
    "country": "England",
    "date_added": "2023-10-01",
    "is_verified": false,
    "is_payment_completed": true,
    "age": 29
  },
  {
    "id": 48,
    "name": "Laura Foster",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=L",
    "country": "Australia",
    "date_added": "2023-09-10",
    "is_verified": true,
    "is_payment_completed": false,
    "age": 35
  },
  {
    "id": 49,
    "name": "Mason Bell",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=M",
    "country": "USA",
    "date_added": "2023-08-05",
    "is_verified": true,
    "is_payment_completed": true,
    "age": 40
  },
  {
    "id": 50,
    "name": "Nina Hughes",
    "icon": "https://dummyimage.com/64x64/635CF4/ffffff&text=N",
    "country": "Canada",
    "date_added": "2023-07-12",
    "is_verified": false,
    "is_payment_completed": false,
    "age": 27
  }
]
 export default mockUsers;