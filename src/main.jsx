import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail,
  Code2, Database, Layers3, Terminal, ExternalLink, Play, Pause,
  Volume2, Mountain, Footprints, Compass, Heart, Sparkles
} from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Sudipta Paul',
  email: 'sudipto.official10@gmail.com',
  github: 'https://github.com/sudipt0-paul10',
  linkedin: 'https://www.linkedin.com/in/sudipta-paul05-/',
  resume: 'https://drive.google.com/file/d/1i1OU9SNP6Ze7kW7YhJuIqzwq1Pb5ac_K/view?usp=sharing',
  awsCertificate: 'https://drive.google.com/file/d/1BHJEGATo2LjSqsjS5Et5c1YjqMmLYAT5/view?usp=sharing',
};

const chapters = [
  { id: 'mind', number: '01', label: 'INSIDE MY HEAD' },
  { id: 'outside', number: '02', label: 'BEYOND THE SCREEN' },
  { id: 'work', number: '03', label: 'THINGS I BUILD' },
  { id: 'experiences', number: '04', label: 'THINGS I WANT TO EXPERIENCE' },
  { id: 'becoming', number: '05', label: 'WHO I’M BECOMING' },
  { id: 'contact', number: '06', label: 'SAY HELLO' },
];

const skills = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'HTML & CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Databases', items: ['MongoDB', 'SQL Server', 'T-SQL'] },
  { title: 'Core', items: ['Data Structures', 'Algorithms', 'Git & GitHub'] },
];

const projects = [
  {
    number: '01', type: 'C++ · NETWORKING', title: 'Deep Packet Inspection Engine',
    description: 'A C++ project exploring deep packet inspection and network traffic analysis — a chance to get closer to how data moves beneath the applications we use.',
    stack: ['C++', 'Networking', 'Deep Packet Inspection'],
    repo: 'https://github.com/sudipt0-paul10/DPI---Deep-Packet-Inspection',
  },
  {
    number: '02', type: 'DATA ENGINEERING & ANALYTICS', title: 'Data Warehouse & Analytics',
    description: 'A data-focused project exploring how structured data can be organised, transformed, and queried to support reporting and analytical insights.',
    stack: ['SQL Server', 'T-SQL', 'Data Modelling'],
    repo: 'https://github.com/sudipt0-paul10/Data-Warehouse-and-Analytics-Project-',
  },
];

const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

function ChapterMarker({ number, label }) {
  return <div className="chapter-marker"><span>{number}</span><i />{label}</div>;
}

function NextStep({ target, label = 'Take the next step' }) {
  const [walking, setWalking] = useState(false);
  const moveToNext = () => {
    setWalking(true);
    const staircase = document.querySelector(`#${target}`)?.previousElementSibling?.querySelector?.('.staircase-art') || document.querySelector(`#${target}`)?.parentElement?.closest('section')?.querySelector('.staircase-art');
    staircase?.classList.add('person-descending');
    window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 360);
    window.setTimeout(() => { setWalking(false); staircase?.classList.remove('person-descending'); }, 900);
  };
  return <button className={`next-step ${walking ? 'is-walking' : ''}`} onClick={moveToNext} type="button"><span>{label}</span><svg className="walking-person" viewBox="0 0 28 34" aria-hidden="true"><circle cx="14" cy="5" r="3"/><path d="M14 9 L14 19 M14 12 L7 17 M14 12 L21 16 M14 19 L8 28 M14 19 L21 27"/></svg><ArrowDown size={16} /></button>;
}

