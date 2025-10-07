/*
  # Populate Initial Blog Data

  1. Blog Posts
    - Insert sample blog posts with proper content
    - Cover various sports categories (Basketball, Soccer, Swimming)
    - Include proper metadata (read time, author, etc.)

  2. Comments
    - Add sample comments for engagement
    - Link comments to blog posts

  3. Profiles
    - Create sample user profiles for authors

  4. Security
    - Ensure RLS policies are working correctly
*/

-- Insert sample blog posts
INSERT INTO blog_posts (id, title, excerpt, content, category, slug, read_time, author, language, cover_image) VALUES
(
  'basketball-season-recap-2024',
  'Basketball Season Recap: A Year of Incredible Moments',
  'Looking back at an incredible basketball season with highlights and memorable moments from the court.',
  '# Basketball Season Recap: A Year of Incredible Moments

Looking back at an incredible basketball season with highlights and memorable moments from the court.

## Season Highlights

This basketball season has been nothing short of extraordinary. From buzzer-beaters to incredible comebacks, we''ve witnessed some of the most thrilling moments in recent sports history.

### Key Moments

The season started with high expectations, and the teams delivered beyond our wildest dreams. Several games stood out as defining moments that will be remembered for years to come.

**Game of the Year**: The championship final went into triple overtime, showcasing the incredible skill and determination of both teams.

### Player Performances

Individual performances this season have been remarkable, with several players achieving career-high statistics and breaking long-standing records.

- **MVP Performance**: The season''s MVP averaged 28.5 points, 12.3 rebounds, and 8.7 assists per game
- **Rookie Sensation**: First-year players made immediate impacts across multiple teams
- **Veteran Leadership**: Experienced players showed why leadership matters in crucial moments

## Statistical Breakdown

The numbers tell an incredible story of athletic excellence:

- Average points per game increased by 8% from last season
- Three-point shooting accuracy reached an all-time high of 37.2%
- Fast break points averaged 18.4 per game, the highest in league history

## Looking Forward

As we wrap up this incredible season, we''re already looking forward to what next year will bring. The talent pipeline looks strong, and the competition promises to be even more intense.

The foundation has been set for what could be an even more exciting season ahead. Stay tuned for more coverage and analysis.',
  'Basketball',
  'basketball-season-recap-2024',
  '8 min read',
  'Sports Chronicle Team',
  'en',
  'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg'
),
(
  'basketball-shooting-techniques-guide',
  'The Ultimate Guide to Basketball Shooting Techniques',
  'Master the fundamentals of basketball shooting with these proven techniques used by professional players.',
  '# The Ultimate Guide to Basketball Shooting Techniques

Master the fundamentals of basketball shooting with these proven techniques used by professional players.

## Foundation of Great Shooting

Great shooting starts with proper form and consistent mechanics. Every professional player has spent countless hours perfecting their shooting technique.

### Proper Stance

Your shooting stance is the foundation of accuracy. Position your feet shoulder-width apart, with your shooting-side foot slightly ahead. This creates a stable base for your shot.

**Key Points:**
- Feet shoulder-width apart
- Shooting foot slightly forward
- Knees slightly bent
- Weight balanced

### Hand Placement

The placement of your hands on the ball is crucial. Your shooting hand should be centered on the ball, with your guide hand supporting from the side.

## Advanced Techniques

Once you''ve mastered the basics, you can focus on more advanced shooting techniques that separate good shooters from great ones.

### Follow Through

A proper follow-through ensures consistent ball rotation and arc. Your wrist should snap downward, with your fingers pointing toward the rim.

### Arc and Rotation

The optimal shooting arc is between 45-50 degrees. Proper backspin on the ball gives you a "shooter''s bounce" when the ball hits the rim.

## Practice Drills

Consistent practice with the right drills is essential for improvement. Focus on quality repetitions rather than quantity.

### Form Shooting
Start close to the basket and focus on perfect form. Gradually move back as your form becomes consistent.

### Spot Shooting
Practice from specific spots on the court where you''ll take shots during games.

Remember, becoming a great shooter takes time and dedication. Stay consistent with your practice routine.',
  'Basketball',
  'basketball-shooting-techniques-guide',
  '12 min read',
  'Mike Johnson',
  'en',
  'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg'
),
(
  'soccer-tactics-formations-strategies',
  'Soccer Tactics: Understanding Formations and Strategies',
  'Explore the tactical side of soccer with an in-depth look at popular formations and strategic approaches used by top teams.',
  '# Soccer Tactics: Understanding Formations and Strategies

Explore the tactical side of soccer with an in-depth look at popular formations and strategic approaches used by top teams.

## The Evolution of Soccer Tactics

Soccer tactics have evolved dramatically over the decades. What started as simple formations has developed into complex tactical systems that require incredible coordination and understanding.

### Historical Perspective

From the early days of the 2-3-5 formation to modern fluid systems, soccer has seen a constant evolution in tactical thinking.

## Popular Formations

Understanding formations is key to appreciating the tactical nuances of modern soccer.

### 4-3-3 Formation

The 4-3-3 is one of the most balanced formations, providing both defensive stability and attacking options. It consists of four defenders, three midfielders, and three forwards.

**Advantages:**
- Balanced attack and defense
- Wide attacking options
- Central midfield control

### 4-2-3-1 Formation

This formation offers great flexibility, with two defensive midfielders providing cover while the attacking midfielder creates chances for the lone striker.

**Key Features:**
- Defensive stability through double pivot
- Creative freedom for attacking midfielder
- Support for lone striker

## Strategic Approaches

Different teams employ various strategic approaches based on their players'' strengths and the opposition they face.

### Possession-Based Play

Teams that favor possession focus on maintaining control of the ball, patiently building attacks and tiring out the opposition.

### Counter-Attacking

Counter-attacking teams sit deep, absorb pressure, and look to exploit space left by the opposition with quick transitions.

### High Pressing

Modern teams often employ high pressing to win the ball back quickly and create scoring opportunities.

## Modern Trends

Today''s soccer is characterized by high pressing, positional play, and tactical flexibility during matches.

The best teams can adapt their approach within a single game, making tactical awareness more important than ever.',
  'Soccer',
  'soccer-tactics-formations-strategies',
  '15 min read',
  'Carlos Rodriguez',
  'en',
  'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg'
),
(
  'swimming-techniques-competitive-edge',
  'Swimming Techniques for Competitive Edge',
  'Improve your swimming performance with advanced techniques used by Olympic athletes and competitive swimmers.',
  '# Swimming Techniques for Competitive Edge

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

**Key Points:**
- High elbow catch
- Full extension on entry
- Strong pull through
- Quick recovery

### Butterfly Technique

The butterfly stroke is technically demanding but incredibly powerful when executed correctly.

#### Timing

The key to butterfly is timing. Your arms and legs must work in perfect synchronization.

## Training Principles

Successful swimmers follow specific training principles that build both technique and fitness.

### Progressive Overload

Gradually increasing training intensity and volume allows your body to adapt and improve over time.

### Technique Focus

Never sacrifice technique for speed in training. Perfect practice makes perfect performance.

## Mental Aspects

Swimming is as much mental as it is physical. Visualization and race strategy play crucial roles in competitive success.

Develop a pre-race routine that helps you focus and perform at your best when it matters most.',
  'Swimming',
  'swimming-techniques-competitive-edge',
  '10 min read',
  'Sarah Thompson',
  'en',
  'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg'
),
(
  'tennis-serve-mastery-guide',
  'Tennis Serve Mastery: Power and Precision Combined',
  'Learn the secrets behind a powerful and accurate tennis serve with techniques from professional players.',
  '# Tennis Serve Mastery: Power and Precision Combined

Learn the secrets behind a powerful and accurate tennis serve with techniques from professional players.

## The Foundation of a Great Serve

The serve is arguably the most important shot in tennis. It''s the only shot where you have complete control, making it crucial to master.

### Grip and Stance

Start with the continental grip, which allows for maximum versatility in your serve. Your stance should be comfortable and balanced.

**Serving Stance:**
- Feet shoulder-width apart
- Front foot at 45-degree angle to baseline
- Weight slightly on back foot

### Ball Toss

A consistent ball toss is essential for a reliable serve. The ball should be tossed slightly in front and to the right (for right-handed players).

## Power Generation

Power in the serve comes from a kinetic chain that starts from the ground up.

### Leg Drive

Push off with your legs to generate upward momentum. This is where much of your power originates.

### Hip and Shoulder Rotation

Rotate your hips and shoulders to create a whip-like motion that transfers energy to your racket.

### Racket Head Speed

The final link in the chain is racket head speed. Focus on accelerating through contact.

## Serve Variations

Different serves can keep your opponent guessing and give you tactical advantages.

### Flat Serve

The flat serve is your power serve, designed to overwhelm opponents with speed.

### Slice Serve

The slice serve curves away from your opponent, pulling them wide and opening up the court.

### Kick Serve

The kick serve bounces high and can be particularly effective on clay courts.

## Mental Game

Serving under pressure requires mental toughness and confidence.

### Routine Development

Develop a consistent pre-serve routine that helps you focus and stay calm under pressure.

### Visualization

Visualize successful serves before executing them. Mental rehearsal improves actual performance.

## Practice Strategies

Effective practice is key to serve improvement.

### Target Practice

Set up targets in the service boxes and aim for specific areas to improve accuracy.

### Repetition with Purpose

Focus on quality over quantity. Each serve should have a specific purpose and target.

Remember, mastering the serve takes time and patience. Stay committed to the process.',
  'Tennis',
  'tennis-serve-mastery-guide',
  '9 min read',
  'Alex Martinez',
  'en',
  'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg'
),
(
  'football-quarterback-fundamentals',
  'Football Quarterback Fundamentals: Reading the Field',
  'Essential skills every quarterback needs to master for reading defenses and making quick decisions.',
  '# Football Quarterback Fundamentals: Reading the Field

Essential skills every quarterback needs to master for reading defenses and making quick decisions.

## The Quarterback Position

The quarterback is often called the field general, responsible for leading the offense and making split-second decisions that can determine the outcome of the game.

### Pre-Snap Reads

Before the ball is snapped, a quarterback must quickly assess the defensive alignment and identify potential threats and opportunities.

**Key Elements to Identify:**
- Safety positioning (high or low)
- Linebacker alignment
- Cornerback coverage (man or zone)
- Potential blitzers

### Post-Snap Progression

Once the ball is snapped, the quarterback must quickly progress through their reads to find the open receiver.

## Footwork Fundamentals

Proper footwork is the foundation of accurate passing and pocket presence.

### Drop Back Technique

The drop back must be quick and efficient, getting the quarterback to the proper depth while maintaining balance.

**Three-Step Drop:**
- Quick, short steps
- Eyes up immediately
- Ball ready to throw

**Five-Step Drop:**
- Longer, more deliberate steps
- Allows for deeper routes
- More time for reads

### Pocket Movement

When pressure comes, quarterbacks must know how to move within the pocket to buy time while keeping their eyes downfield.

## Reading Defenses

Understanding defensive concepts is crucial for making the right decisions.

### Cover 2 Defense

In Cover 2, the safeties split the deep field in half. This creates opportunities in the intermediate zones.

### Cover 3 Defense

Cover 3 features three deep defenders, leaving the underneath areas more vulnerable.

### Man Coverage

Against man coverage, quarterbacks look for picks, rubs, and individual matchup advantages.

## Decision Making

Quick, accurate decision-making separates good quarterbacks from great ones.

### Risk vs. Reward

Every throw involves calculating risk versus reward. Understanding when to take chances and when to play it safe is crucial.

### Clock Management

Managing the game clock becomes increasingly important in close games and crucial situations.

## Mental Preparation

The mental side of quarterbacking is just as important as the physical skills.

### Film Study

Studying opponent tendencies and defensive schemes gives quarterbacks a significant advantage.

### Pressure Situations

Learning to stay calm and focused under pressure is essential for success at any level.

The quarterback position requires a unique combination of physical skills, mental acuity, and leadership qualities.',
  'Football',
  'football-quarterback-fundamentals',
  '11 min read',
  'Coach Williams',
  'en',
  'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg'
);

