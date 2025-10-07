import basketballImage from "@/assets/basketball-1.jpg";
import soccerImage from "@/assets/soccer-1.jpg";
import swimmingImage from "@/assets/swimming-1.jpg";
import skiingImage from "@/assets/skiing-1.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Basketball Season Recap",
    excerpt: "Looking back at an incredible basketball season with highlights and memorable moments from the court.",
    content: `
# Basketball Season Recap

Looking back at an incredible basketball season with highlights and memorable moments from the court.

## Season Highlights

This basketball season has been nothing short of extraordinary. From buzzer-beaters to incredible comebacks, we've witnessed some of the most thrilling moments in recent sports history.

### Key Moments

The season started with high expectations, and the teams delivered beyond our wildest dreams. Several games stood out as defining moments that will be remembered for years to come.

### Player Performances

Individual performances this season have been remarkable, with several players achieving career-high statistics and breaking long-standing records.

## Looking Forward

As we wrap up this incredible season, we're already looking forward to what next year will bring. The talent pipeline looks strong, and the competition promises to be even more intense.

The foundation has been set for what could be an even more exciting season ahead. Stay tuned for more coverage and analysis.
    `,
    category: "Basketball",
    date: "Aug 28, 2025",
    readTime: "5 min read",
    image: basketballImage,
    slug: "basketball-season-recap",
    author: "Sports Chronicle Team"
  },
  {
    id: "2", 
    title: "The Ultimate Guide to Basketball Shooting Techniques",
    excerpt: "Master the fundamentals of basketball shooting with these proven techniques used by professional players.",
    content: `
# The Ultimate Guide to Basketball Shooting Techniques

Master the fundamentals of basketball shooting with these proven techniques used by professional players.

## Foundation of Great Shooting

Great shooting starts with proper form and consistent mechanics. Every professional player has spent countless hours perfecting their shooting technique.

### Proper Stance

Your shooting stance is the foundation of accuracy. Position your feet shoulder-width apart, with your shooting-side foot slightly ahead. This creates a stable base for your shot.

### Hand Placement

The placement of your hands on the ball is crucial. Your shooting hand should be centered on the ball, with your guide hand supporting from the side.

## Advanced Techniques

Once you've mastered the basics, you can focus on more advanced shooting techniques that separate good shooters from great ones.

### Follow Through

A proper follow-through ensures consistent ball rotation and arc. Your wrist should snap downward, with your fingers pointing toward the rim.

### Arc and Rotation

The optimal shooting arc is between 45-50 degrees. Proper backspin on the ball gives you a "shooter's bounce" when the ball hits the rim.

## Practice Drills

Consistent practice with the right drills is essential for improvement. Focus on quality repetitions rather than quantity.

Remember, becoming a great shooter takes time and dedication. Stay consistent with your practice routine.
    `,
    category: "Basketball", 
    date: "Aug 28, 2025",
    readTime: "8 min read",
    image: basketballImage,
    slug: "basketball-shooting-techniques-guide",
    author: "Mike Johnson"
  },
  {
    id: "3",
    title: "Soccer Tactics: Understanding Formations and Strategies",
    excerpt: "Explore the tactical side of soccer with an in-depth look at popular formations and strategic approaches used by top teams.",
    content: `
# Soccer Tactics: Understanding Formations and Strategies

Explore the tactical side of soccer with an in-depth look at popular formations and strategic approaches used by top teams.

## The Evolution of Soccer Tactics

Soccer tactics have evolved dramatically over the decades. What started as simple formations has developed into complex tactical systems that require incredible coordination and understanding.

### Historical Perspective

From the early days of the 2-3-5 formation to modern fluid systems, soccer has seen a constant evolution in tactical thinking.

## Popular Formations

Understanding formations is key to appreciating the tactical nuances of modern soccer.

### 4-3-3 Formation

The 4-3-3 is one of the most balanced formations, providing both defensive stability and attacking options. It consists of four defenders, three midfielders, and three forwards.

### 4-2-3-1 Formation

This formation offers great flexibility, with two defensive midfielders providing cover while the attacking midfielder creates chances for the lone striker.

## Strategic Approaches

Different teams employ various strategic approaches based on their players' strengths and the opposition they face.

### Possession-Based Play

Teams that favor possession focus on maintaining control of the ball, patiently building attacks and tiring out the opposition.

### Counter-Attacking

Counter-attacking teams sit deep, absorb pressure, and look to exploit space left by the opposition with quick transitions.

## Modern Trends

Today's soccer is characterized by high pressing, positional play, and tactical flexibility during matches.

The best teams can adapt their approach within a single game, making tactical awareness more important than ever.
    `,
    category: "Soccer",
    date: "Aug 28, 2025", 
    readTime: "12 min read",
    image: soccerImage,
    slug: "soccer-tactics-formations-strategies",
    author: "Carlos Rodriguez"
  },
  {
    id: "4",
    title: "Swimming Techniques for Competitive Edge",
    excerpt: "Improve your swimming performance with advanced techniques used by Olympic athletes and competitive swimmers.",
    content: `
# Swimming Techniques for Competitive Edge

Improve your swimming performance with advanced techniques used by Olympic athletes and competitive swimmers.

## The Science of Swimming

Swimming is both an art and a science. Understanding the biomechanics behind efficient swimming can significantly improve your performance in the pool.

### Hydrodynamics

Water is much denser than air, which means every movement must be purposeful and efficient. Reducing drag while maximizing propulsion is the key to fast swimming.

## Stroke Techniques

Each swimming stroke has its own unique technique and rhythm. Mastering these techniques is essential for competitive success.

### Freestyle Technique

Freestyle is the fastest stroke and requires perfect coordination between your arm pull, kick, and breathing pattern.

#### Body Position

Maintain a horizontal body position with your head in a neutral position. Your body should rotate as a unit with each stroke.

#### Arm Movement

The catch phase is crucial - your hand should "grab" the water and pull your body over it, rather than pushing water backward.

### Butterfly Technique

The butterfly stroke is technically demanding but incredibly powerful when executed correctly.

## Training Principles

Successful swimmers follow specific training principles that build both technique and fitness.

### Progressive Overload

Gradually increasing training intensity and volume allows your body to adapt and improve over time.

### Technique Focus

Never sacrifice technique for speed in training. Perfect practice makes perfect performance.

## Mental Aspects

Swimming is as much mental as it is physical. Visualization and race strategy play crucial roles in competitive success.

Develop a pre-race routine that helps you focus and perform at your best when it matters most.
    `,
    category: "Swimming",
    date: "Aug 28, 2025",
    readTime: "10 min read", 
    image: swimmingImage,
    slug: "swimming-techniques-competitive-edge",
    author: "Sarah Thompson"
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};