function StaircaseArt({ variant = 'default' }) {
  return <div className={`staircase-art staircase-${variant}`} aria-hidden="true">
    <svg viewBox="0 0 360 330" role="presentation" focusable="false">
      <path className="stair-shadow" d="M38 274 H88 V236 H138 V198 H188 V160 H238 V122 H288 V84 H326" />
      <path className="stair-line" d="M38 274 H88 V236 H138 V198 H188 V160 H238 V122 H288 V84 H326" />
      <path className="stair-rail" d="M38 246 L88 208 L138 170 L188 132 L238 94 L288 56 L326 27" />
      <path className="stair-future" d="M288 84 H326 V46 H350 V8" />
      <circle className="stair-dot" cx="288" cy="56" r="5" />
    </svg>
    <svg className="stair-person" viewBox="0 0 24 38" aria-hidden="true"><circle cx="12" cy="5" r="3"/><path d="M12 9 V21 M12 12 L6 17 M12 12 L18 16 M12 21 L7 31 M12 21 L18 30"/></svg>
    <span className="stair-art-note">ONE STEP AT A TIME</span>
  </div>;
}

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onEnded = () => setIsPlaying(false);
    const onError = () => { setAudioError(true); setIsPlaying(false); };
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  useEffect(() => {
    // Visitors may read within a chapter, but crossing into another chapter requires the step button.
    const stopChapterSkip = (event) => {
      if (Math.abs(event.deltaY) < 2) return;
      const sections = [...document.querySelectorAll('main.story > section')];
      const y = window.scrollY;
      const currentIndex = sections.findIndex((section, index) => {
        const top = section.offsetTop;
        const nextTop = sections[index + 1]?.offsetTop ?? Number.POSITIVE_INFINITY;
        return y >= top - 2 && y < nextTop - 2;
      });
      if (currentIndex < 0) return;
      const current = sections[currentIndex];
      const next = sections[currentIndex + 1];
      const atBottom = y + window.innerHeight >= current.offsetTop + current.offsetHeight - 8;
      const atTop = y <= current.offsetTop + 8;
      if ((event.deltaY > 0 && next && atBottom) || (event.deltaY < 0 && atTop && currentIndex > 0)) event.preventDefault();
    };
    window.addEventListener('wheel', stopChapterSkip, { passive: false });
    return () => window.removeEventListener('wheel', stopChapterSkip);
  }, []);

  const toggleCampNouAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);
      setAudioError(false);
    } catch {
      setAudioError(true);
      setIsPlaying(false);
    }
  };

  return <>
    <audio ref={audioRef} src="/Barca-Barca-Barca.mp3" preload="none" />

    <header className="nav wrap">
      <a className="wordmark" href="#home" aria-label="Go to the top of the staircase">SP<span>.</span></a>
      <nav aria-label="Chapter navigation">
        <a href="#mind">My mind</a><a href="#work">Projects</a><a href="#experiences">Dreams</a>
      </nav>
      <a className="nav-cta" href={gmailCompose} target="_blank" rel="noreferrer">Say hello <ArrowUpRight size={15}/></a>
    </header>

    <main className="story">
      <section className="landing hero wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> A WORK IN PROGRESS · EST. 2005</div>
          <h1>Still figuring<br/>it out. <span>Intentionally.</span></h1>
          <p className="hero-intro">I’m {profile.name}, a Computer Science undergraduate at KIIT. Curious about how things work, drawn to what I don’t know yet, and learning to enjoy the process as much as the outcome.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#mind">Start the descent <ArrowDownRight size={17}/></a>
            <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">View resume <ArrowUpRight size={16}/></a>
          </div>
          <div className="hero-footnote"><span>COMPUTER SCIENCE · KIIT</span><span>ALWAYS A FEW STEPS IN</span></div>
        </div>
        <div className="hero-staircase" aria-label="A minimal line-drawn staircase leading to the next chapter">
          <div className="hero-stair-caption">A STORY, STILL TAKING SHAPE</div>
          <StaircaseArt variant="hero" />
          <div className="hero-stair-index"><span>00</span><span>THE FIRST STEP</span></div>
        </div>
        <a className="scroll-cue" href="#mind"><span>THE STORY STARTS BELOW</span><ArrowDown size={15}/></a>
      </section>

      <section className="chapter section wrap" id="mind">
        <ChapterMarker number="01" label="INSIDE MY HEAD" />
        <div className="chapter-grid">
          <div className="chapter-copy"><p className="chapter-overline">HOW I PROCESS THE WORLD</p><h2>A mind that<br/><span>keeps running.</span></h2>
            <p>I can think a situation through from several angles — sometimes more than I need to. When things don’t go to plan, I can get unsettled; then I try to slow down, look at the possibilities, and work out what I can actually do.</p>
            <p>I’m learning that being logical doesn’t mean having every outcome figured out. Sometimes the next step is simply to take one.</p>
          </div>
          <div className="thinking-art" aria-label="An abstract illustration of ideas branching and converging">
            <div className="thought-node node-a">WHAT IF?</div><div className="thought-node node-b">PLAN A</div><div className="thought-node node-c">PLAN B</div><div className="thought-node node-d">NEXT STEP</div>
            <svg viewBox="0 0 340 250" aria-hidden="true"><path d="M28 122 C72 122 64 48 118 48 S170 122 206 122 S250 80 306 80"/><path d="M28 122 C72 122 64 194 118 194 S170 122 206 122 S250 165 306 165"/><path d="M118 48 C150 48 162 122 206 122 C230 122 244 122 306 122"/></svg>
            <span className="thinking-caption">THOUGHTS IN MOTION</span>
          </div>
        </div>
        <StaircaseArt />
        <NextStep target="outside" />
      </section>

      <section className="chapter section chapter-muted" id="outside"><div className="wrap">
        <ChapterMarker number="02" label="BEYOND THE SCREEN" />
        <div className="chapter-grid outside-grid">
          <div className="chapter-copy"><p className="chapter-overline">LIFE OUTSIDE THE IDE</p><h2>Interest grows<br/><span>when you stay.</span></h2>
            <p>I’ve noticed that the more time I give something, the more interesting it becomes. Tech is one part of that — but so are training at the gym, trying to live healthier, reading, and revisiting the things I used to enjoy.</p>
            <p>I swam for a few years and have always enjoyed a casual game of football or cricket. I want to make more room for interests that have nothing to do with productivity, too.</p>
          </div>
          <div className="interest-stack">
            <div className="interest-item"><span className="interest-symbol"><Code2 size={19}/></span><div><strong>Curiosity</strong><small>Following what’s changing in tech</small></div><span className="interest-index">01</span></div>
            <div className="interest-item"><span className="interest-symbol"><Heart size={19}/></span><div><strong>Taking care</strong><small>Training, movement, healthier habits</small></div><span className="interest-index">02</span></div>
            <div className="interest-item"><span className="interest-symbol"><Layers3 size={19}/></span><div><strong>Making space</strong><small>Books, sport, and new interests</small></div><span className="interest-index">03</span></div>
          </div>
        </div>
        <StaircaseArt variant="muted" />
        <NextStep target="work" />
      </div></section>

      <section className="chapter section wrap" id="work">
        <ChapterMarker number="03" label="THINGS I BUILD" />
        <div className="section-heading"><h2>Learning by<br/><span>making things.</span></h2><p>I like projects that take me past the surface and make me understand how a system works.</p></div>
        <div className="project-list">{projects.map(project => <article className="project-card" key={project.number}><div className="project-number">{project.number}</div><div className="project-content"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div><a className="project-link" href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} repository`}><ArrowUpRight size={21}/></a></article>)}</div>
        <div className="toolkit-mini"><div className="toolkit-heading"><span>WHAT I’M WORKING WITH</span><span>AND STILL GROWING</span></div><div className="skills-grid">{skills.map((group, i) => <div className="skill-group" key={group.title}><div className="skill-icon">{i===0?<Layers3/>:i===1?<Terminal/>:i===2?<Database/>:<Code2/>}</div><h3>{group.title}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div></div>
        <div className="credential"><div className="credential-icon"><Database size={22}/></div><div><div className="project-type">CLOUD FOUNDATIONS</div><h3>AWS Academy Cloud Foundations</h3><p>Foundational learning in cloud concepts and AWS services.</p></div><a href={profile.awsCertificate} target="_blank" rel="noreferrer" aria-label="View AWS Academy Cloud Foundations certificate"><ExternalLink size={18}/></a></div>
        <StaircaseArt />
        <NextStep target="experiences" />
      </section>

      <section className="chapter section chapter-muted" id="experiences"><div className="wrap">
        <ChapterMarker number="04" label="THINGS I WANT TO EXPERIENCE" />
        <div className="section-heading"><h2>Some things<br/><span>are worth the wait.</span></h2><p>Not every goal needs a deadline. Some are reminders to make time for the life happening outside the plan.</p></div>
        <div className="experience-grid">
          <article className="experience-card camp-nou-card"><div className="experience-topline"><span>01 / THE DREAM</span><Volume2 size={17}/></div><img className="experience-image camp-nou-image" src="/images/camp-nou.png" alt="A packed football stadium at sunset, representing the Camp Nou match-day atmosphere" /><p className="chapter-overline">ONE DAY, IN BARCELONA</p><h3>At Camp Nou.<br/><span>In the middle of it all.</span></h3><p>I want to be there in person — the chants, the noise, the feeling of being part of something bigger than the game.</p><button className={`audio-button ${isPlaying ? 'is-playing' : ''}`} type="button" onClick={toggleCampNouAudio} aria-pressed={isPlaying}><span className="audio-button-icon">{isPlaying ? <Pause size={15} fill="currentColor"/> : <Play size={15} fill="currentColor"/>}</span><span>{isPlaying ? 'Pause the atmosphere' : 'Hear a little of the atmosphere'}</span><span className="audio-bars" aria-hidden="true"><i/><i/><i/><i/><i/></span></button>{audioError && <p className="audio-error" role="status">The audio couldn’t play. Try again or check that the file is in the project’s public folder.</p>}<p className="audio-note">16-second chant · Plays only when you press play</p></article>
          <article className="experience-card skydive-card"><div className="experience-topline"><span>02 / THE LEAP</span><Mountain size={17}/></div><img className="experience-image skydiving-image" src="/images/skydiving.jpg" alt="Skydivers falling above a wide view of clouds and the landscape below" /><p className="chapter-overline">OUT OF MY COMFORT ZONE</p><h3>Looking down<br/><span>from way up there.</span></h3><p>Skydiving is on the list — a little fear, a lot of adrenaline, and a view that makes the world feel completely different.</p><div className="dream-tag"><Compass size={15}/> SOMEDAY, NOT JUST IN MY HEAD</div></article>
          <article className="experience-card fitness-card"><div className="experience-topline"><span>03 / THE CHALLENGE</span><Footprints size={17}/></div><img className="experience-image hyrox-image" src="/images/hyrox.png" alt="HYROX fitness competition logo" /><p className="chapter-overline">TESTING MY OWN LIMITS</p><h3>A fitness<br/><span>competition.</span></h3><p>To see what consistent work can add up to — not just how I look, but what I can commit to and follow through on.</p></article>
        </div>
        <StaircaseArt variant="muted" />
        <NextStep target="becoming" />
      </div></section>

      <section className="chapter section wrap" id="becoming">
        <ChapterMarker number="05" label="WHO I’M BECOMING" />
        <div className="becoming-layout"><div className="chapter-copy"><p className="chapter-overline">THE PERSON, NOT JUST THE PROFILE</p><h2>More sure of<br/><span>my own direction.</span></h2><p>I want to get clearer about what matters to me, choose my priorities, and learn to say no when I need to. I want a work ethic I can trust, the courage to try things before I feel fully ready, and a life with room for people I care about.</p><p>And I hope I become someone who tells the truth with kindness, shows up when it matters, and makes people smile.</p></div><div className="becoming-note"><Sparkles size={21}/><p>Not a finished version.<br/><strong>A direction worth walking toward.</strong></p><span>STILL UNDER CONSTRUCTION</span></div></div>
        <StaircaseArt />
        <NextStep target="contact" />
      </section>

      <section className="chapter section contact-chapter" id="contact"><div className="wrap">
        <ChapterMarker number="06" label="SAY HELLO" />
        <div className="contact-inner"><div><p className="chapter-overline">GOOD THINGS START WITH A CONVERSATION</p><h2>Have an idea?<br/><span>Let’s talk.</span></h2><p>I’m happy to connect with people who enjoy building, learning, and sharing ideas.</p><a className="button button-light" href={gmailCompose} target="_blank" rel="noreferrer">Say hello <ArrowUpRight size={17}/></a></div><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={14}/></a><a href={profile.resume} target="_blank" rel="noreferrer"><ExternalLink size={18}/> Resume <ArrowUpRight size={14}/></a></div></div>
        <NextStep target="unfinished" label="One last step" />
      </div></section>

      <section className="final-landing section" id="unfinished"><div className="wrap final-inner"><div className="final-label"><span>THE NEXT LANDING</span><span>07 / NOT YET FORMED</span></div><div className="final-stairs" aria-hidden="true"><svg viewBox="0 0 760 300"><path d="M12 264 H126 V226 H240 V188 H354 V150 H468 V112 H582 V74 H696"/><path d="M696 74 H748 V36" className="unfinished-line"/><path d="M582 74 L632 36 H696" className="unfinished-line"/><path d="M468 112 L518 74 H582" className="unfinished-line"/><path d="M354 150 L404 112 H468" className="unfinished-line"/></svg></div><p className="chapter-overline">STILL A WORK IN PROGRESS</p><h2>The later steps<br/><span>haven’t been formed yet.</span></h2><p className="final-message">There are places I haven’t been, things I haven’t built, and versions of myself I haven’t met yet. I don’t have every step figured out — and maybe I don’t need to.</p><p className="final-signoff">This is where the story pauses, not where it ends.</p><div className="final-actions"><a href={gmailCompose} target="_blank" rel="noreferrer">Say hello <ArrowUpRight size={15}/></a><a href="#home">Back to the first step <ArrowUpRight size={15}/></a></div><footer className="footer"><a className="wordmark" href="#home">SP<span>.</span></a><span>Built one step at a time.</span><span>© {new Date().getFullYear()} SUDIPTA PAUL</span></footer></div></section>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
