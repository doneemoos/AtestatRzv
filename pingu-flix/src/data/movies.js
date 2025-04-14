const movies = [
  {
    id: "Fast X",
    title: "Fast X",
    description: "The latest chapter in the Fast & Furious saga brings the Toretto family back into action, facing a mysterious enemy connected to past events. With high-octane action across multiple continents, the film maintains the franchise's trademark adrenaline.",
    category: "Action & Adventure",
    year: "2023",
    duration: "141 minutes",
    posterUrl: "/Movie/Fast X.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Universal Pictures, Original Film, One Race Films, Roth/Kirschenbaum Films, Perfect Storm Entertainment, China Film Co., Ltd.",
    casts: "Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Chris 'Ludacris' Bridges, John Cena, Nathalie Emmanuel, Jordana Brewster, Sung Kang, Scott Eastwood, Daniela Melchior, Alan Ritchson, Helen Mirren, Brie Larson, Rita Moreno, Jason Statham, Jason Momoa, Charlize Theron"
  },
  {
    id: "Mission: Impossible – Dead Reckoning Part One",
    title: "Mission: Impossible – Dead Reckoning Part One",
    description: "Ethan Hunt and the IMF team embark on their most dangerous mission yet: to track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, a deadly race around the globe begins.",
    category: "Action & Adventure",
    year: "2023",
    duration: "163 minutes",
    posterUrl: "/Movie/Mission: Impossible – Dead Reckoning Part One.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Paramount Pictures, Skydance Media, TC Productions, C2 Motion Picture Group",
    casts: "Tom Cruise, Hayley Atwell, Ving Rhames, Simon Pegg, Rebecca Ferguson, Vanessa Kirby, Esai Morales, Pom Klementieff, Mariela Garriga, Henry Czerny"
  },
  {
    id: "Reacher",
    title: "Reacher",
    description: "Jack Reacher, a former military police officer, arrives in a seemingly peaceful town only to uncover a web of corruption and organized crime. The series combines brutal action with a charismatic lead character, delivering a tense and engaging atmosphere.",
    category: "Action & Adventure",
    year: "2022–present",
    duration: "Varies",
    posterUrl: "/Movie/Reacher.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Amazon Studios, Skydance Television, Paramount Television Studios",
    casts: "Alan Ritchson, Malcolm Goodwin, Willa Fitzgerald, Chris Webster, Bruce McGill, Maria Sten, Harvey Guillén"
  },
  {
    id: "Daredevil: Born Again",
    title: "Daredevil: Born Again",
    description: "Matt Murdock, a blind lawyer with heightened senses, returns to confront new challenges in Hell's Kitchen. As Wilson Fisk rises in political power, Daredevil must navigate a city rife with corruption and face formidable new adversaries.",
    category: "Action & Adventure",
    year: "2025",
    duration: "TBA",
    posterUrl: "/Movie/Daredevil: Born Again.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Marvel Studios",
    casts: "Charlie Cox, Vincent D'Onofrio, Jon Bernthal, Deborah Ann Woll, Elden Henson, Margarita Levieva, Michael Gandolfini"
  },
  {
    id: "Ghosted",
    title: "Ghosted",
    description: "An ordinary man falls in love with a mysterious woman, only to discover she's an international secret agent. The two embark on a dangerous global adventure full of humor, romance, and explosive action.",
    category: "Action & Adventure",
    year: "2023",
    duration: "116 minutes",
    posterUrl: "/Movie/Ghosted.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Apple Studios, Skydance Media",
    casts: "Chris Evans, Ana de Armas, Adrien Brody, Mike Moh, Amy Sedaris, Tate Donovan"
  },
  {
    id: "Greyhound",
    title: "Greyhound",
    description: "A war drama based on real events, where a U.S. naval commander must lead his crew through a transatlantic convoy under attack from German submarines. The film is tense and realistic, emphasizing quick decision-making and the sacrifices of war.",
    category: "Action & Adventure",
    year: "2020",
    duration: "91 minutes",
    posterUrl: "/Movie/Greyhound.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Playtone, FilmNation Entertainment, Apple Studios",
    casts: "Tom Hanks, Stephen Graham, Rob Morgan, Elisabeth Shue, Karl Glusman, Tom Brittney"
  },
  {
    id: "Avengers: Endgame",
    title: "Avengers: Endgame",
    description: "After the catastrophic events caused by Thanos, the remaining superheroes must find a way to reverse the fate of the universe. An epic film that concludes over a decade of Marvel storytelling, filled with emotional moments, sacrifice, and heroic triumphs.",
    category: "Action & Adventure",
    year: "2019",
    duration: "181 minutes",
    posterUrl: "/Movie/Avengers: Endgame.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Marvel Studios",
    casts: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Benedict Wong, Jon Favreau, Bradley Cooper, Josh Brolin"
  },
  {
    id: "Suits",
    title: "Suits",
    description: "A brilliant college dropout, Mike Ross, finds himself working with Harvey Specter, one of New York's best lawyers. Together, they manage to close cases while maintaining Mike's secret.",
    category: "Drama",
    year: "2011–2019",
    duration: "44 minutes per episode",
    posterUrl: "/Movie/Suits.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Universal Cable Productions",
    casts: "Gabriel Macht, Patrick J. Adams, Meghan Markle, Sarah Rafferty, Rick Hoffman, Gina Torres"
  },
  {
    id: "Grey's Anatomy",
    title: "Grey's Anatomy",
    description: "Follows the personal and professional lives of surgical interns and their supervisors at Grey Sloan Memorial Hospital.",
    category: "Drama",
    year: "2005–present",
    duration: "41 minutes per episode",
    posterUrl: "/Movie/Grey's Anatomy.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Shondaland, The Mark Gordon Company, ABC Studios",
    casts: "Ellen Pompeo, Chandra Wilson, James Pickens Jr., Justin Chambers, Kevin McKidd, Jesse Williams"
  },
  {
    id: "Gilmore Girls",
    title: "Gilmore Girls",
    description: "A drama centering around the relationship between a thirty-something single mother and her teen daughter living in Stars Hollow, Connecticut.",
    category: "Drama",
    year: "2000–2007",
    duration: "44 minutes per episode",
    posterUrl: "/Movie/Gilmore Girls.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Dorothy Parker Drank Here Productions, Hofflund/Polone, Warner Bros. Television",
    casts: "Lauren Graham, Alexis Bledel, Scott Patterson, Kelly Bishop, Edward Herrmann, Melissa McCarthy"
  },
  {
    id: "The White Lotus",
    title: "The White Lotus",
    description: "A social satire set at an exclusive resort, following the vacations of various hotel guests over the span of a week.",
    category: "Drama",
    year: "2021–present",
    duration: "60 minutes per episode",
    posterUrl: "/Movie/The White Lotus.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "HBO Entertainment, Pallogram, The District, Rip Cord Productions",
    casts: "Jennifer Coolidge, Natasha Rothwell, Jon Gries, Leslie Bibb, Carrie Coon, Michelle Monaghan"
  },
  {
    id: "The Last of Us",
    title: "The Last of Us",
    description: "Joel and Ellie, a pair connected through the harshness of the world they live in, are forced to endure brutal circumstances and ruthless killers on a trek across a post-pandemic America.",
    category: "Drama",
    year: "2023–present",
    duration: "60 minutes per episode",
    posterUrl: "/Movie/The Last of Us.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Sony Pictures Television, PlayStation Productions, Naughty Dog, Word Games",
    casts: "Pedro Pascal, Bella Ramsey, Anna Torv, Gabriel Luna, Merle Dandridge, Nico Parker"
  },
  {
    id: "The Handmaid's Tale",
    title: "The Handmaid's Tale",
    description: "Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.",
    category: "Drama",
    year: "2017–2025",
    duration: "50 minutes per episode",
    posterUrl: "/Movie/The Handmaid's Tale.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "MGM Television, Hulu",
    casts: "Elisabeth Moss, Joseph Fiennes, Yvonne Strahovski, Alexis Bledel, Madeline Brewer, Ann Dowd, O-T Fagbenle, Max Minghella, Samira Wiley, Amanda Brugel, Bradley Whitford, Sam Jaeger"
  },
  {
    id: "You",
    title: "You",
    description: "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.",
    category: "Drama",
    year: "2018–present",
    duration: "45 minutes per episode",
    posterUrl: "/Movie/You.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "A+E Studios, Alloy Entertainment, Berlanti Productions, Warner Horizon Television",
    casts: "Penn Badgley, Elizabeth Lail, Victoria Pedretti, Tati Gabrielle, Jenna Ortega, James Scully"
  },
  {
    id: "Étoile",
    title: "Étoile",
    description: "In an ambitious effort to save their storied institutions, two world-renowned ballet companies in New York City and Paris swap their most talented stars. This series delves into the beauty, humor, and unpredictability of a life devoted to the arts, both on stage and off.",
    category: "Drama",
    year: "2025",
    duration: "8 episodes",
    posterUrl: "/Movie/Étoile.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Sesquipedalian Corporation, Dorothy Parker Drank Here Productions, Big Indie Pictures, Amazon MGM Studios",
    casts: "Luke Kirby, Charlotte Gainsbourg, Lou de Laâge, Gideon Glick, David Alvarez, Ivan du Pontavice, Taïs Vinolo, David Haig"
  },
  {
    id: "Dying for Sex",
    title: "Dying for Sex",
    description: "After being diagnosed with Stage IV metastatic breast cancer, Molly leaves her husband and embarks on a journey to explore her sexual desires, leading to a profound exploration of love, mortality, and self-discovery.",
    category: "Drama",
    year: "2025",
    duration: "8 episodes",
    posterUrl: "/Movie/Dying for Sex.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Pasta with Sauce, Elizabeth Meriwether Pictures, Wondery, 20th Television",
    casts: "Michelle Williams, Jenny Slate, Rob Delaney, Jay Duplass, Kelvin Yu, Sissy Spacek"
  },
  {
    id: "Desperate Housewives",
    title: "Desperate Housewives",
    description: "Secrets and truths unfold through the lives of female friends in one suburban neighborhood, after the mysterious suicide of a neighbor.",
    category: "Drama",
    year: "2004–2012",
    duration: "45 minutes per episode",
    posterUrl: "/Movie/Desperate Housewives.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Cherry Productions, ABC Studios",
    casts: "Teri Hatcher, Felicity Huffman, Marcia Cross, Eva Longoria, Nicollette Sheridan, Brenda Strong"
  },
  {
    id: "Poor Things",
    title: "Poor Things",
    description: "A fantastical tale about a young woman brought back to life by an unorthodox scientist, embarking on a journey of self-discovery.",
    category: "Drama",
    year: "2023",
    duration: "141 minutes",
    posterUrl: "/Movie/Poor Things.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Searchlight Pictures, Element Pictures, Film4 Productions",
    casts: "Emma Stone, Mark Ruffalo, Willem Dafoe, Ramy Youssef, Jerrod Carmichael"
  },
  {
    id: "NCIS",
    title: "NCIS",
    description: "Follows the Naval Criminal Investigative Service, which conducts criminal investigations involving the U.S. Navy and Marine Corps.",
    category: "Drama",
    year: "2003–present",
    duration: "44 minutes per episode",
    posterUrl: "/Movie/NCIS.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "CBS Studios, Belisarius Productions",
    casts: "Mark Harmon, Sean Murray, Wilmer Valderrama, Emily Wickersham, Brian Dietzen, David McCallum"
  },
  {
    id: "Only Murders in the Building",
    title: "Only Murders in the Building",
    description: "Three strangers, all fans of true crime, become amateur sleuths after a murder occurs in their New York apartment building. The show combines humor, suspense, and character chemistry in a twisty mystery.",
    category: "Comedy, Mystery",
    year: "2021–present",
    duration: "26–40 minutes per episode",
    posterUrl: "/Movie/Only Murders in the Building.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Rhode Island Ave. Productions, Another Hoffman Story Productions, 40 Share Productions, 20th Television",
    casts: "Steve Martin, Martin Short, Selena Gomez, Michael Cyril Creighton, Paul Rudd, Meryl Streep"
  },
  {
    id: "Ted Lasso",
    title: "Ted Lasso",
    description: "An American football coach unexpectedly hired to manage a British soccer team despite having no experience in the sport. The series is a mix of optimism, humor, and emotion, highlighting character growth and resilience.",
    category: "Sports Comedy Drama",
    year: "2020–2023",
    duration: "29–78 minutes per episode",
    posterUrl: "/Movie/Ted Lasso.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Ruby's Tuna Inc., Doozer, Universal Television, Warner Bros. Television",
    casts: "Jason Sudeikis, Hannah Waddingham, Jeremy Swift, Phil Dunster, Brett Goldstein, Brendan Hunt, Nick Mohammed, Juno Temple"
  },
  {
    id: "Shrinking",
    title: "Shrinking",
    description: "A grieving therapist begins telling his patients exactly what he thinks, breaking all the rules. The resulting comedy is sincere and human, exploring pain, healing, and human connection.",
    category: "Comedy, Drama",
    year: "2023–present",
    duration: "30 minutes per episode",
    posterUrl: "/Movie/Shrinking.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Dozer Productions, Apple Studios, Warner Bros. Television",
    casts: "Jason Segel, Harrison Ford, Jessica Williams, Christa Miller, Michael Urie, Luke Tennie"
  },
  {
    id: "Modern Family",
    title: "Modern Family",
    description: "The lives of three interconnected families, each with their own quirks and chaos. The series offers a comedic yet empathetic look at modern life, eccentric parenting, and family bonds.",
    category: "Comedy",
    year: "2009–2020",
    duration: "22 minutes per episode",
    posterUrl: "/Movie/Modern Family.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Steven Levitan Productions, Picador Productions, 20th Century Fox Television",
    casts: "Ed O'Neill, Sofía Vergara, Julie Bowen, Ty Burrell, Jesse Tyler Ferguson, Eric Stonestreet"
  },
  {
    id: "Friends",
    title: "Friends",
    description: "Six young friends navigate life, love, careers, and daily challenges in New York City. One of the most beloved sitcoms of all time, it continues to charm new generations with timeless humor and genuine friendship.",
    category: "Comedy, Romance",
    year: "1994–2004",
    duration: "22 minutes per episode",
    posterUrl: "/Movie/Friends.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Bright/Kauffman/Crane Productions, Warner Bros. Television",
    casts: "Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry, David Schwimmer"
  },
  {
    id: "The Big Bang Theory",
    title: "The Big Bang Theory",
    description: "A group of socially awkward science enthusiasts deal with relationships and everyday life. The show is a comedy about outsiders, friendship, and embracing differences.",
    category: "Comedy",
    year: "2007–2019",
    duration: "22 minutes per episode",
    posterUrl: "/Movie/The Big Bang Theory.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Chuck Lorre Productions, Warner Bros. Television",
    casts: "Johnny Galecki, Jim Parsons, Kaley Cuoco, Simon Helberg, Kunal Nayyar, Mayim Bialik, Melissa Rauch"
  },
  {
    id: "Hacks",
    title: "Hacks",
    description: "A legendary stand-up comedian forms a creative partnership with a rebellious young writer. The series explores artistic careers, generational clashes, and reinvention in the face of failure.",
    category: "Comedy, Drama",
    year: "2021–present",
    duration: "30 minutes per episode",
    posterUrl: "/Movie/Hacks.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Universal Television, Paulilu, First Thought Productions, 3 Arts Entertainment",
    casts: "Jean Smart, Hannah Einbinder, Carl Clemons-Hopkins, Paul W. Downs, Megan Stalter"
  },
  {
    id: "The Mask",
    title: "The Mask",
    description: "A shy banker finds a magical mask that transforms him into a wild, cartoonish figure with superpowers. A visually explosive comedy starring Jim Carrey, known for its over-the-top humor and chaotic energy.",
    category: "Comedy, Fantasy",
    year: "1994",
    duration: "101 minutes",
    posterUrl: "/Movie/The Mask.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Dark Horse Entertainment, New Line Cinema",
    casts: "Jim Carrey, Cameron Diaz, Peter Riegert, Peter Greene, Amy Yasbeck"
  },
  {
    id: "The Hangover",
    title: "The Hangover",
    description: "Three friends wake up after a wild bachelor party in Las Vegas with no memory of the night and the groom missing. A chaotic comedy about friendship and bad decisions, it became a cult classic.",
    category: "Comedy",
    year: "2009",
    duration: "100 minutes",
    posterUrl: "/Movie/The Hangover.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Green Hat Films, Legendary Pictures, Warner Bros. Pictures",
    casts: "Bradley Cooper, Ed Helms, Zach Galifianakis, Justin Bartha, Ken Jeong"
  },
  {
    id: "The Studio",
    title: "The Studio",
    description: "Matt Remick, the newly appointed head of Continental Studios, strives to keep the studio afloat amidst the chaos of Hollywood. The series satirizes celebrity culture, egos, and the absurdities of the film industry.",
    category: "Comedy",
    year: "2025",
    duration: "44 minutes per episode",
    posterUrl: "/Movie/The Studio.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "Apple TV+, Point Grey Pictures, Lionsgate Television",
    casts: "Seth Rogen, Catherine O'Hara, Ike Barinholtz, Chase Sui Wonders, Kathryn Hahn"
  },
  {
    id: "High Potential",
    title: "High Potential",
    description: "Morgan, a single mother with exceptional intelligence, becomes a consultant for the police, helping to solve complex cases while managing her chaotic personal life.",
    category: "Comedy, Crime, Drama",
    year: "2024",
    duration: "44 minutes per episode",
    posterUrl: "/Movie/High Potential.jpg",
    videoUrl: "/File.mp4", // link to trailer
    country: "United States",
    production: "ABC Signature, Goddard Textiles, Spondoolie Productions",
    casts: "Kaitlin Olson, Daniel Sunjata, Javicia Leslie, Deniz Akdeniz, Judy Reyes"
  },
  {
    id: "1",
    title: "Frozen",
    description: "Descriere film exemplu.",
    category: "Acțiune",
    year: "2021",
    duration: "120",
    posterUrl: "/postere/film_exemplu.jpg",
    videoUrl: "/Frozen.mp4",  // link către trailer
  },

  // Adăugați mai multe obiecte de filme după cum este necesar...
];

export default movies;