-- Insert sample comments
INSERT INTO comments (id, post_id, author_name, content, user_id) VALUES
(
  gen_random_uuid(),
  'basketball-season-recap-2024',
  'Basketball Fan',
  'What an incredible season! The championship game was absolutely thrilling. Thanks for the great recap!',
  NULL
),
(
  gen_random_uuid(),
  'basketball-season-recap-2024',
  'Coach Mike',
  'Great analysis of the season. The statistical breakdown really shows how the game has evolved.',
  NULL
),
(
  gen_random_uuid(),
  'basketball-shooting-techniques-guide',
  'Young Player',
  'This guide is exactly what I needed! The form shooting drills have already improved my accuracy.',
  NULL
),
(
  gen_random_uuid(),
  'soccer-tactics-formations-strategies',
  'Soccer Enthusiast',
  'Excellent breakdown of formations. The 4-3-3 vs 4-2-3-1 comparison was particularly helpful.',
  NULL
),
(
  gen_random_uuid(),
  'swimming-techniques-competitive-edge',
  'Swim Coach',
  'As a swimming coach, I can confirm these techniques are spot-on. Great resource for athletes!',
  NULL
),
(
  gen_random_uuid(),
  'tennis-serve-mastery-guide',
  'Tennis Player',
  'The ball toss section really helped me understand why my serve was inconsistent. Thank you!',
  NULL
);

-- Insert sample profiles
INSERT INTO profiles (id, user_id, display_name, bio, preferred_language) VALUES
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Sports Chronicle Team',
  'Dedicated team of sports journalists and analysts bringing you the latest in sports news and analysis.',
  'en'
),
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Mike Johnson',
  'Former college basketball player turned sports analyst. Specializes in basketball techniques and player development.',
  'en'
),
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Carlos Rodriguez',
  'Soccer tactical analyst with 15 years of experience covering international football.',
  'en'
),
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Sarah Thompson',
  'Olympic swimming coach and former competitive swimmer. Expert in stroke technique and training methods.',
  'en'
),
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Alex Martinez',
  'Professional tennis instructor and former ATP tour player. Specializes in serve technique and mental game.',
  'en'
),
(
  gen_random_uuid(),
  gen_random_uuid(),
  'Coach Williams',
  'High school and college football coach with 20+ years of experience. Expert in quarterback development.',
  'en'
);